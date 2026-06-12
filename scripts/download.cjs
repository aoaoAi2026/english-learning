const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Usage: node download.cjs <url> <output-file>');
    process.exit(1);
}

const url = args[0];
const dest = args[1];

const destDir = path.dirname(dest);
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function doGet(downloadUrl, callback) {
    const protocol = downloadUrl.startsWith('https') ? https : http;
    const req = protocol.get(downloadUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log('  Follow redirect: ' + res.headers.location);
            doGet(res.headers.location, callback);
            return;
        }
        if (res.statusCode !== 200) {
            console.error('  Error: HTTP ' + res.statusCode);
            process.exit(1);
        }
        callback(res);
    });
    req.on('error', (err) => {
        console.error('  Download error: ' + err.message);
        process.exit(1);
    });
    req.setTimeout(300000, () => {
        console.error('  Request timeout');
        process.exit(1);
    });
}

console.log('Downloading: ' + url);
console.log('  Saving to: ' + dest);

doGet(url, (res) => {
    const totalSize = parseInt(res.headers['content-length'] || '0', 10);
    const totalMB = totalSize > 0 ? (totalSize / 1024 / 1024).toFixed(1) : 'unknown';
    console.log('  Size: ' + totalMB + ' MB');
    
    const file = fs.createWriteStream(dest + '.part');
    let downloaded = 0;
    let startTime = Date.now();
    let lastReport = startTime;
    
    res.on('data', (chunk) => {
        downloaded += chunk.length;
        const now = Date.now();
        if (now - lastReport > 5000) {
            const elapsed = (now - startTime) / 1000;
            const speedMBs = (downloaded / 1024 / 1024 / elapsed).toFixed(2);
            if (totalSize > 0) {
                const percent = ((downloaded / totalSize) * 100).toFixed(1);
                console.log('  ' + percent + '% (' + (downloaded/1024/1024).toFixed(1) + 'MB / ' + totalMB + 'MB) @ ' + speedMBs + ' MB/s');
            } else {
                console.log('  Downloaded: ' + (downloaded/1024/1024).toFixed(1) + 'MB @ ' + speedMBs + ' MB/s');
            }
            lastReport = now;
        }
    });
    
    res.pipe(file);
    
    file.on('finish', () => {
        file.close(() => {
            fs.renameSync(dest + '.part', dest);
            const finalSize = (fs.statSync(dest).size / 1024 / 1024).toFixed(2);
            console.log('  Download completed: ' + finalSize + ' MB');
        });
    });
});
