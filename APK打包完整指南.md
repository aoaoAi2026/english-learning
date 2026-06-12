# 📱 任何 Web 项目打包成 APK 完整指南

> **适用范围**：所有能构建出静态网页（HTML + CSS + JS + 资源文件）的前端项目
>
> 例如：Vue、React、Angular、Svelte、Vite、Webpack、纯 HTML 项目……都可以用本方法打包成 APK

文件	说明
APK打包完整指南.md	  最完整的教程文档，包含原理、步骤、所有脚本、各种项目适配、常见问题
build-apk.cjs	✅ 推荐！跨平台一键打包脚本（Windows/macOS/Linux 通用）
build-apk.bat	Windows 专用批处理脚本（双击即可运行）
build-apk.sh	macOS/Linux 专用 Shell 脚本
download-server.cjs	HTTP 文件服务器脚本（手机下载 APK 用）
start-download-server.cjs	✅ 推荐！自动查找 APK + 生成下载页 + 启动服务器


---

## 一、核心原理

我们使用的是 **Capacitor**（Ionic 团队开发的开源项目），它的工作方式：

```
┌─────────────────────────┐
│   你的 Web 项目代码     │
│  (HTML / CSS / JS)      │
└──────────┬──────────────┘
           │
           ▼  构建（npm run build）
           │
           ▼
┌─────────────────────────┐
│    dist/ 目录           │
│  (静态产物)             │
└──────────┬──────────────┘
           │
           ▼  Capacitor 封装
           │
           ▼
┌─────────────────────────┐
│    Android WebView      │  ←  把网页装进原生外壳
│  +  原生壳 (APK 容器)  │
└──────────┬──────────────┘
           │
           ▼  Gradle 编译
           │
           ▼
┌─────────────────────────┐
│       .apk 文件         │
└─────────────────────────┘
```

**一句话总结**：把你项目的 `dist/` 文件夹塞进 Android 的 WebView 里，再用 Gradle 编译成 APK。

---

## 二、前置环境要求

在开始之前，你的电脑必须安装好以下工具。**缺一不可**。

| 工具 | 作用 | 最低版本 | 验证命令 |
|------|------|---------|----------|
| **Node.js** | 运行打包脚本、npm 包管理 | ≥ 18 | `node -v` |
| **npm** | 安装依赖包 | 随 Node 自带 | `npm -v` |
| **Java JDK** | Gradle（Android 构建工具）需要 | 11 ~ 17 | `java -version` |
| **Android SDK** | 编译 Android 应用 | 建议最新 | 见下方 |

### 2.1 安装 Node.js（如果还没装）

去官网下载安装 LTS 版本：https://nodejs.org/

### 2.2 安装 Java JDK

**Windows 用户推荐**：下载 [Amazon Corretto 17](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html)（免费、稳定）

安装完成后配置环境变量：
- 新增系统变量：`JAVA_HOME` = `C:\Program Files\Amazon Corretto\jdk17.0.12_7`
- 在 `Path` 变量中新增：`%JAVA_HOME%\bin`

### 2.3 安装 Android SDK

