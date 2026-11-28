# 项目简介

ZPCL Launcher 是 Android 平台上的 Minecraft Java 版启动器。启动核心来自 [Zalith Launcher 2](https://github.com/ZalithLauncher/ZalithLauncher2) 与 [PojavLauncher](https://github.com/PojavLauncherTeam/PojavLauncher)，界面按 [PCL2](https://github.com/Meloong-Git/PCL) 的分栏结构实现，使用 Jetpack Compose 编写。

当前版本为 1.5.6（versionCode `200105`），上游基线是 Zalith Launcher 2 2.8.1。本版本属非官方修改版，与上游官方无隶属关系。

本页内容整理自官方仓库的 README、NOTICE、插件指南与[官网](https://zpcl.fun)。安装包、源码与问题反馈均以官方仓库为准。

## 界面结构

主界面分为首页、下载、版本设置、联机、设置五个版块，左侧为列表，右侧为内容区。

二级页按页面栈处理。例如从资源详情进入前置资源后，返回时逐层退回，不会直接跳回首页。

列表、按钮与下拉菜单均支持鼠标指向高亮。窗口高度较小或缩放比例较低时，弹窗正文可单独滚动，操作按钮固定在底部。

## 下载与安装

选定 Minecraft 版本后可安装游戏本体。如需加载器，Forge、Fabric、NeoForge、Quilt、OptiFine 可在同一流程中勾选，无需分多次安装。各类加载器的适用范围见[模组加载器](/loaders)。

Mod、整合包、资源包、光影包与存档默认从 Modrinth 获取。CurseForge 官方接口需要 `x-api-key`，未配置 Key 时使用镜像。

下载默认并发 32 条连接，可在「设置 → 下载 → 最大线程数」调整，修改后于下一次下载生效。下载源可设为自动、官方或镜像，失败时自动切换并重试。

## 实例管理

实例支持新建、复制、删除与重置。每个实例有独立的渲染器、内存与 Java 参数，修改其中一项不影响其他实例。

整合包支持本地导入，也可通过系统分享接入。安装前可修改版本名；安装失败时，不完整的版本会被清除，不会保留在列表中。

导出按 PCL 的匹配规则打包。规则中包含 `[宝]` 等特殊字符时，早期版本会崩溃，该问题现已修复。

## 运行与联机

渲染器可选。Sodium、Iris 等要求桌面 OpenGL 3.3+ 的模组，启动器会进行兼容处理，实际表现取决于设备 GPU 与所选渲染器。

联机功能使用陶瓦（Terracotta），模块内置于启动器。未启用时，联机页会显示引导。

更新检查读取 `latest_version_md.json`。更新弹窗中常驻「从官网下载（若下载缓慢）」入口，可在下载缓慢时改用。

## 插件系统

插件是单独安装的 APK，不属于启动器本体。启动器不加载其 dex，也不共享进程，仅读取 `assets/zplugin/` 下的配置，再用原生控件渲染内容。

插件的能力取决于其自身应用。启动器只负责发现、拉起与渲染，并开放少量系统动作。协议见[插件 API](/dev/plugin_api)。

## 技术栈

| 部分 | 实现 |
| --- | --- |
| 界面 | Jetpack Compose，PCL2 风格分栏布局 |
| 启动核心 | Zalith Launcher 2 + PojavLauncher |
| 资源来源 | Modrinth（默认）、CurseForge（镜像，需 API Key） |
| 平台 | Android，`minSdk 26`、`targetSdk 34` |
| 许可 | GNU GPLv3 |

## 开发线与正式线

仓库维护的是开发线，正式发行使用独立工程。两条线的代码与发布制品需分别核对，混淆两者会得出错误结论。

| | 开发线 | 正式线 |
| --- | --- | --- |
| 应用包名 | `com.zpcl.launcher.debug` | `com.zpcl.launcher` |
| 常用构建类型 | Debug | Release |
| 微软正版登录 | 保留登录代码，默认不配置 Client ID | 按需配置 Client ID |
| 内置主题切换及解锁 | 不包含 | 正式线独有 |

`assembleRelease` 仅构建当前工程的 Gradle Release 变体，不会将开发线转换为正式线，也不会补齐正式线独有的功能。

## 功能边界

- 仅支持 Android，最低版本 8.0。无 iOS 版，也无桌面版。
- 开发线不包含正式线的内置主题，也未配置微软登录的 Client ID。未配置 Client ID 时无法完成微软登录，离线账号与第三方认证不受影响。
- CurseForge 官方接口需要 API Key。未配置时只能使用 Modrinth 或镜像。
- 渲染器兼容不等于所有模组均可运行。要求较高 OpenGL 版本的模组仍受设备限制。

## 进一步阅读

操作步骤见[下载安装](/download)与[快速开始](/getting-started)，设备与登录方面的疑问见[常见问题](/faq)。按截图逐步操作的教程见[帮助文档](/help/)。
