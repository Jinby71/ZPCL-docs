# 环境配置

本页说明本地编译 ZPCL Launcher 的环境要求、构建命令与签名处理。仅需安装包时，见[下载安装](/download)。

构建需要四项条件：JDK 17 用于运行 Gradle，Android SDK 用于编译 APK，NDK 用于编译 jni 层，网络用于首次下载依赖。任一项缺失都会导致构建中断，建议按以下顺序准备。

## 版本要求

| 依赖 | 要求 |
| --- | --- |
| JDK | 17。`JAVA_HOME` 需指向 JDK 17，JDK 8 会在 Gradle 阶段直接失败 |
| Gradle | 9.5.0。由 `gradlew` 按 `gradle/wrapper/gradle-wrapper.properties` 自动下载，无需单独安装 |
| Android SDK | `compileSdk` 37（`minorApiLevel = 2`）、`minSdk 26`、`targetSdk 34` |
| NDK | 25.2.9519653。`src/main/jni` 经 `ndkBuild` 编译，缺少 NDK 时构建在 native 任务处失败 |
| 网络 | 首次构建需下载 Gradle 发行包、依赖库与 Android 构建工具 |

## 安装 JDK 17

需 JDK 17。高于或低于 17 的版本都会在 Gradle 阶段失败，仅安装最新的 JDK 并不够。

### Windows

