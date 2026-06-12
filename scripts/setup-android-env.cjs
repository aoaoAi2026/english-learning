const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TOOLS_DIR = 'E:\\android-tools';
const JDK_DIR = path.join(TOOLS_DIR, 'jdk17');
const ANDROID_SDK_DIR = path.join(TOOLS_DIR, 'android-sdk');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${url}`);
    console.log(`  -> ${dest}`);
    
    const file = fs.createWriteStream(dest);
    
    function doGet(downloadUrl) {
      const protocol = downloadUrl.startsWith('https') ? https : http;
      protocol.get(downloadUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          console.log(`  Redirecting to: ${response.headers.location}`);
          doGet(response.headers.location);
          return;
        }
        
        if (response.statusCode !== 200) {
          reject(new Error(`Download failed with status ${response.statusCode}`));
          return;
        }
        
        const totalSize = parseInt(response.headers['content-length'] || '0', 10);
        let downloaded = 0;
        let lastProgress = 0;
        
        response.on('data', (chunk) => {
          downloaded += chunk.length;
          if (totalSize > 0) {
            const progress = Math.floor((downloaded / totalSize) * 100);
            if (progress >= lastProgress + 10) {
              console.log(`  ${progress}% (${Math.floor(downloaded / 1024 / 1024)}MB / ${Math.floor(totalSize / 1024 / 1024)}MB)`);
              lastProgress = progress;
            }
          }
        });
        
        response.pipe(file);
        
        file.on('finish', () => {
          file.close(() => {
            console.log(`  Download completed: ${Math.floor(fs.statSync(dest).size / 1024 / 1024)}MB`);
            resolve(dest);
          });
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    
    doGet(url);
  });
}

function extractZip(zipPath, destDir) {
  console.log(`Extracting: ${zipPath}`);
  console.log(`  -> ${destDir}`);
  
  // Use PowerShell to extract zip (more reliable for large files)
  execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${destDir}' -Force"`, {
    stdio: 'inherit',
    maxBuffer: 1024 * 1024 * 1024
  });
  console.log('  Extraction completed');
}

async function main() {
  ensureDir(TOOLS_DIR);
  ensureDir(JDK_DIR);
  ensureDir(ANDROID_SDK_DIR);
  
  // Step 1: Download and extract JDK 17
  const jdkZip = path.join(TOOLS_DIR, 'jdk17.zip');
  if (!fs.existsSync(jdkZip) || fs.statSync(jdkZip).size < 50 * 1024 * 1024) {
    await downloadFile(
      'https://corretto.aws/downloads/latest/amazon-corretto-17-x64-windows-jdk.zip',
      jdkZip
    );
  }
  
  if (!fs.existsSync(path.join(JDK_DIR, 'bin', 'java.exe'))) {
    extractZip(jdkZip, TOOLS_DIR);
    // The extracted folder name might be something like "jdk17.0.12_7"
    const extracted = fs.readdirSync(TOOLS_DIR).find(dir => dir.startsWith('jdk17') && dir !== 'jdk17.zip');
    if (extracted && extracted !== 'jdk17') {
      const extractedPath = path.join(TOOLS_DIR, extracted);
      // Move contents to JDK_DIR
      if (fs.existsSync(extractedPath)) {
        fs.cpSync(extractedPath, JDK_DIR, { recursive: true });
        fs.rmSync(extractedPath, { recursive: true, force: true });
      }
    }
  }
  
  const javaExe = path.join(JDK_DIR, 'bin', 'java.exe');
  if (fs.existsSync(javaExe)) {
    console.log('JDK 17 installed successfully!');
    execSync(`"${javaExe}" -version`, { stdio: 'inherit' });
  } else {
    console.error('ERROR: JDK installation failed - java.exe not found');
    process.exit(1);
  }
  
  // Step 2: Download Android SDK Command-line Tools
  const cmdlineToolsZip = path.join(TOOLS_DIR, 'cmdline-tools.zip');
  await downloadFile(
    'https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip',
    cmdlineToolsZip
  );
  
  const cmdlineToolsDir = path.join(ANDROID_SDK_DIR, 'cmdline-tools');
  ensureDir(cmdlineToolsDir);
  extractZip(cmdlineToolsZip, path.join(cmdlineToolsDir, 'temp'));
  
  // The extracted folder is named "cmdline-tools", we need to rename it to "latest"
  const extractedCmdline = path.join(cmdlineToolsDir, 'temp', 'cmdline-tools');
  const finalCmdline = path.join(cmdlineToolsDir, 'latest');
  if (fs.existsSync(extractedCmdline)) {
    if (fs.existsSync(finalCmdline)) {
      fs.rmSync(finalCmdline, { recursive: true, force: true });
    }
    fs.renameSync(extractedCmdline, finalCmdline);
    fs.rmSync(path.join(cmdlineToolsDir, 'temp'), { recursive: true, force: true });
  }
  
  // Step 3: Accept licenses and install required SDK components
  const sdkManager = path.join(cmdlineToolsDir, 'latest', 'bin', 'sdkmanager.bat');
  console.log(`SDK Manager: ${sdkManager}`);
  
  if (fs.existsSync(sdkManager)) {
    const envSetup = `set JAVA_HOME=${JDK_DIR} & set ANDROID_SDK_ROOT=${ANDROID_SDK_DIR} & set PATH=%JAVA_HOME%\\bin;%PATH% &`;
    
    console.log('Accepting Android SDK licenses...');
    try {
      execSync(`${envSetup} "${sdkManager}" --licenses`, {
        stdio: 'pipe',
        input: 'y\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\n',
        maxBuffer: 1024 * 1024 * 1024
      });
    } catch (e) {
      // Accepting licenses often exits with non-zero code, that's okay
    }
    
    console.log('Installing required Android SDK components...');
    const packages = [
      'platform-tools',
      'platforms;android-34',
      'build-tools;34.0.0'
    ];
    
    execSync(
      `${envSetup} "${sdkManager}" --install ${packages.join(' ')}`,
      { stdio: 'inherit', maxBuffer: 1024 * 1024 * 1024 }
    );
    
    console.log('Android SDK installed successfully!');
  } else {
    console.error('ERROR: SDK Manager not found');
    process.exit(1);
  }
  
  console.log('\n=== ENVIRONMENT SETUP COMPLETE ===');
  console.log(`JAVA_HOME: ${JDK_DIR}`);
  console.log(`ANDROID_SDK_ROOT: ${ANDROID_SDK_DIR}`);
  console.log(`\nTo build APK, run:`);
  console.log(`  set JAVA_HOME=${JDK_DIR}`);
  console.log(`  set ANDROID_SDK_ROOT=${ANDROID_SDK_DIR}`);
  console.log(`  cd android && gradlew.bat assembleDebug`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
