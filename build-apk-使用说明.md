# build-apk.bat 使用说明

## 这是什么

一个 Windows 一键打包脚本，可以把 **任何基于 Vite / Webpack + Capacitor 的 Web 项目** 打包成 Android APK。

## 前置环境（一次性）

| 工具 | 最低版本 | 本机已有的路径（按优先级） |
|------|----------|----------------------------|
| Node.js | 16+ | `C:\Program Files\nodejs` |
| JDK | 17 或 21 | `C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot`（首选）<br>`C:\Program Files\Microsoft\jdk-17*\*`<br>`C:\Program Files\Java\jdk-21`<br>`C:\Program Files\Java\jdk-17`<br>`E:\android-tools\jdk17` |
| Android SDK | API 30+ | `C:\Android\Sdk`（首选）<br>`C:\Users\你的用户名\AppData\Local\Android\Sdk`<br>`E:\android-tools\android-sdk` |

脚本会**自动逐个尝试**上面列的路径，哪个存在就用哪个；也会读取系统环境变量 `ANDROID_HOME` / `ANDROID_SDK_ROOT`。

### 还没装 Android SDK？（最快方案）

1. 装 Android Studio → 进入 Settings → SDK Manager → 装一个 SDK Platform（API 33+）
2. 或者**纯命令行**：下载 Android "Command line tools"，解压到 `C:\Android\Sdk\cmdline-tools\latest\`，然后：
   ```
   cd C:\Android\Sdk\cmdline-tools\latest\bin
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

## 使用步骤（3 步）

**1. 把 `build-apk.bat` 放到你的项目根目录**（`package.json` 所在目录）。

**2. 打开脚本，根据你的项目修改"配置区"的 4 个参数**：

```bat
set APP_NAME=MyApp                    ← 应用显示名，比如 "小学英语乐园"
set PACKAGE_NAME=com.example.myapp    ← 唯一包名，一般用公司域名反写，比如 com.yourcompany.app
set WEB_DIR=dist                      ← 构建产物目录，Vite 默认是 dist；旧 Webpack 项目可能是 build
set BUILD_CMD=npm run build           ← 构建命令，基本都是这个
```

**3. 双击运行**（或在命令行执行 `build-apk.bat`）。

脚本会依次完成：
- 检查 JDK / Android SDK / Node.js
- `npm install`（如果没装依赖）
- `npm run build`（打包 Web 前端）
- 安装 Capacitor 依赖（如果项目还没有）
- 初始化 Capacitor 配置（如果还没有）
- 添加 Android 平台（如果还没有）
- `npx cap sync android`（同步资源）
- `gradlew assembleDebug`（编译 APK）
- 成功后把 APK 复制到项目根目录：`MyApp-debug.apk`

## 首次运行会慢

- Gradle 会下载很多依赖，后续会快很多。
- 如果看到卡在 `Downloading https://services.gradle.org/...`，是正常网络下载。

## 安装到手机

方式 A（推荐）：
1. 手机开启 "开发者选项 → USB 调试"
2. 数据线连接电脑
3. 在项目目录执行：
   ```
   cd android
   gradlew installDebug
   ```
   或直接用：
   ```
   adb install MyApp-debug.apk
   ```

方式 B：
- 把 `MyApp-debug.apk` 拷到手机，点击安装（需要允许"未知来源"）

## 常见问题

**Q1: 提示"找不到 JDK"**
A: 打开脚本开头的配置区，手动把 `JAVA_HOME` 指定成你的实际 JDK 路径，例如：
   ```
   set JAVA_HOME=C:\Program Files\Java\jdk-21
   ```

**Q2: 提示"找不到 Android SDK"**
A: 同理，在脚本里手动指定：
   ```
   set ANDROID_SDK=C:\Users\你的名字\AppData\Local\Android\Sdk
   ```

**Q3: `npm run build` 失败**
A: 这是项目代码问题，和打包脚本无关。先确保 `npm run build` 能在本机跑通并生成 `dist/index.html`。

**Q4: `npm run build` 成功，但提示"找不到 dist/index.html"**
A: 某些项目构建产物目录叫 `build` 而不是 `dist`，改脚本里的 `set WEB_DIR=build`。

**Q5: Gradle 编译报各种奇怪错误**
A: 常见两类：
   - **网络下载失败**：把 Android Studio 的 Gradle 镜像改为国内源（阿里云 / 腾讯云）。
     在 `~/.gradle/init.gradle`（Win 下 `C:\Users\你的用户名\.gradle\init.gradle`）添加镜像配置。
   - **版本不兼容**：项目里的 `android/gradle/wrapper/gradle-wrapper.properties` 指定的 gradle 版本，和你的 JDK 版本要匹配。JDK 21 一般要用 Gradle 8.x。

**Q6: 如何打包 release 版（可上架）**
A: 调试版命令是 `gradlew assembleDebug`；上架用 `gradlew assembleRelease`。release 版需要**签名**（keystore），请在 `android/app/build.gradle` 配置 `signingConfigs` 后执行。

**Q7: 换一个项目打包，会不会影响原来的项目**
A: 不会。脚本只操作当前所在目录的文件。每个项目都要放一份脚本。

**Q8: 点击单词/句子没声音**
A: 浏览器的 Web Speech API 在 Android WebView 里不可用，需要通过 Capacitor 原生 TTS 插件，在组件里优先调用 `TextToSpeech.speak()`。

## 适用的项目类型

- ✅ 纯 React + Vite 项目 + 手动加 Capacitor
- ✅ Vue + Vite 项目 + 手动加 Capacitor
- ✅ 已配置好 Capacitor 的 Web 项目（比如你当前这个英语乐园项目）
- ❌ 不适用纯原生 Android 项目（Android Studio 直接打开就好）
- ❌ 不适用 React Native / Expo 项目（它们有自己的打包方式）
- ❌ 不适用 Flutter 项目（同样有自己的打包方式）

## 脚本做了哪些事（5 步概览）

1. 检查 JDK / Android SDK / Node.js
2. 检查依赖、装 `node_modules`
3. `npm run build` 构建前端
4. 初始化 Capacitor（首次时）→ `npx cap sync android`
5. 写 `local.properties` → `gradlew assembleDebug` 编译 APK

## 提示

- 把 `build-apk.bat` 放在你常用模板的根目录，每个新项目拷一份即可。
- 不同项目的包名 (`PACKAGE_NAME`) 一定要不同，否则安装到手机会互相覆盖。