1. 从 [Adoptium](https://adoptium.net/temurin/releases/) 下载 JDK 17 的 `.msi` 安装包，安装时勾选 **Set JAVA_HOME variable**。
2. 未勾选时，打开「系统属性 → 环境变量」，新建 `JAVA_HOME`，值指向安装目录，例如 `C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot`。
3. 重新打开终端，确认：

```powershell
$env:JAVA_HOME
java -version
```

### macOS

```bash
brew install --cask temurin@17
/usr/libexec/java_home -v 17
```

第二行输出 JDK 17 的路径。将其写入 shell 配置，使每次启动都能读到：

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### Linux

以 Debian / Ubuntu 为例：

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
```

其他发行版用各自的包管理器安装 17 版本。系统中存在多个 JDK 时，用 `update-alternatives` 或 `JAVA_HOME` 指定 17。

安装完成后，`java -version` 输出包含 `17.` 才能继续。

## 安装 Android SDK

需要三类组件：`compileSdk` 对应的 SDK Platform、Build-Tools、Platform-Tools。缺少任一项，构建都会在 SDK 检查处中断。

### 使用 Android Studio

1. 安装 [Android Studio](https://developer.android.com/studio)，首次启动按向导完成 SDK 下载。
2. 打开 **Settings → Languages & Frameworks → Android SDK**。在 **SDK Platforms** 勾选 `compileSdk` 对应的 Android 版本，在 **SDK Tools** 勾选 Build-Tools、Platform-Tools 与 NDK。
3. 记下 **Android SDK Location** 显示的路径，下一步写入配置要用。

### 使用命令行工具

不安装 Android Studio 时，下载 [commandline-tools](https://developer.android.com/studio#command-tools)，解压到 SDK 目录的 `cmdline-tools/latest` 下。目录结构必须是：

```text
Android/Sdk/cmdline-tools/latest/bin/sdkmanager
```

层级不一致时 `sdkmanager` 无法定位 SDK 根目录。随后接受许可并安装组件：

```bash
sdkmanager --licenses
sdkmanager --list | grep "platforms;android-37"
sdkmanager "platforms;android-37" "ndk;25.2.9519653"
```

Windows 下 `sdkmanager` 位于 `cmdline-tools\latest\bin`，`grep` 换成 `findstr`。包名以 `sdkmanager --list` 的实际输出为准：`compileSdk` 带次要级别，条目名可能与 `android-37` 不同。

组件装齐后，AGP 会在构建时自动补装其余缺失部分，前提是已执行 `sdkmanager --licenses` 接受许可。

### 指定 SDK 位置

Gradle 通过以下任一方式定位 SDK，取其一即可：

- 在仓库根目录创建 `local.properties`，写入 `sdk.dir=/path/to/Android/Sdk`。Windows 需转义反斜杠，写作 `sdk.dir=C\:\\Android\\Sdk`。该文件含本机路径，不应提交。
- 或设置环境变量 `ANDROID_HOME`，指向 SDK 目录。

两者都未提供时，构建报 `SDK location not found`。

## 安装 NDK

`src/main/jni` 通过 `ndkBuild` 编译，需要 NDK 25.2.9519653。版本与 `build.gradle.kts` 中的 `ndkVersion` 必须一致。

- **Android Studio**：在 **SDK Tools** 勾选 **NDK (Side by side)**，勾选右下角的 **Show Package Details**，展开后选中 25.2.9519653 安装。
- **命令行**：`sdkmanager "ndk;25.2.9519653"`。

安装后应存在 `sdk/ndk/25.2.9519653` 目录。缺失或版本不符时，构建在 native 任务处中断，报错信息通常只提到任务名，不直接指出 NDK 版本。

## 环境检查

三项都能确认后再获取源码：

```bash
java -version
echo $JAVA_HOME
ls "$ANDROID_HOME/ndk/25.2.9519653"
```

Windows PowerShell 对应命令为 `java -version`、`$env:JAVA_HOME`、`Test-Path "$env:ANDROID_HOME\ndk\25.2.9519653"`。未设置 `ANDROID_HOME` 时，改为核对 `local.properties` 中的 `sdk.dir`。

## 获取源码

```bash
git clone https://github.com/zuanxu53-hub/ZPCL-Launcher.git
cd ZPCL-Launcher
```

## 构建命令

```bash
# 调试包，仅构建 arm64
export JAVA_HOME=/path/to/jdk17
./gradlew :ZalithLauncher:assembleDebug -Darch=arm64
```

Windows 下的 `JAVA_HOME` 设置方式不同：PowerShell 用 `$env:JAVA_HOME = "C:\path\to\jdk17"`，cmd 用 `set JAVA_HOME=C:\path\to\jdk17`，构建命令为 `.\gradlew.bat`。首次执行时 Gradle 9.5.0 发行包与依赖需联网下载，耗时取决于网络。

`-Darch` 可传入 `arm`、`arm64`、`x86`、`x86_64`。传入 `all` 或不传该参数时，构建全 ABI 的包，耗时与体积均会增加。

| 传入值 | 产物 |
| --- | --- |
| `arm64` | `arm64-v8a` |
| `arm` | `armeabi-v7a` |
| `x86` / `x86_64` | 对应架构 |
| 不传 | 全 ABI（文件名不带架构后缀） |

产物位于 `ZalithLauncher/build/outputs/apk/{debug,release}/`，文件名以 `ZPCL-Launcher-` 开头，Debug 包额外带有 `Debug-`。

单架构 Debug 包约 210 MB，主要来自 Java 运行环境资源。全 ABI 包包含多套 jniLibs，体积更大，构建耗时相应增加。

::: warning assembleRelease 不是正式发行包
该命令构建的是当前工程的 Gradle Release 变体，不会将开发线转换为正式线，也不会补齐正式线独有的功能，例如内置主题与正版登录接线。正式包需使用正式线的独立工程构建。
:::

## 应用签名

Debug 与 Release 变体均读取 `ZalithLauncher/build.gradle.kts` 中的本地签名配置。公开源码不包含项目签名私钥。

从全新克隆构建时有两种方式：使用自己的 keystore、别名与密码，或让 Debug 构建使用 Android 默认调试签名。1.5.5 起，未找到项目签名文件时，Debug 构建退回 Android 默认调试签名，Release 输出未签名包。

配置位置为 `ZalithLauncher/zpcl_release.jks`，别名固定为 `zpcl`。密码取自环境变量 `STORE_PASSWORD` / `KEY_PASSWORD`；未设置时，读取仓库根目录下的 `.store_password.txt` / `.key_password.txt`，两者均已被 `.gitignore` 排除。

::: danger 不要提交签名材料
keystore、密码与凭据均不应提交至仓库。

签名不同的 APK 无法覆盖安装。用户升级时会遇到「应用未安装」，只能卸载重装，数据将一并丢失。
:::

## 登录与密钥配置

源码未内置微软 OAuth Client ID，也未内置 CurseForge API Key。

构建脚本可从环境变量 `OAUTH_CLIENT_ID` / `CURSEFORGE_API_KEY` 读取，也可从仓库根目录下被 Git 忽略的 `.oauth_client_id.txt` / `.curseforge_api.txt` 读取。目前这两个输入不按 Debug / Release 变体隔离，配置后两个变体均可使用。

未配置 Client ID 时，离线登录与第三方认证不受影响；微软正版登录无法完成。

## 版本与发布

1. 修改 `ZalithLauncher/gradle.properties` 中的显示版本与 `versionCode`。需支持覆盖升级时必须递增，开发线与正式线需一并修改。
2. 同步 `latest_version_md.json` 中的版本、`code`、官网地址与更新说明。客户端的「检查更新」读取该文件。
3. 在 APK 下载处标明该包对应的源码提交、标签或归档。仅链接仓库首页不构成已提供对应源码，GPLv3 对此有要求。

`launcher_name` 与 `CLIENT_TOKEN_SEED` 是登录与数据目录的标识，不应修改。修改后既有用户的数据目录将不匹配。

## 持续集成

推送触发的 [push_ci.yml](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/.github/workflows/push_ci.yml) 仅执行 Debug 编译校验。该流程不注入正版登录与 CurseForge 配置，也不上传 APK，CI 通过不代表可以直接发布。
