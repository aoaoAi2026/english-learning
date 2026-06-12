# build-apk.bat 使用说明（通用版）

一个 Windows 一键打包脚本，支持把 **Vite / Webpack 等任何前端项目** 打包成 Android APK（通过 Capacitor）。

脚本所在位置：与本 README 同级目录的 `build-apk.bat`。

---

## 一、你电脑需要先装好的东西（一次性）

| 软件 | 要求版本 | 说明 |
|------|----------|------|
| **Node.js** | >= 16（推荐 20 / 24 LTS）| 安装完默认会加入 PATH，能直接运行 |
| **JDK** | 17 或 21 | Java 开发工具包，Android Gradle 构建必需 |
| **Android SDK** | 含 Platform-tools + Build-tools | 提供 aapt / dx / gradle-wrapper 依赖 |

**自动探测逻辑**（脚本已内置，不用手动配置路径）：
- JDK 探测顺序：
  1. `C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot`
  2. `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot`
  3. `C:\Program Files\Java\jdk-21`
  4. `C:\Program Files\Java\jdk-17`
  5. `E:\android-tools\jdk17`
- Android SDK 探测顺序：
  1. `C:\Android\Sdk`
  2. `C:\Users\你的用户名\AppData\Local\Android\Sdk`
  3. `E:\android-tools\android-sdk`
  4. 系统环境变量 `ANDROID_HOME` 或 `ANDROID_SDK_ROOT`

如果你的安装路径不在以上列表，或者脚本探测失败，请跳到第四节"手动配置路径"。

---

## 二、适用 / 不适用的项目类型

### ✅ 适用
- 纯前端项目（React + Vite）
- Vue + Vite 项目
- 其他打包产物为 `dist` 或 `build` 目录的前端项目
- 已经配好 Capacitor 的项目（推荐）
- **全新尚未配置 Capacitor 的项目**（脚本会自动初始化）

### ❌ 不适用
- 原生 Android 项目（请直接用 Android Studio 打开）
- React Native / Expo 项目（有自己的打包方式）
- Flutter 项目（有自己的打包方式）
- 非 Node.js 项目（.NET / Java 后端等）

---

## 三、使用步骤（3 步）

### 第 1 步：打开脚本改配置

用**记事本**或 VS Code 打开 `build-apk.bat`，修改顶部 4 行配置：

```
set APP_NAME=你的应用名           （例如：MyTodoApp）
set PACKAGE_NAME=com.你的公司.应用名  （例如：com.example.mytodo，必须唯一且全小写/数字/点）
set WEB_DIR=dist                   （Vite 默认是 dist；Vue CLI 旧项目可能是 build）
set BUILD_CMD=npm run build        （构建命令，一般不用改）
```

**`PACKAGE_NAME` 重要说明**：
- 只能包含小写字母、数字、点（`.`）
- 必须至少有一个点，如 `com.example`
- 不同项目必须不同，否则安装到手机会互相覆盖
- 不要以数字开头，不要用中文、不要用横杠 `-`

### 第 2 步：双击运行

双击 `build-apk.bat` 即可。

脚本执行过程（5 个阶段）：

```
[Step 1/5] Checking environment ...        ← 检查 JDK / SDK / Node
[Step 2/5] Checking Node.js and dependencies ...  ← 检查依赖，缺的话自动 npm install
[Step 3/5] Building web project ...        ← 执行 npm run build（前端构建）
[Step 4/5] Capacitor setup and sync ...    ← 初始化 Capacitor + 同步资源到 Android
[Step 5/5] Writing local.properties and compiling APK ...  ← Gradle 编译 APK
```

### 第 3 步：拿 APK

打包成功后，项目根目录会多出一个文件：

```
{APP_NAME}-debug.apk   （例如：EnglishLearning-debug.apk）
```

原始位置也有一份（Gradle 的默认输出目录）：
```
android\app\build\outputs\apk\debug\app-debug.apk
```

把 APK 传到手机安装即可。

---

## 四、手动配置路径（探测失败时才需要）

如果脚本启动时提示：
- `[X] JDK not found` → 你的 JDK 装到别处了
- `[X] Android SDK not found` → 你的 SDK 装到别处了

解决方式（两种都行）：

**方式 A：改脚本**（推荐，每个项目独立配置）

在脚本最上面的配置区（你刚改过的那一块）下面，直接追加一行：
```
set JAVA_HOME=D:\你的jdk路径
set ANDROID_SDK=D:\你的sdk路径
```

**方式 B：设置系统环境变量**（推荐，一次永久生效）

1. 右键"此电脑" → 属性 → 高级系统设置 → 环境变量
2. 在"系统变量"里新建：
   - 变量名：`JAVA_HOME`，变量值：`C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot`
   - 变量名：`ANDROID_SDK_ROOT`，变量值：`C:\Android\Sdk`
   - 在 `Path` 变量最后追加：`%JAVA_HOME%\bin` 和 `%ANDROID_SDK_ROOT%\platform-tools`
3. 确定后**重启命令行/PowerShell**生效

