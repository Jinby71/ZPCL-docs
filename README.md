<div align="center">

<img src="public/logo.png" alt="ZPCL Launcher" width="120" height="120">

# ZPCL Launcher 文档

ZPCL Launcher 的中文文档站，基于 [VitePress](https://vitepress.dev) 构建，由 Cloudflare Pages 连接本仓库部署

![CI](https://github.com/Jinby71/ZPCL-docs/actions/workflows/ci.yml/badge.svg?branch=master)

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

</div>

## 说明

本站为 ZPCL Launcher 的中文文档站，不是该项目的官方发布渠道。安装包、源码与问题反馈见[官方仓库](https://github.com/zuanxu53-hub/ZPCL-Launcher)与[官网](https://zpcl.fun)。

文档内容整理自官方 README、NOTICE、插件指南与 Release 说明，可能滞后于最新版本。程序按 GPLv3 分发，本站文档与站点代码按 MIT 分发，两者的许可范围不同。

## 页面清单

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 首页 | `index.md` | 入口按钮与功能摘要 |
| 项目简介 | `intro.md` | 项目定位、界面结构、技术栈、开发线与正式线 |
| 下载安装 | `download.md` | 版本信息、五种架构的安装包、安装与覆盖升级 |
| 快速开始 | `getting-started.md` | 系统要求、登录、创建实例、启动游戏 |
| 模组加载器 | `loaders.md` | 各加载器的适用范围、配套组件、常见兼容问题与查询来源 |
| 功能总览 | `features.md` | 界面、资源下载、实例、运行、插件与功能边界 |
| 常见问题 | `faq.md` | 设备、登录、启动、下载、插件的问题与处理 |
| 帮助文档 | `help/index.md` | 栏目定位与七个专题的索引表 |
| 编写指南 | `help/writing.md` | 收录范围、素材准备、截图规范、页面结构、提交流程 |
| 环境配置 | `dev/environment.md` | JDK、Android SDK、NDK 的安装与构建、签名、发布流程 |
| 项目结构 | `dev/structure.md` | 顶层目录、界面层与业务层、不可修改的标识 |
| 插件 API | `dev/plugin_api.md` | 开放接口、清单与页面、积木与动作、数据通道 |
| 贡献指南 | `CONTRIBUTING.md` | 环境准备、写作规范、提交与 PR 流程 |
| 贡献者名单 | `contributor.md` | 代码与文档贡献者头像（运行时取自 GitHub 接口）、参与方式 |
| 隐私政策 | `privacy.md` | 本地存储、联网传输、权限、日志、保存与删除 |
| 使用条款 | `terms.md` | 协议范围、账户、第三方内容、联机、责任限制 |
| 修改声明与许可 | `license.md` | GPLv3 修改声明、源码对应、本站 MIT 许可 |
| 第三方组件 | `third-party.md` | 预编译依赖、组件清单、素材与名称、许可文本 |
| 关于与联系 | `about.md` | 维护者、仓库、反馈渠道与文档 QQ 讨论群 |

## 目录结构

```text
ZPCL-docs/
├── .github/
│   ├── ISSUE_TEMPLATE/              # Issue 表单
│   ├── workflows/
│   │   └── ci.yml                   # PR 构建校验，死链或编译错误时失败
│   ├── dependabot.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── .vitepress/
│   ├── config.mts                   # 导航、侧栏、搜索、页脚
│   ├── theme/
│   │   ├── index.ts                 # 继承默认主题，注册贡献者组件
│   │   ├── components/
│   │   │   └── Contributors.vue     # 贡献者头像，运行时请求 GitHub 接口
│   │   └── style.css                # 导航栏图标尺寸、贡献者头像样式
│   ├── cache/                       # 构建缓存（已忽略）
│   └── dist/                        # 构建产物（已忽略）
├── public/
│   ├── logo.png                     # 应用图标，用于导航栏与 README
│   ├── favicon.ico                  # 标签页图标，16 / 32 / 48 三个尺寸
│   ├── favicon.png                  # 标签页图标，192 像素
│   ├── favicon-96.png               # 标签页图标，96 像素
│   └── apple-touch-icon.png         # 主屏幕图标，180 像素
├── help/
│   ├── index.md                     # 帮助文档栏目首页
│   └── writing.md                   # 编写指南
├── dev/
│   ├── environment.md               # 环境配置
│   ├── structure.md                 # 项目结构
│   └── plugin_api.md                # 插件 API
├── _ref/                            # 参照仓库克隆，不参与构建与提交
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE                          # 本站文档与站点代码的 MIT 许可证
├── README.md
├── SECURITY.md
├── about.md
├── contributor.md
├── download.md
├── faq.md
├── features.md
├── getting-started.md
├── index.md
├── intro.md
├── license.md
├── loaders.md
├── privacy.md
├── terms.md
├── third-party.md
├── package.json
└── package-lock.json
```

Markdown 页面位于仓库根目录，构建产物输出到 `.vitepress/dist`。`README.md` 等仓库文件由 `srcExclude` 排除，不渲染为站点页面；`_ref/` 同样排除，且不进入版本库。

## 本地运行

需要 Node.js 22 LTS（或 20.19 及以上）与 npm。

```bash
git clone https://github.com/Jinby71/ZPCL-docs.git
cd ZPCL-docs
npm ci
npm run docs:dev
```

开发服务器默认监听 `http://localhost:5173`。

| 命令 | 作用 |
| --- | --- |
| `npm ci` | 按 `package-lock.json` 安装依赖 |
| `npm run docs:dev` | 启动本地开发服务器，修改即时生效 |
| `npm run docs:build` | 构建到 `.vitepress/dist`，同时检查站内死链 |
| `npm run docs:preview` | 预览构建产物，需先执行构建 |

## 修改文档

1. 编辑根目录的 `.md` 文件。写作要求见 [CONTRIBUTING.md](CONTRIBUTING.md) 的「写作规范」。
2. 新增页面时，在 `.vitepress/config.mts` 的 `nav` 或 `sidebar` 中登记链接。
3. 版本号、功能名称与命令等事实信息，先与[官方仓库](https://github.com/zuanxu53-hub/ZPCL-Launcher)核对。
4. 执行 `npm run docs:build`，确认死链检查通过。
5. 提交改动，流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。文字与条目变动记入 [CHANGELOG.md](CHANGELOG.md)。

## 部署

站点由 Cloudflare Pages 连接本仓库构建。推送 `master` 后自动部署，Pull Request 生成预览地址。

| 配置项 | 值 |
| --- | --- |
| 构建命令 | `npm run docs:build` |
| 输出目录 | `.vitepress/dist` |
| Node.js 版本 | 22，通过环境变量 `NODE_VERSION` 指定 |

站点部署在根路径，`config.mts` 不设 `base`，站内链接与静态资源按 `/` 解析。改用子路径部署时，在构建命令后追加 `--base /<路径>/`。

Pull Request 另由 `.github/workflows/ci.yml` 执行构建校验，用于拦截死链与编译错误，不产出部署。

## 参与贡献

文档纠错、教程撰写与专题认领的渠道见 [about.md](about.md)。提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)；安全问题的报告方式见 [SECURITY.md](SECURITY.md)。

## 许可证

- ZPCL Launcher 程序按 [GNU GPLv3](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/LICENSE) 分发，是 Zalith Launcher 2 的非官方修改版。修改声明见官方 [NOTICE.md](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/NOTICE.md)。
- 本站文档文字与站点代码采用 [MIT License](LICENSE)。图标取自官方安装包。
- 第三方组件与素材的权利人、许可与上游入口见 [third-party.md](third-party.md)。
