# 修改声明与许可

本页摘录自官方仓库的 [NOTICE.md](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/NOTICE.md) 与 README。法律意义上的完整声明以官方原文为准。

## 修改版说明

ZPCL Launcher 是 Zalith Launcher 2 的修改版，按 GNU GPLv3 分发。本版本不是上游的官方版本，与上游作者无隶属关系，也未获其背书。

| 项目 | 内容 |
| --- | --- |
| 本版本名称 | ZPCL Launcher（短名 ZPCL） |
| 本版本版本号 | 1.5.5（versionCode 200088） |
| 上游源码基线 | Zalith Launcher 2 2.8.1（2026-11 合并，此前是 2.6.1） |
| 上游版权 | Copyright (C) 2025–2026 MovTery and contributors |

主要改动包括：PCL2 版式的界面、多线程下载与镜像换源、整合包导入导出、渲染器兼容、第三方认证修复、皮肤与界面插件机制，以及保留上游 2.8 已经移除的 Cleanroom 模组加载器支持。

## 名称与标识

上游 README 列出了 GPLv3 §7 的附加条款，修改版需遵守以下三条：

1. 分发名称不得使用 `ZalithLauncher`、缩写 `ZL`，也不得使用易与官方混淆的近似名称。本修改版对外名称为 ZPCL Launcher。
2. 启动页或主界面应明显标注「非官方修改版」。该标注位于 PCL 首次解压页与「PCL 界面 → 更多 → 关于与鸣谢」。
3. 不得移除程序内显示的版权声明。

`Zalith Launcher`、`Zalith Launcher 2`、`Plain Craft Launcher`、`PCL2` 的名称和标识归各自权利人所有。此处仅在说明来源时提及上述名称。

## 源码与安装包

本仓库公开的是开发线源码，不含正式线独有的内置主题与正版登录接线。两条线并非同一份源树，即使版本号相同，也不能据此认定安装包与源码相互对应。

GPLv3 对网络分发有要求：提供 APK 下载时，应在下载处标明该包对应的源码位置，可以是提交、标签或归档，并按 §6 提供等效且免费的获取方式。仅链接仓库首页或上游项目，不构成已提供对应源码。

1.5.5 起，安装包作为 GitHub Release 附件分发，发布正文标注对应的源码标签（1.5.5 为提交 `a1ebebf`）。需要说明的是，正式线源码尚未公开；在正式线对应源码公开或以其他方式提供之前，不能将这些 APK 视为已具备完整的对应源码。

## 第三方组件

各组件的权利人、许可类型与上游入口见[第三方组件](/third-party)，该页整理自官方 [docs/THIRD_PARTY.md](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/docs/THIRD_PARTY.md)。各组件的权利义务按实际纳入版本的许可确定，声明本身不替代许可证正文。

PCL2 相关图标这类素材，版本、来源与再分发授权仍需逐项核实。不能因本项目整体按 GPLv3 发布，即认定这些素材亦受同一许可覆盖。

## 问题反馈

本修改版的问题请提交至 [ZPCL Launcher Issues](https://github.com/zuanxu53-hub/ZPCL-Launcher/issues)，不要提交至上游仓库。

提交时请附版本号、设备型号、Android 版本、复现步骤，以及去除敏感信息后的日志。

## 本站文档

本站文档与 ZPCL Launcher 程序分属不同许可，应分别看待。

| 对象 | 许可 | 说明 |
| --- | --- | --- |
| 本站文档文字与站点代码 | MIT | 由文档仓库维护，许可全文见 [LICENSE](https://github.com/Jinby71/ZPCL-docs/blob/master/LICENSE) |
| ZPCL Launcher 程序 | GNU GPLv3 | 在适用法律允许的范围内按现状提供，不附带担保 |

上表仅涉及本站与程序本身。ZPCL Launcher 使用的第三方组件与素材不属于本站许可范围，其权利人与许可条款见[第三方组件](/third-party)。

站点图标取自官方安装包，权利归原权利人，不在上表的 MIT 许可范围内。本站内容整理自官方 README、NOTICE、插件指南、Release 说明和[官网](https://zpcl.fun)，可能滞后于最新版本，具体事实以官方仓库为准。

## 致谢

感谢 [Zalith Launcher 2](https://github.com/ZalithLauncher/ZalithLauncher2)、[PojavLauncher](https://github.com/PojavLauncherTeam/PojavLauncher)、[PCL2](https://github.com/Meloong-Git/PCL) 以及所有上游依赖的作者。

Minecraft 是 Mojang Studios 的注册商标，本项目与其无关联。
