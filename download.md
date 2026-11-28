# 下载安装

安装包发布在 [GitHub Releases](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases) 的附件中。[官网](https://zpcl.fun/#download)另设其它下载方式，在 GitHub 访问缓慢时使用；两处文件相同，请勿从来源不明的地址下载 APK。

按截图逐步操作的教程见[帮助文档](/help/)。

## 最新版本

| 项目 | 值 |
| --- | --- |
| 版本 | 1.5.6 |
| versionCode | `200105` |
| 上游基线 | Zalith Launcher 2 2.8.1 |
| 最低系统 | Android 8.0（`minSdk 26`） |
| 正式线包名 | `com.zpcl.launcher` |
| 许可 | GNU GPLv3 |

## 本版改动

以下整理自 1.5.6 发布说明，完整说明见 [Release 页](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/tag/v1.5.6)。

- 下载引擎：单文件分段并行，最多 32 段；多源实测选源，慢于最快源 60% 的来源被淘汰；断点续传按绝对偏移接续；1 MB 以内的文件直接写入内存。修复整合包下载速度恒显示 0 B/s。
- 存档：存档管理每条存档左侧新增「备份」按钮，导出 zip 到自选目录，同名备份不覆盖。
- 整合包：下载完成后自动安装；原版 Json 缺失时自动补下；下载失败给出超时、断网或校验失败的具体原因。
- 协议：首次启动需阅读并同意[使用条款](/terms)与[隐私政策](/privacy)。

## 安装包与架构

近年发布的手机与平板多为 arm64，选择 `arm64-v8a` 即可。如不确定设备架构，请选择 `all`，该包包含全部架构，体积最大。

| 附件 | 适用设备 | 体积 |
| --- | --- | --- |
| [arm64-v8a](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/download/v1.5.6/z-pcl-1.5.6-release-arm64.apk) | 绝大多数 Android 手机 / 平板 | 约 179 MB |
| [armeabi-v7a](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/download/v1.5.6/z-pcl-1.5.6-release-armv7.apk) | 32 位 ARM 设备 | 约 166 MB |
| [x86](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/download/v1.5.6/z-pcl-1.5.6-release-x86.apk) | 32 位 x86 模拟器 | 约 155 MB |
| [x86_64](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/download/v1.5.6/z-pcl-1.5.6-release-x86_64.apk) | 64 位 x86 模拟器 | 约 179 MB |
| [all](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/download/v1.5.6/z-pcl-1.5.6-release-all.apk) | 架构不确定时使用 | 约 344 MB |

下载后可核对 SHA-256，校验值见 [v1.5.6 Release 页](https://github.com/zuanxu53-hub/ZPCL-Launcher/releases/tag/v1.5.6)。

上表直链指向 GitHub Releases。若该域名访问缓慢，可使用[官网](https://zpcl.fun/#download)的其它下载方式，文件与此处一致；架构选择可参照上表。

## 安装步骤

### 首次安装

1. 下载对应架构的 APK。系统会提示允许安装未知来源应用，允许后继续安装。
2. 首次启动进入 PCL 解压页，按提示完成初始化。
3. 进入「下载」版块选定游戏版本。如需模组，可在同一步勾选加载器，适用范围见[模组加载器](/loaders)。

### 覆盖升级

签名一致的新版本可直接覆盖安装。1.5.6 与 1.5.5 的包名、签名一致，属覆盖安装，设置与实例保留。

1.5.4 起正式线包名变更为 `com.zpcl.launcher`。从 1.5.3 或更早版本升级时，新旧版本为两个独立应用，旧数据不会自动迁移。升级前请先导出或备份整合包与实例。

::: warning 签名不同时无法覆盖安装
自行从源码构建的 APK 使用你自己的 keystore，与发行包签名不一致，覆盖安装会被系统拒绝，并提示「应用未安装」。

此情况需先卸载旧版。卸载会清除应用数据，操作前请备份实例、存档与账号信息。
:::

## 问题反馈

启动器相关问题请提交至 [ZPCL Launcher Issues](https://github.com/zuanxu53-hub/ZPCL-Launcher/issues)，不要提交至上游仓库。反馈时请附以下信息：

- 版本号，位于「PCL 界面 → 更多 → 关于与鸣谢」
- 设备型号与 Android 版本
- 复现步骤
- 去除账号信息后的日志

文档站与启动器各自的反馈渠道见[关于与联系](/about)，文档 QQ 讨论群的信息亦在该页。

本站文档如有错误或过时内容，可使用页面底部的「在 GitHub 上编辑此页」修改，无需另行提交 Issue。

