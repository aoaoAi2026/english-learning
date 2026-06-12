@echo off
setlocal enabledelayedexpansion

echo.
echo ====================================
echo   APK Build Script
echo ====================================
echo.

REM ========= CONFIG (change for your project) =========
set APP_NAME=EnglishLearning
set PACKAGE_NAME=com.english.learning
set WEB_DIR=dist
set BUILD_CMD=npm run build
REM =================================================

REM --- Auto-detect JDK 17 or 21 ---
set JAVA_HOME=
if exist "C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot\bin\java.exe" set JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot
if "!JAVA_HOME!"=="" if exist "C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot\bin\java.exe" set JAVA_HOME=C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot
if "!JAVA_HOME!"=="" if exist "C:\Program Files\Java\jdk-21\bin\java.exe" set JAVA_HOME=C:\Program Files\Java\jdk-21
if "!JAVA_HOME!"=="" if exist "C:\Program Files\Java\jdk-17\bin\java.exe" set JAVA_HOME=C:\Program Files\Java\jdk-17
if "!JAVA_HOME!"=="" if exist "E:\android-tools\jdk17\bin\java.exe" set JAVA_HOME=E:\android-tools\jdk17

REM --- Auto-detect Android SDK ---
set ANDROID_SDK=
if exist "C:\Android\Sdk\platform-tools" set ANDROID_SDK=C:\Android\Sdk
if "!ANDROID_SDK!"=="" if exist "C:\Users\!USERNAME!\AppData\Local\Android\Sdk\platform-tools" set ANDROID_SDK=C:\Users\!USERNAME!\AppData\Local\Android\Sdk
if "!ANDROID_SDK!"=="" if exist "E:\android-tools\android-sdk\platform-tools" set ANDROID_SDK=E:\android-tools\android-sdk

REM --- env variable override ---
if not "!ANDROID_HOME!"=="" if exist "!ANDROID_HOME!\platform-tools" set ANDROID_SDK=!ANDROID_HOME!
if not "!ANDROID_SDK_ROOT!"=="" if exist "!ANDROID_SDK_ROOT!\platform-tools" set ANDROID_SDK=!ANDROID_SDK_ROOT!

set ANDROID_SDK_ROOT=!ANDROID_SDK!
set ANDROID_HOME=!ANDROID_SDK!
set PATH=!JAVA_HOME!\bin;!ANDROID_SDK!\platform-tools;!PATH!


echo [Step 1/5] Checking environment ...
if "!JAVA_HOME!"=="" (
    echo [X] JDK not found. Please install JDK 17 or 21.
    echo     or edit script and set JAVA_HOME manually.
    echo     common locations:
    echo       C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot
    echo       C:\Program Files\Java\jdk-21
    pause
    exit /b 1
)
echo [OK] JAVA_HOME: !JAVA_HOME!
"!JAVA_HOME!\bin\java.exe" -version 2>&1 | findstr "version"

if "!ANDROID_SDK!"=="" (
    echo [X] Android SDK not found. Please install Android Studio or standalone command-line tools.
    pause
    exit /b 1
)
echo [OK] ANDROID_SDK: !ANDROID_SDK!
echo.

echo [Step 2/5] Checking Node.js and dependencies ...
node -v 2>&1 | findstr "v"
if errorlevel 1 (
    echo [X] Node.js not installed. Visit https://nodejs.org/
    pause
    exit /b 1
)
if not exist package.json (
    echo [X] package.json not found. Run this script from your project root directory.
    pause
    exit /b 1
)
if not exist node_modules (
    echo     Installing dependencies ...
    call npm install
    if errorlevel 1 (
        echo [X] npm install failed.
        pause
        exit /b 1
    )
)
echo [OK] Node.js and dependencies ready.
echo.

echo [Step 3/5] Building web project ...
call %BUILD_CMD%
if errorlevel 1 (
    echo [X] Build failed.
    pause
    exit /b 1
)
if not exist %WEB_DIR%\index.html (
    echo [X] %WEB_DIR%\index.html not found after build.
    echo     Check WEB_DIR in script config section.
    pause
    exit /b 1
)
echo [OK] Web build completed.
echo.

echo [Step 4/5] Capacitor setup and sync ...
if not exist node_modules\@capacitor\core (
    echo     Installing @capacitor/core and @capacitor/cli ...
    call npm install @capacitor/core @capacitor/cli
)
if not exist node_modules\@capacitor\android (
    echo     Installing @capacitor/android ...
    call npm install @capacitor/android
)
if not exist capacitor.config.json (
    if not exist capacitor.config.ts (
        echo     Initializing Capacitor config ...
        call npx cap init %APP_NAME% %PACKAGE_NAME% --web-dir=%WEB_DIR%
    )
)
if not exist android (
    echo     Adding Android platform ...
    call npx cap add android
)
echo     Syncing web assets to Android ...
call npx cap sync android
if errorlevel 1 (
    echo [X] Capacitor sync failed.
    pause
    exit /b 1
)
echo [OK] Android platform ready.
echo.

echo [Step 5/5] Writing local.properties and compiling APK ...
> android\local.properties echo sdk.dir=!ANDROID_SDK:\=\\!
cd android
echo     Running Gradle assembleDebug ...
call gradlew.bat assembleDebug
if errorlevel 1 (
    cd ..
    echo [X] Gradle compilation failed. See logs above.
    pause
    exit /b 1
)
cd ..

if exist android\app\build\outputs\apk\debug\app-debug.apk (
    echo.
    echo ====================================
    echo   [OK] APK build succeeded!
    echo ====================================
    echo  Source: !cd!\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    copy /Y android\app\build\outputs\apk\debug\app-debug.apk %APP_NAME%-debug.apk
    echo  Copied to project root: %APP_NAME%-debug.apk
    for %%A in ("%APP_NAME%-debug.apk") do echo  File size: %%~zA bytes
    echo.
    echo  Next: transfer %APP_NAME%-debug.apk to your Android device.
) else (
    echo [X] APK not generated. See logs above.
)

echo.
pause
endlocal