**最简单的方式**：安装 [Android Studio](https://developer.android.com/studio)（虽然装整个 IDE 比较大，但它会帮你自动配置好 SDK）

安装完成后，在 Android Studio 中：
1. 打开 `Tools` → `SDK Manager`
2. 勾选 `Android SDK Platform 34`（或最新稳定版）
3. 勾选 `Android SDK Build-Tools 34.x.x`
4. 勾选 `Android SDK Platform-Tools`
5. 点击 `Apply` 下载安装

**不想装 Android Studio？** 也可以只下载 **Command Line Tools**：
https://developer.android.com/studio#command-tools

配置环境变量：
- 新增系统变量：`ANDROID_HOME` = `C:\Users\你的用户名\AppData\Local\Android\Sdk`
- 在 `Path` 变量中新增：
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\cmdline-tools\latest\bin`
  - `%ANDROID_HOME%\build-tools\34.0.0`（选已安装的版本）

### 2.4 验证环境

打开一个新的终端窗口，依次执行以下命令，全部有正确输出版本号就说明环境 OK：

```bash
node -v          # 应该输出类似 v20.11.0
npm -v           # 应该输出类似 10.2.4
java -version    # 应该输出 openjdk version "17.0.12"
adb version      # 应该输出 Android Debug Bridge version 1.0.41
```

---

## 三、打包完整步骤（手动方式）

下面以任意一个前端项目为例，逐步操作。

### 第 1 步：进入你的项目目录

```bash
cd 你的项目路径
```

例如：
```bash
cd e:\internal_safe\math_small
```

### 第 2 步：确保项目能正常构建

**首先**，你的项目必须能正常构建出静态产物。通常是：

```bash
npm install     # 安装依赖（如果还没装）
npm run build   # 构建项目
```

构建完成后，确认你的项目中多了一个 `dist/` 目录（有些项目叫 `build/`），里面有 `index.html` 文件。

```bash
# 验证一下
ls dist/        # 应该看到 index.html, assets/ 等文件
```

> 💡 **如果你的构建输出目录不是 `dist/`**，例如是 `build/`，记住这个名字，后面会用到。

### 第 3 步：安装 Capacitor 核心依赖

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

这会安装 3 个包：
- `@capacitor/core`：Capacitor 核心运行时
- `@capacitor/cli`：Capacitor 命令行工具（执行 `npx cap` 命令）
- `@capacitor/android`：Android 平台支持

### 第 4 步：初始化 Capacitor 配置

```bash
npx cap init 应用名 com.你的包名.app --web-dir=dist
```

参数说明：
- **应用名**：APK 安装后在手机上显示的名字（中文也可以）
- **com.你的包名.app**：应用的唯一标识符，必须是反向域名格式，例如 `com.mathsmall.app`、`com.company.project`
- **--web-dir=dist**：告诉 Capacitor 你的网页构建产物在 `dist/` 目录下，如果你的项目用 `build/` 就写 `--web-dir=build`

**实际示例**：
```bash
npx cap init MathSmall com.mathsmall.app --web-dir=dist
```

执行后，项目根目录会新增一个文件：`capacitor.config.ts`（或 `.json`）

### 第 5 步：添加 Android 平台

```bash
npx cap add android
```

这一步会在项目中创建一个 `android/` 目录，里面放着完整的 Android 原生项目结构。

执行后目录结构大致如下：
```
你的项目/
├── dist/                    # Web 构建产物
├── android/                 # Android 原生项目
│   ├── app/                 # 应用模块
│   │   ├── build.gradle     # 应用的 Gradle 配置
│   │   └── src/main/        # Android 源码与资源
│   ├── build.gradle         # 项目级 Gradle 配置
│   ├── settings.gradle
│   ├── gradlew.bat          # Windows 下的 Gradle 脚本 ⭐
│   ├── gradlew              # Linux/Mac 下的 Gradle 脚本
│   └── local.properties     # SDK 路径配置（见第7步）
└── capacitor.config.ts      # Capacitor 配置
```

### 第 6 步（重要）：同步 Web 资源到 Android

每次修改 Web 代码并重新 `npm run build` 后，都要执行：

```bash
npx cap sync android
```

这条命令做两件事：
1. 把 `dist/` 目录下的所有文件复制到 `android/app/src/main/assets/public/`
2. 更新 Android 的插件配置

### 第 7 步：配置 Android SDK 路径（关键一步！）

在 `android/` 目录下创建一个文件 `local.properties`，内容如下：

```properties
sdk.dir=C\:\\Android\\Sdk
```

> ⚠️ **路径要换成你自己的**
>
> 在 Windows 上，SDK 默认位置是：
> - `C:\Users\你的用户名\AppData\Local\Android\Sdk`
> - 或者 `C:\Android\Sdk`
>
> 在 macOS 上：
> - `/Users/你的用户名/Library/Android/sdk`
>
> 在 Linux 上：
> - `/home/你的用户名/Android/Sdk`
>
> **注意路径中的反斜杠要写成 `\\`（转义）**，并且冒号前也要有反斜杠 `\:`

**如何确认 SDK 在哪里？**

Windows PowerShell 执行：
```powershell
if (Test-Path "$env:LOCALAPPDATA\Android\Sdk") { Write-Output "$env:LOCALAPPDATA\Android\Sdk" }
elseif (Test-Path "C:\Android\Sdk") { Write-Output "C:\Android\Sdk" }
else { Write-Output "SDK 未安装或路径不明" }
```

### 第 8 步：编译生成 APK

进入 `android` 目录执行 Gradle 构建：

**Windows（PowerShell / CMD）**：
```bash
cd android
.\gradlew.bat assembleDebug
```

**macOS / Linux**：
```bash
cd android
./gradlew assembleDebug
```

首次构建会比较慢，因为 Gradle 要下载一堆依赖包。

看到 `BUILD SUCCESSFUL` 就成功了！

### 第 9 步：找到 APK 文件

APK 在这个位置：

```
你的项目/android/app/build/outputs/apk/debug/app-debug.apk
```

文件大小通常 5~10 MB 左右。

---

## 四、一键自动化脚本

手动输入这么多命令太麻烦，下面是 **一键打包脚本**。把它放到你的项目根目录运行即可。

### 4.1 Windows 批处理脚本：`build-apk.bat`

```bat
@echo off
REM ============================================================
REM  一键打包 Web 项目为 APK（Windows 版）
REM  使用方法: 把本文件放到项目根目录，双击运行
REM ============================================================

echo ====================================
echo   📱 APK 一键打包脚本
echo ====================================
echo.

REM ---------- 配置区（按需修改）----------
set APP_NAME=MyApp
set PACKAGE_NAME=com.myapp.app
set WEB_DIR=dist
set ANDROID_SDK=C:\Android\Sdk
REM ------------------------------------

echo [1/7] 检查 Node.js 环境...
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ 未安装 Node.js，请先安装 https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js OK
echo.

echo [2/7] 安装项目依赖并构建...
if not exist node_modules (
    call npm install
)
call npm run build
if not exist %WEB_DIR%\index.html (
    echo ❌ 构建失败，%WEB_DIR%/index.html 不存在
    pause
    exit /b 1
)
echo ✅ 构建完成
echo.

echo [3/7] 安装 Capacitor...
call npm install @capacitor/core @capacitor/cli @capacitor/android
echo ✅ Capacitor 安装完成
echo.

echo [4/7] 初始化 Capacitor 配置...
call npx cap init %APP_NAME% %PACKAGE_NAME% --web-dir=%WEB_DIR%
echo ✅ 初始化完成
echo.

echo [5/7] 添加 Android 平台...
if not exist android (
    call npx cap add android
)
call npx cap sync android
echo ✅ Android 平台准备完成
echo.

echo [6/7] 配置 SDK 路径...
(
    echo sdk.dir=%ANDROID_SDK:\=\\%
) > android\local.properties
echo ✅ local.properties 已生成
echo.

echo [7/7] 编译 APK...
cd android
call gradlew.bat assembleDebug
cd ..

if exist android\app\build\outputs\apk\debug\app-debug.apk (
    echo.
    echo ====================================
    echo   ✅ 打包成功！
    echo ====================================
    echo APK 位置: %cd%\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    REM 把 APK 复制到项目根目录，方便查找
    copy /Y android\app\build\outputs\apk\debug\app-debug.apk %APP_NAME%-debug.apk
    echo 已复制到项目根目录: %APP_NAME%-debug.apk
) else (
    echo ❌ 打包失败，请查看上方日志
)

echo.
pause
```

**使用方法**：
1. 把上面的代码保存为 `build-apk.bat`，放到你的项目根目录
2. 修改文件开头的 `APP_NAME`、`PACKAGE_NAME`、`WEB_DIR`、`ANDROID_SDK` 四个变量
3. 双击运行

### 4.2 Shell 脚本：`build-apk.sh`（macOS / Linux）

```bash
#!/bin/bash
# ============================================================
#  一键打包 Web 项目为 APK（macOS / Linux 版）
#  使用方法: chmod +x build-apk.sh && ./build-apk.sh
# ============================================================

# ---------- 配置区（按需修改）----------
APP_NAME="MyApp"
PACKAGE_NAME="com.myapp.app"
WEB_DIR="dist"
ANDROID_SDK="$HOME/Library/Android/sdk"   # macOS 默认路径
# ANDROID_SDK="$HOME/Android/Sdk"          # Linux 默认路径
# --------------------------------------

echo "===================================="
echo "  📱 APK 一键打包脚本"
echo "===================================="
echo ""

echo "[1/7] 检查 Node.js 环境..."
if ! command -v node &> /dev/null; then
    echo "❌ 未安装 Node.js，请先安装 https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js OK"
echo ""

echo "[2/7] 安装项目依赖并构建..."
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build
if [ ! -f "$WEB_DIR/index.html" ]; then
    echo "❌ 构建失败，$WEB_DIR/index.html 不存在"
    exit 1
fi
echo "✅ 构建完成"
echo ""

echo "[3/7] 安装 Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/android
echo "✅ Capacitor 安装完成"
echo ""

echo "[4/7] 初始化 Capacitor 配置..."
npx cap init $APP_NAME $PACKAGE_NAME --web-dir=$WEB_DIR
echo "✅ 初始化完成"
echo ""

echo "[5/7] 添加 Android 平台并同步..."
if [ ! -d "android" ]; then
    npx cap add android
fi
npx cap sync android
echo "✅ Android 平台准备完成"
echo ""

echo "[6/7] 配置 SDK 路径..."
echo "sdk.dir=$ANDROID_SDK" > android/local.properties
echo "✅ local.properties 已生成"
echo ""

echo "[7/7] 编译 APK..."
cd android
./gradlew assembleDebug
cd ..

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo ""
    echo "===================================="
    echo "  ✅ 打包成功！"
    echo "===================================="
    echo "APK 位置: $(pwd)/$APK_PATH"
    echo ""
    cp "$APK_PATH" "${APP_NAME}-debug.apk"
    echo "已复制到项目根目录: ${APP_NAME}-debug.apk"
else
    echo "❌ 打包失败，请查看上方日志"
fi

echo ""
```

**使用方法**：
```bash
chmod +x build-apk.sh
./build-apk.sh
```

### 4.3 Node.js 跨平台脚本：`build-apk.cjs`

如果你想要一个 **在 Windows / macOS / Linux 都能直接运行** 的脚本，推荐用 Node.js 写：

```javascript
// ============================================================
//  一键打包 Web 项目为 APK（跨平台版）
//  使用方法: node build-apk.cjs
// ============================================================

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ---------- 配置区（按需修改）----------
const config = {
  appName: 'MyApp',           // 应用显示名
  packageName: 'com.myapp.app', // 反向域名格式，如 com.公司名.项目名
  webDir: 'dist',             // 你的 Web 构建输出目录
  // Android SDK 路径，按系统自动判断
  androidSdk: os.platform() === 'win32'
    ? (fs.existsSync('C:\\Android\\Sdk') ? 'C:\\Android\\Sdk'
       : path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk'))
    : path.join(os.homedir(), 'Library', 'Android', 'sdk')
};
// --------------------------------------

const log = (msg) => console.log(`\n📌 ${msg}`);
const ok = (msg) => console.log(`✅ ${msg}`);
const err = (msg) => console.log(`❌ ${msg}`);
const run = (cmd) => {
  console.log(`  $ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
};

console.log(`
====================================
  📱 APK 一键打包脚本（跨平台）
====================================
配置:
  应用名: ${config.appName}
  包名:   ${config.packageName}
  Web目录: ${config.webDir}
  SDK路径: ${config.androidSdk}
====================================
`);

// 1. 检查 Node.js
log('[1/7] 检查 Node.js 环境...');
try { run('node -v'); ok('Node.js OK'); }
catch { err('未安装 Node.js，请先安装 https://nodejs.org/'); process.exit(1); }

// 2. 安装依赖并构建 Web 项目
log('[2/7] 安装依赖并构建 Web 项目...');
if (!fs.existsSync('node_modules')) run('npm install');
run('npm run build');
if (!fs.existsSync(path.join(config.webDir, 'index.html'))) {
  err(`构建失败，${config.webDir}/index.html 不存在`);
  process.exit(1);
}
ok('Web 构建完成');

// 3. 安装 Capacitor
log('[3/7] 安装 Capacitor...');
run('npm install @capacitor/core @capacitor/cli @capacitor/android');
ok('Capacitor 安装完成');

// 4. 初始化配置
log('[4/7] 初始化 Capacitor 配置...');
run(`npx cap init ${config.appName} ${config.packageName} --web-dir=${config.webDir}`);
ok('初始化完成');

// 5. 添加 Android 平台 + 同步
log('[5/7] 添加 Android 平台并同步资源...');
if (!fs.existsSync('android')) run('npx cap add android');
run('npx cap sync android');
ok('Android 平台准备完成');

// 6. 写 local.properties
log('[6/7] 配置 Android SDK 路径...');
const sdkDir = os.platform() === 'win32'
  ? config.androidSdk.replace(/\\/g, '\\\\')
  : config.androidSdk;
fs.writeFileSync(
  path.join('android', 'local.properties'),
  `sdk.dir=${sdkDir}\n`
);
ok('local.properties 已生成');

// 7. 编译 APK
log('[7/7] 编译 APK（首次较慢，请耐心等待）...');
const gradlew = os.platform() === 'win32' ? 'gradlew.bat' : './gradlew';
execSync(`${gradlew} assembleDebug`, {
  stdio: 'inherit',
  cwd: path.join(process.cwd(), 'android')
});

// 8. 检查结果
const apkPath = path.join('android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
if (fs.existsSync(apkPath)) {
  const stats = fs.statSync(apkPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  const outName = `${config.appName}-debug.apk`;
  fs.copyFileSync(apkPath, outName);
  console.log(`
====================================
  ✅ 打包成功！
====================================
📦 APK 大小: ${sizeMB} MB
📁 原始路径: ${path.resolve(apkPath)}
📁 快捷路径: ${path.resolve(outName)}（已复制到项目根目录）
====================================
`);
} else {
  err('打包失败，APK 文件未生成，请查看上方日志');
  process.exit(1);
}
```

**使用方法**（任何系统都可以）：
```bash
node build-apk.cjs
```

---

## 五、手机下载服务器脚本

打包好 APK 后，怎么传到手机上？最方便的方式是 **在电脑上开个 HTTP 服务器，手机浏览器访问下载**。

### 5.1 下载页面 HTML：`dist/download.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>APK 下载</title>
<style>
  body {
    margin: 0;
    font-family: -apple-system, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .card {
    background: white;
    border-radius: 20px;
    padding: 40px 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  h1 { color: #333; margin-bottom: 10px; font-size: 24px; }
  .subtitle { color: #666; margin-bottom: 30px; font-size: 14px; }
  .download-btn {
    display: block; width: 100%; padding: 18px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white; border: none; border-radius: 12px;
    font-size: 18px; font-weight: bold; text-decoration: none;
    cursor: pointer; margin-bottom: 20px;
  }
  .file-info { background: #f5f5f7; padding: 15px; border-radius: 10px;
    margin-bottom: 20px; font-size: 13px; color: #555; text-align: left; }
  .tips { text-align: left; font-size: 13px; color: #666;
    background: #fff8e1; padding: 15px; border-radius: 10px;
    border-left: 4px solid #ffc107; }
  .tips h3 { margin: 0 0 10px 0; color: #e65100; font-size: 14px; }
  .tips ol { margin: 0; padding-left: 20px; }
</style>
</head>
<body>
  <div class="card">
    <h1>📱 应用下载</h1>
    <p class="subtitle">点击下方按钮下载并安装</p>
    <div class="file-info">
      <p><strong>文件名：</strong>app-debug.apk</p>
      <p><strong>版本：</strong>1.0</p>
    </div>
    <a href="/app-debug.apk" class="download-btn">⬇️ 立即下载 APK</a>
    <div class="tips">
      <h3>💡 安装提示</h3>
      <ol>
        <li>点击上方按钮下载 APK 文件</li>
        <li>下载完成后点击文件进行安装</li>
        <li>如果提示"未知来源"，请在设置中允许安装</li>
        <li>安装完成后即可打开应用</li>
      </ol>
    </div>
  </div>
</body>
</html>
```

### 5.2 HTTP 下载服务器：`download-server.cjs`

```javascript
// ============================================================
//  APK 下载服务器
//  用法: node download-server.cjs
//  手机和电脑连同一 Wi-Fi，访问 http://电脑IP:8080/
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// MIME 类型映射
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.apk': 'application/vnd.android.package-archive',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const distDir = path.join(__dirname, 'dist');
const PORT = 8080;

// 获取本机局域网 IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // 排除 127.0.0.1 和 VMware 虚拟网卡等
        if (iface.address.startsWith('192.168.') ||
            iface.address.startsWith('10.') ||
            iface.address.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
          return iface.address;
        }
      }
    }
  }
  return '你的电脑IP';
}

const server = http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/download.html' : req.url;
  if (urlPath.includes('?')) urlPath = urlPath.split('?')[0];

  const filePath = path.join(distDir, urlPath);
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 文件未找到: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Content-Length': data.length,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log(`
====================================
  APK 下载服务器已启动
====================================
🖥  电脑浏览器:  http://localhost:${PORT}/
📱 手机浏览器:  http://${ip}:${PORT}/

提示：手机和电脑必须连同一个 Wi-Fi！
按 Ctrl+C 停止服务器
====================================
`);
});
```

### 5.3 使用流程

```bash
# 1. 先打包出 APK（用上一节的脚本）
node build-apk.cjs

# 2. 把 APK 复制到 dist/ 目录，让下载服务器能访问
#    （build-apk.cjs 已经生成了 MyApp-debug.apk 在项目根目录，复制过去）
#    Windows:
copy MyApp-debug.apk dist\app-debug.apk
#    或在 Linux/Mac:
cp MyApp-debug.apk dist/app-debug.apk

# 3. 把 download.html 放到 dist/ 目录（手动复制或写脚本）

# 4. 启动下载服务器
node download-server.cjs
```

### 5.4 更智能的：下载服务器启动脚本 `start-download-server.cjs`

```javascript
// ============================================================
//  一键启动 APK 下载服务器（自动复制 APK 到 dist）
//  用法: node start-download-server.cjs
// ============================================================

const fs = require('fs');
const path = require('path');

// 自动查找项目中的 APK 文件
function findAPK() {
  const candidates = [
    path.join('android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'),
    path.join('dist', 'app-debug.apk'),
    ...fs.readdirSync('.').filter(f => f.endsWith('.apk')).map(f => f)
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const apkPath = findAPK();
if (!apkPath) {
  console.log('❌ 找不到 APK 文件，请先执行 node build-apk.cjs 打包');
  process.exit(1);
}

console.log(`找到 APK: ${apkPath}`);

// 确保 dist 目录存在
if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });

// 复制 APK 到 dist
fs.copyFileSync(apkPath, path.join('dist', 'app-debug.apk'));
console.log('✅ APK 已复制到 dist/app-debug.apk');

// 如果没有 download.html，自动生成一个简单的
const dlHtml = path.join('dist', 'download.html');
if (!fs.existsSync(dlHtml)) {
  fs.writeFileSync(dlHtml, `<!DOCTYPE html><html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>APK 下载</title>
<style>body{font-family:sans-serif;background:#667eea;color:#fff;text-align:center;padding:40px}
.btn{display:inline-block;padding:20px 40px;background:#fff;color:#333;text-decoration:none;
border-radius:12px;font-size:20px;font-weight:bold;margin-top:30px}</style>
</head><body><h1>📱 点击下载 APK</h1>
<p>下载后点击文件进行安装</p>
<a class="btn" href="/app-debug.apk">⬇️ 立即下载</a></body></html>`);
  console.log('✅ 已生成下载页面');
}

// 启动服务器（直接调用 download-server.cjs）
require('./download-server.cjs');
```

---

## 六、不同类型项目的适配

### 6.1 Vite / Vue / React + Vite 项目

**构建输出目录**：`dist`（大部分 Vite 项目默认）

**需要修改**：`build-apk.cjs` 中的 `webDir: 'dist'`（默认已经是这个，通常不用改）

**示例**：
```javascript
const config = {
  appName: 'MyVueApp',
  packageName: 'com.company.vueapp',
  webDir: 'dist'    // ✅ Vite 默认
};
```

### 6.2 Create React App（旧版 CRA）

**构建输出目录**：`build`

**需要修改**：
```javascript
const config = {
  appName: 'MyReactApp',
  packageName: 'com.company.reactapp',
  webDir: 'build'    // ⚠️ CRA 用 build 而不是 dist
};
```

### 6.3 纯 HTML / CSS / JS 项目（没有 npm）

如果你的项目就是一个 `index.html` 加一些 CSS、JS，**没有 npm 也能打包**：

做法：手动创建一个 `dist/` 目录，把所有网页文件放进去，然后执行 Capacitor 命令。

```
my-simple-site/
├── index.html
├── style.css
├── app.js
└── images/
    └── logo.png
```

```bash
# 1. 手动创建 dist 并复制内容
mkdir dist
xcopy * dist\ /s /y     # Windows
cp -r * dist/           # Linux/Mac

# 2. 手动在目录里创建一个 package.json（npm 需要）
echo '{"name":"my-site","version":"1.0.0","private":true}' > package.json

# 3. 然后照常执行 Capacitor 命令
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init MySite com.mysite.app --web-dir=dist
npx cap add android
npx cap sync android
cd android && gradlew.bat assembleDebug
```

### 6.4 Next.js 项目（SSR 项目的特殊处理）

⚠️ **Next.js 默认的 SSR 不能直接打包**，因为它需要服务端运行。

**解决方案**：改用 **静态导出**：

修改 `next.config.mjs`（或 `next.config.js`）：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',    // 关键：启用静态导出
  images: { unoptimized: true }
};
export default nextConfig;
```

然后执行：
```bash
npm run build   # 会生成 out/ 目录
```

在打包脚本中设置 `webDir: 'out'`：
```javascript
const config = {
  appName: 'MyNextApp',
  packageName: 'com.company.nextapp',
  webDir: 'out'    // ⚠️ Next.js 静态导出默认输出到 out/
};
```

### 6.5 修改应用图标和启动画面

#### 修改应用图标

1. 准备一张 1024×1024 的 PNG 图标（透明背景）
2. 用在线工具生成各尺寸图标：https://easyappicon.com/
3. 把生成的图标文件夹覆盖到：
   ```
   android/app/src/main/res/mipmap-*/ic_launcher.png
   android/app/src/main/res/mipmap-*/ic_launcher_round.png
   ```

#### 修改应用名称

编辑 `android/app/src/main/res/values/strings.xml`：
```xml
<resources>
    <string name="app_name">你的应用名</string>
</resources>
```

#### 修改启动背景色

编辑 `android/app/src/main/res/values/themes.xml`：
```xml
<item name="colorPrimary">#667eea</item>
<item name="colorPrimaryDark">#5568d3</item>
```

---

## 七、capacitor.config.ts 完整配置说明

执行 `npx cap init` 后生成的配置文件，你可以手动修改它：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // 应用 ID（反向域名格式，唯一标识）
  appId: 'com.mathsmall.app',

  // 应用显示名（安装后在手机上显示的名字）
  appName: 'MathSmall',

  // Web 构建产物目录
  webDir: 'dist',

  // 打包时是否压缩 Web 资源（推荐 true）
  bundledWebRuntime: false,

  // Android 专属配置
  android: {
    // 构建时使用的 Android SDK 版本
    buildOptions: {
      keystorePath: '',    // 签名用（正式发布才需要）
      keystoreAlias: '',
    },
  },

  // 服务器配置（可选，用于远程调试）
  server: {
    // androidScheme: 'https'
    // url: 'http://192.168.1.100:3000'  // 调试时可以指向本地 dev server
  }
};

export default config;
```

---

## 八、打包 Release 版（正式签名版）

上面的 `assembleDebug` 生成的是 **debug 版 APK**，可以直接安装但不能上架应用商店。

如果你要发布到应用商店，需要构建 **release 版并签名**。

### 8.1 生成签名密钥

```bash
keytool -genkeypair -v -keystore my-release-key.keystore \
  -alias mykey -keyalg RSA -keysize 2048 -validity 10000
```

执行时会要求设置密码和填写信息，**务必记住密码**。

### 8.2 构建 Release 版

```bash
cd android

# Windows:
.\gradlew.bat assembleRelease

# macOS/Linux:
./gradlew assembleRelease
```

生成的 APK 在：
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 8.3 用密钥签名

```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore my-release-key.keystore app-release-unsigned.apk mykey

# 对齐优化（zipalign 在 Android SDK 的 build-tools 中）
zipalign -v 4 app-release-unsigned.apk MyApp-release.apk
```

---

## 九、常见问题与故障排除

### ❓ 问题 1：执行 `npx cap add android` 时报错 "Current working directory is not a Cordova-based project"

**原因**：项目中没有 `capacitor.config.ts`

**解决**：先执行 `npx cap init ...`

---

### ❓ 问题 2：Gradle 报错 "SDK location not found"

**原因**：`android/local.properties` 未配置或路径错误

**解决**：
```powershell
# Windows PowerShell
echo 'sdk.dir=C\:\\Android\\Sdk' > android/local.properties
```

检查 SDK 路径是否正确：
```powershell
Test-Path "C:\Android\Sdk"    # 应该返回 True
```

---

### ❓ 问题 3：Gradle 下载依赖非常慢甚至失败

**原因**：Gradle 默认从国外 Maven 仓库下载依赖，网络不稳定

**解决**：配置国内镜像源。编辑 `android/build.gradle`：

```groovy
allprojects {
    repositories {
        // 阿里云镜像（放前面，优先使用）
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        // 原始仓库（备用）
        google()
        mavenCentral()
    }
}
```

或者编辑 `android/gradle/wrapper/gradle-wrapper.properties`，把 Gradle 的下载地址换成国内镜像：
```properties
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.5-bin.zip
```

---

### ❓ 问题 4：构建成功，但 APK 打开后白屏 / 空白

**原因**：Web 资源没有正确同步到 Android 中

**解决**：
```bash
# 重新构建 Web
npm run build

# 强制重新同步
npx cap sync android

# 确认文件是否存在
ls android/app/src/main/assets/public/
# 应该能看到 index.html
```

**另一个常见原因**：项目使用了绝对路径的 `base href="/"`，导致在本地文件协议下资源加载失败。

**解决**：在 `vite.config.ts` 或 `index.html` 中设置相对路径：

```typescript
// vite.config.ts
export default {
  base: './'   // ⭐ 关键：用相对路径
};
```

或直接修改 `dist/index.html` 中的：
```html
<!-- 把绝对路径 / 改成相对路径 ./ -->
<base href="./">
```

---

### ❓ 问题 5：Web 项目用了 fetch 请求外部 API，APK 里请求失败

**原因**：Android 9+ 默认禁止明文 HTTP 请求；HTTPS 请求也需要配置网络安全策略

**解决**：

**方法 A**：都用 HTTPS 协议（推荐）

**方法 B**：允许明文请求。在 `android/app/src/main/res/xml/` 创建 `network_security_config.xml`：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </-base-config>
</network-security-config>
```

然后在 `android/app/src/main/AndroidManifest.xml` 中注册：

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
```

---

### ❓ 问题 6：`./gradlew: Permission denied`（macOS/Linux）

**解决**：给脚本加执行权限
```bash
chmod +x android/gradlew
```

---

### ❓ 问题 7：Java 版本不兼容报错

错误信息通常包含：
```
Unsupported class file major version 65
```

**原因**：Gradle 版本和 JDK 版本不匹配

**解决**：
- 使用 JDK 11 或 JDK 17（最稳定）
- 检查 `java -version` 输出
- 如果装了多个版本，设置 `JAVA_HOME` 指向正确版本

**版本对应关系参考**：
- Gradle 7.x → JDK 11 ~ 17
- Gradle 8.x → JDK 11 ~ 21

---

### ❓ 问题 8：修改了 Web 代码，重新打包但 APK 没变

**原因**：忘记执行 `npx cap sync android` 同步最新的 Web 资源

**解决**：每次修改 Web 代码后，完整流程是：
```bash
npm run build          # 重新构建 Web
npx cap sync android   # 同步到 Android
cd android && gradlew assembleDebug   # 重新编译 APK
```

---

### ❓ 问题 9：APK 安装到手机后图标不显示或安装失败

**原因**：应用包名冲突（之前装过同名包）、或 debug 签名证书过期

**解决**：
```bash
# 先卸载旧版本
adb uninstall com.your.app

# 重新安装
adb install app-debug.apk
```

---

### ❓ 问题 10：想清空重来，怎么清理干净？

```bash
# 删除 Capacitor 生成的文件
rm -rf android/        # Linux/Mac
rmdir /s android       # Windows CMD
Remove-Item -Recurse -Force android   # PowerShell

# 也可以删掉 node_modules 重新安装
rm -rf node_modules && npm install
```

然后从 `npx cap init ...` 重新开始。

---

## 十、完整命令速查表

| 操作 | 命令 |
|------|------|
| 初始化 Capacitor | `npx cap init 应用名 包名 --web-dir=dist` |
| 添加 Android 平台 | `npx cap add android` |
| 同步 Web 资源 | `npx cap sync android` |
| 同步并复制（另一个命令） | `npx cap copy android` |
| 只更新插件 | `npx cap update android` |
| 编译 debug APK | `cd android && gradlew assembleDebug` |
| 编译 release APK | `cd android && gradlew assembleRelease` |
| 打开 Android Studio | `npx cap open android` |
| 清缓存重新构建 | `cd android && gradlew clean && gradlew assembleDebug` |

---

## 十一、为什么选 Capacitor 而不是 Cordova / PhoneGap？

| 对比项 | Capacitor | Cordova / PhoneGap |
|--------|-----------|--------------------|
| 开发者 | Ionic 团队（持续活跃） | Apache（维护减少） |
| 构建产物大小 | 较小（~5MB） | 较大（~10MB+） |
| 配置方式 | 现代化的 TS 配置 | 传统的 XML 配置 |
| 插件生态 | 兼容 Cordova 插件 + 自有插件 | 插件较老，更新慢 |
| 开发体验 | `npx cap` 命令简洁 | 命令繁琐 |
| 更新频率 | 频繁更新 | 缓慢 |

---

## 十二、进阶：添加原生能力（可选）

Capacitor 还提供了很多官方插件，让你的网页 APP 可以调用手机原生功能：

```bash
# 调用相机
npm install @capacitor/camera

# 获取地理位置
npm install @capacitor/geolocation

# 推送通知
npm install @capacitor/push-notifications

# 文件系统
npm install @capacitor/filesystem

# 分享
npm install @capacitor/share

# 振动
npm install @capacitor/haptics
```

安装后同步：
```bash
npx cap sync android
```

在你的 JS 代码中调用：
```javascript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  console.log(image.webPath);
};
```

---

## 总结：把任意 Web 项目打包成 APK 的 3 个核心条件

1. ✅ **有 Node.js 环境**（`node -v` 能输出版本）
2. ✅ **有 Android SDK + Java**（`java -version` 和 SDK 路径正确）
3. ✅ **项目能 `npm run build` 生成静态网页**（有 `dist/index.html`）

只要满足这 3 条，**任何 Web 项目都能用本方法打包成 APK**。

```
┌─────────────────────────────────────────────────┐
│  简单三步搞定任何项目：                         │
│                                                 │
│  1. npm run build   → 生成 dist/               │
│  2. npx cap 命令    → 装壳                      │
│  3. gradlew 打包    → 出 APK                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**最后更新**：2026 年 6 月
**适用环境**：Node.js ≥ 18、JDK 11~17、Android SDK ≥ 34
