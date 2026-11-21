# 第三方组件

本页整理自官方仓库的 [docs/THIRD_PARTY.md](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/docs/THIRD_PARTY.md)，记录继承自上游或在本项目中使用的第三方组件、署名与许可入口。本页不是某个 APK 的完整物料清单，实际纳入范围与条款以该构建所用的版本、随附声明及许可证正文为准。

## 预编译依赖

以下文件随仓库跟踪，不是启动器安装包，也不是源码。

| 仓库文件 | 权利人及许可 | 上游 |
| --- | --- | --- |
| `ZalithLauncher/libs/MobileGlues-release.aar` | Copyright © 2025–2026 MobileGL-Dev；GNU LGPL 2.1 | [源码](https://github.com/MobileGL-Dev/MobileGlues) · [许可证正文](https://github.com/MobileGL-Dev/MobileGlues/blob/main/LICENSE) · [上游列出的第三方组件](https://github.com/MobileGL-Dev/MobileGlues#third-party-components) |
| `ZalithLauncher/libs/SimpleFPEWrapper-release.aar` | Copyright © 2026 MobileGL-Dev；GNU LGPL 3.0 | [源码](https://github.com/MobileGL-Dev/SimpleFPEWrapper) · [许可证声明](https://github.com/MobileGL-Dev/SimpleFPEWrapper/blob/main/LICENSE) · [COPYING](https://github.com/MobileGL-Dev/SimpleFPEWrapper/blob/main/COPYING) · [COPYING.LESSER](https://github.com/MobileGL-Dev/SimpleFPEWrapper/blob/main/COPYING.LESSER) |

上述文件与 Zalith Launcher 2.8.1 源码包中的同名文件逐字节一致，SHA-256 前 16 位分别为 MobileGlues `6ca24a8afd5312b4`、SimpleFPEWrapper `2b6e7d24e91786ae`。即直接沿用上游随源码提供的二进制，本项目未自行编译。上游未写明它们编译自组件仓库的哪个标签或提交，确切源码版本仍属未知。

::: warning 分发前需补齐的内容
分发这些预编译件或包含它们的 APK 前，应向上游或组件仓库确认对应版本并记录，同时保留版权与许可文本，提供所需的对应源码及适用的替换或重新链接说明。

仓库中的其他预编译依赖，例如 JNA 原生库与运行时归档，同样按实际分发内容核对。
:::

## 其他组件

| 组件 | 版权 | 许可 | 上游 |
| --- | --- | --- | --- |
| androidx-appcompat | Copyright © The Android Open Source Project | Apache 2.0 | [链接](https://developer.android.com/jetpack/androidx/releases/appcompat) |
| androidx-constraintlayout-compose | Copyright © The Android Open Source Project | Apache 2.0 | [链接](https://developer.android.com/develop/ui/compose/layouts/constraintlayout) |
| androidx-webkit | Copyright © The Android Open Source Project | Apache 2.0 | [链接](https://developer.android.com/jetpack/androidx/releases/webkit) |
| ANGLE | Copyright 2018 The ANGLE Project Authors | BSD 3-Clause | [链接](http://angleproject.org/) |
| Apache Commons Codec | 未标注 | Apache 2.0 | [链接](https://commons.apache.org/proper/commons-codec) |
| Apache Commons Compress | 未标注 | Apache 2.0 | [链接](https://commons.apache.org/proper/commons-compress) |
| Apache Commons IO | 未标注 | Apache 2.0 | [链接](https://commons.apache.org/proper/commons-io) |
| ByteHook | Copyright © 2020-2024 ByteDance, Inc. | MIT | [链接](https://github.com/bytedance/bhook) |
| BuildKeys | Copyright © 2026 MovTery | Apache 2.0 | [链接](https://github.com/MovTery/BuildKeys) |
| Coil Compose | Copyright © 2025 Coil Contributors | Apache 2.0 | [链接](https://github.com/coil-kt/coil) |
| Coil Gifs | Copyright © 2025 Coil Contributors | Apache 2.0 | [链接](https://github.com/coil-kt/coil) |
| Coil SVG | Copyright © 2025 Coil Contributors | Apache 2.0 | [链接](https://github.com/coil-kt/coil) |
| Fishnet | Copyright © 2025 Kyant | Apache 2.0 | [链接](https://github.com/Kyant0/Fishnet) |
| gl4es_extra_extra | Copyright © 2016-2018 Sebastien Chevalier；Copyright (c) 2013-2016 Ryan Hileman | MIT | [链接](https://github.com/PojavLauncherTeam/gl4es_extra_extra) |
| Gson | Copyright © 2008 Google Inc. | Apache 2.0 | [链接](https://github.com/google/gson) |
| kotlinx.coroutines | Copyright © 2000-2020 JetBrains s.r.o. | Apache 2.0 | [链接](https://github.com/Kotlin/kotlinx.coroutines) |
| ktor-client-content-negotiation | Copyright © 2000-2023 JetBrains s.r.o. | Apache 2.0 | [链接](https://ktor.io) |
| ktor-client-core | Copyright © 2000-2023 JetBrains s.r.o. | Apache 2.0 | [链接](https://ktor.io) |
| ktor-client-okhttp | Copyright © 2000-2023 JetBrains s.r.o. | Apache 2.0 | [链接](https://ktor.io) |
| ktor-http | Copyright © 2000-2023 JetBrains s.r.o. | Apache 2.0 | [链接](https://ktor.io) |
| ktor-serialization-kotlinx-json | Copyright © 2000-2023 JetBrains s.r.o. | Apache 2.0 | [链接](https://ktor.io) |
| LWJGL | Copyright © 2012-present Lightweight Java Game Library, All rights reserved. | BSD 3-Clause | [链接](https://github.com/LWJGL/lwjgl3) |
| material-color-utilities | Copyright 2021 Google LLC | Apache 2.0 | [链接](https://github.com/material-foundation/material-color-utilities) |
| Maven Artifact | Copyright © The Apache Software Foundation | Apache 2.0 | [链接](https://github.com/apache/maven/tree/maven-3.9.9/maven-artifact) |
| Media3 | Copyright © The Android Open Source Project | Apache 2.0 | [链接](https://developer.android.com/jetpack/androidx/releases/media3) |
| Mesa | Copyright © The Mesa Authors | MIT | [链接](https://mesa3d.org/) |
| MMKV | Copyright © 2018 THL A29 Limited, a Tencent company. | BSD 3-Clause | [链接](https://github.com/Tencent/MMKV) |
| Navigation 3 | Copyright © The Android Open Source Project | Apache 2.0 | [链接](https://developer.android.com/jetpack/androidx/releases/navigation3) |
| NG-GL4ES | Copyright © 2016-2018 Sebastien Chevalier；Copyright © 2013-2016 Ryan Hileman；Copyright (c) 2025-2026 BZLZHH | MIT | [链接](https://github.com/BZLZHH/NG-GL4ES) |
| OkHttp | Copyright © 2019 Square, Inc. | Apache 2.0 | [链接](https://github.com/square/okhttp) |
| Okio | Copyright © 2013 Square, Inc. | Apache 2.0 | [链接](https://square.github.io/okio/) |
| OpenNBT | Copyright © 2013-2021 Steveice10. | MIT | [链接](https://github.com/GeyserMC/OpenNBT) |
| Process Phoenix | Copyright © 2015 Jake Wharton | Apache 2.0 | [链接](https://github.com/JakeWharton/ProcessPhoenix) |
| proxy-client-android | 未标注 | LGPL-3.0 | [链接](https://github.com/TouchController/TouchController) |
| Reorderable | Copyright © 2023 Calvin Liang | Apache 2.0 | [链接](https://github.com/Calvin-LL/Reorderable) |
| sdl2-compat | Copyright (C) 2026 Sam Lantinga | Zlib | [链接](https://github.com/libsdl-org/sdl2-compat) |
| SDL3 | Copyright (C) 1997-2026 Sam Lantinga | Zlib | [链接](https://github.com/libsdl-org/SDL) |
| skinview3d | Copyright © 2014-2018 Kent Rasmussen；Copyright © 2017-2022 Haowei Wen, Sean Boult and contributors | MIT | [链接](https://github.com/bs-community/skinview3d) |
| sora-editor | Copyright (C) 2020-2026 Rosemoe | LGPL-2.1 | [链接](https://github.com/Rosemoe/sora-editor) |
| StringFog | Copyright © 2016-2023, Megatron King | Apache 2.0 | [链接](https://github.com/MegatronKing/StringFog) |
| tm4e（TextMate for Eclipse） | Copyright © Eclipse Foundation | EPL-2.0 | [链接](https://github.com/eclipse-tm4e/tm4e) |
| XZ for Java | Copyright © The XZ for Java authors and contributors | 0BSD | [链接](https://tukaani.org/xz/java.html) |

## 素材与名称

PCL2 相关图标等素材的版本、来源与再分发授权仍需逐项核实。本项目整体按 GPLv3 发布，不因此认定这些素材同样受该许可覆盖。

`Zalith Launcher`、`Zalith Launcher 2`、`Plain Craft Launcher`、`PCL2` 的名称与标识归各自权利人所有。本项目参考 PCL2 的界面版式，不代表与相关项目存在隶属关系，也未获其背书。

## 许可文本

各组件的完整许可文本以对应上游仓库及发行包内随附声明为准。本页仅列出权利人、许可类型与上游入口，不替代许可证正文。

启动器本体的许可与源码提供方式见[修改声明与许可](/license)。
