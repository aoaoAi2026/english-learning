param(
    [string]$ToolsDir = "E:\android-tools"
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$JdkDir = Join-Path $ToolsDir "jdk17"
$AndroidSdkDir = Join-Path $ToolsDir "android-sdk"

function Ensure-Dir($path) {
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}

function Download-File($url, $dest) {
    Write-Host "Downloading: $url" -ForegroundColor Cyan
    Write-Host "  -> $dest"
    if (Test-Path $dest) {
        Remove-Item $dest -Force
    }
    $webClient = New-Object System.Net.WebClient
    $webClient.DownloadFile($url, $dest)
    $size = [math]::Round((Get-Item $dest).Length / 1MB, 2)
    Write-Host "  Download completed: ${size}MB" -ForegroundColor Green
}

Ensure-Dir $ToolsDir
Ensure-Dir $JdkDir
Ensure-Dir $AndroidSdkDir

# Step 1: Download and extract JDK 17
$jdkZip = Join-Path $ToolsDir "jdk17.zip"
if (-not (Test-Path (Join-Path $JdkDir "bin\java.exe"))) {
    Download-File "https://corretto.aws/downloads/latest/amazon-corretto-17-x64-windows-jdk.zip" $jdkZip
    Write-Host "Extracting JDK..." -ForegroundColor Cyan
    Expand-Archive -Path $jdkZip -DestinationPath $ToolsDir -Force
    $extracted = Get-ChildItem $ToolsDir -Directory | Where-Object { $_.Name.StartsWith("jdk17") -and $_.Name -ne "jdk17" } | Select-Object -First 1
    if ($extracted) {
        $extractedPath = $extracted.FullName
        Write-Host "  Moving JDK files from $extractedPath to $JdkDir"
        Get-ChildItem $extractedPath | Move-Item -Destination $JdkDir
        Remove-Item $extractedPath -Force -Recurse
    }
    Write-Host "  JDK extracted" -ForegroundColor Green
}

# Verify JDK
$javaExe = Join-Path $JdkDir "bin\java.exe"
if (Test-Path $javaExe) {
    Write-Host "JDK 17 installed successfully!" -ForegroundColor Green
    & $javaExe -version 2>&1 | Out-Host
} else {
    Write-Error "JDK installation failed - java.exe not found at $javaExe"
    exit 1
}

# Step 2: Download Android SDK Command-line Tools
$cmdlineZip = Join-Path $ToolsDir "cmdline-tools.zip"
$cmdlineToolsDir = Join-Path $AndroidSdkDir "cmdline-tools"
$sdkManager = Join-Path $cmdlineToolsDir "latest\bin\sdkmanager.bat"

if (-not (Test-Path $sdkManager)) {
    Download-File "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip" $cmdlineZip
    Write-Host "Extracting command-line tools..." -ForegroundColor Cyan
    $tempDir = Join-Path $cmdlineToolsDir "temp"
    Ensure-Dir $cmdlineToolsDir
    Expand-Archive -Path $cmdlineZip -DestinationPath $tempDir -Force
    $extractedCmdline = Join-Path $tempDir "cmdline-tools"
    $finalCmdline = Join-Path $cmdlineToolsDir "latest"
    if (Test-Path $extractedCmdline) {
        if (Test-Path $finalCmdline) {
            Remove-Item $finalCmdline -Force -Recurse
        }
        Rename-Item $extractedCmdline -NewName "latest"
        Move-Item (Join-Path $tempDir "latest") -Destination $cmdlineToolsDir
        Remove-Item $tempDir -Force -Recurse
    }
    Write-Host "  Command-line tools extracted" -ForegroundColor Green
}

Write-Host "SDK Manager: $sdkManager" -ForegroundColor Cyan

# Step 3: Install required SDK components
if (Test-Path $sdkManager) {
    $env:JAVA_HOME = $JdkDir
    $env:ANDROID_SDK_ROOT = $AndroidSdkDir
    $env:ANDROID_HOME = $AndroidSdkDir
    $oldPath = $env:PATH
    $env:PATH = "$JdkDir\bin;$env:PATH"

    Write-Host "`nInstalling required Android SDK components..." -ForegroundColor Cyan
    $packages = @(
        "platform-tools",
        "platforms;android-34",
        "build-tools;34.0.0"
    )
    
    # Accept licenses first
    Write-Host "  Accepting licenses..."
    $yesInput = ("y`n" * 30)
    $process = Start-Process -FilePath $sdkManager -ArgumentList "--licenses" -NoNewWindow -Wait -PassThru -RedirectStandardInput (Join-Path $env:TEMP "licenses-input.txt")
    $yesInput | Out-File -FilePath (Join-Path $env:TEMP "licenses-input.txt") -Encoding ASCII
    
    # Use echo command to pipe y
    $installCmd = "echo y | `"$sdkManager`" --install " + ($packages -join " ")
    Write-Host "  Running: $installCmd"
    
    # Use cmd.exe to handle piping
    & cmd.exe /c "echo y|" `"$sdkManager`" --install $($packages -join " ") 2>&1 | Out-Host
    
    $env:PATH = $oldPath
    Write-Host "  Android SDK components installed!" -ForegroundColor Green
} else {
    Write-Error "SDK Manager not found at $sdkManager"
    exit 1
}

Write-Host "`n=== ENVIRONMENT SETUP COMPLETE ===" -ForegroundColor Green
Write-Host "JAVA_HOME: $JdkDir"
Write-Host "ANDROID_SDK_ROOT: $AndroidSdkDir"
Write-Host "`nTo build APK, run:" -ForegroundColor Yellow
Write-Host "  `$env:JAVA_HOME = `"$JdkDir`""
Write-Host "  `$env:ANDROID_SDK_ROOT = `"$AndroidSdkDir`""
Write-Host "  cd android ; .\gradlew.bat assembleDebug"