---

## 五、常见问题 FAQ

**Q1：第一次运行特别慢，卡在 Gradle 很久？**
A：正常。第一次 Gradle 会下载大量依赖包（几百 MB），后续会走本地缓存，一般 7~15 秒完成。

**Q2：脚本跑到某一步就停住了？**
A：很可能是网络问题。请检查：
- 是否能访问 npm registry（npm install 能否成功）
- 是否能访问 Gradle/Maven 仓库（Gradle 依赖下载）
- 公司内网可能需要配置代理（在项目的 `android/gradle.properties` 里配置）

**Q3：npm run build 失败？**
A：这是项目代码问题，不是脚本问题。在项目目录里单独执行 `npm run build` 确认能跑通，再用打包脚本。常见原因：代码里有语法错误、依赖缺失、TypeScript 类型检查不通过。

**Q4：构建后提示 `dist\index.html not found`？**
A：说明你的项目构建输出目录不是 `dist`。请把脚本里 `set WEB_DIR=dist` 改成实际目录，常见的是 `dist`（Vite）或 `build`（旧版 Vue CLI）。

**Q5：手机安装时提示"无法安装"？**
A：可能原因：
- 手机没有开启"允许未知来源应用"
- 之前装过同包名的签名不同的 app，请先卸载旧的
- 手机 CPU 架构不支持（现代安卓手机基本都兼容）

**Q6：想打包正式发布的 release 版？**
A：debug 版仅用于开发测试。release 版需要额外配置签名（keystore）。简单做法：
1. 在 Android Studio 里打开 `android` 目录
2. Build → Generate Signed Bundle/APK
3. 创建或选择你的签名文件

也可以直接在命令行改：把脚本最后 `gradlew.bat assembleDebug` 改成 `gradlew.bat assembleRelease`，并在 `android/app/build.gradle` 里配置 `signingConfigs`。

**Q7：APK 太大了？**
A：正常，debug 版一般 5~10 MB（包含完整调试信息 + WebView 资源）。release 版会明显变小。

**Q8：想让 APK 图标好看一点？**
A：用 Capacitor 提供的资源生成工具：
```
npm install @capacitor/assets --save-dev
npx capacitor-assets generate --android
```
你需要准备一个 1024x1024 的 PNG 图标，放在项目根目录或 `assets` 目录。

---

## 六、打包其他项目的最简流程（模板）

**场景**：你有一个新的前端项目（比如 Vue + Vite），想打包成 APK。

**步骤**：
1. 把 `build-apk.bat` 复制到新项目根目录
2. 打开脚本，改 4 行配置（APP_NAME / PACKAGE_NAME / WEB_DIR / BUILD_CMD）
3. 双击运行，等它走完
4. 拿根目录的 `* -debug.apk` 传手机

脚本会**自动帮你完成**：
- 安装 Capacitor 依赖
- 初始化 Capacitor 配置（capacitor.config.json）
- 创建 Android 原生项目目录（android/）
- 同步前端构建产物到 Android
- 编译 APK

---

## 七、脚本生成的文件/目录清单

脚本运行后会在项目里新增这些东西，**全部可以安全删除**（不影响项目源码）：

| 新增项 | 说明 | 能否删除 |
|--------|------|----------|
| `android/` | Android 原生项目（含 Gradle / 资源 / 清单）| 删了下次会重新生成，但里面可能有你自定义的签名/配置 |
| `capacitor.config.json` | Capacitor 配置（如果项目原来没有的话）| 能删 |
| `*-debug.apk` | 打包产物 | 可以删，不需要 |
| `node_modules/@capacitor/` | Capacitor 相关 npm 包| 能删（重新 npm install 会回来）|

项目源码（`src/`、`package.json`、`index.html` 等）**不会被脚本改动**。

---

## 八、故障排查

如果打包失败，请按顺序排查：

1. **确认 Node 版本**（命令行跑 `node -v`，需 >= 16）
2. **确认 JDK 版本**（`java -version`，需 17 或 21）
3. **确认 npm run build 能跑通**（单独执行，脱离脚本）
4. **确认 `dist/index.html` 或 `build/index.html` 存在**
5. 如果 Gradle 报错，先在命令行进入 `android` 目录执行 `gradlew clean`，再重试
6. 还不行：把命令行的错误日志复制到搜索引擎，通常能直接定位问题

---

## 九、手动构建命令（不用脚本时）

如果你以后想完全自己控制构建流程，可以按这 5 个命令手动执行：

```
1. npm install
2. npm run build
3. npx cap init 项目名 com.你的包名 --web-dir=dist   （如果还没初始化）
4. npx cap sync android
5. cd android && gradlew assembleDebug
```

结果和脚本完全一样。脚本只是把这 5 步自动化 + 加上环境检查和错误提示。

---

## 十、版本说明

- 脚本版本：通用版 v1.0
- 依赖：Node.js、JDK 17/21、Android SDK（Build-Tools 34+ 推荐）
- 平台：Windows 10 / 11（PowerShell 或 cmd 都可）

祝你打包愉快！

