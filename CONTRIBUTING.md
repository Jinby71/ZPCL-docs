# 贡献指南

感谢参与本站文档维护。以下为贡献流程，首次参与可按步骤操作。

本站内容整理自 ZPCL Launcher 官方仓库。版本号、功能、命令等事实信息，请以官方 [README / NOTICE / Releases](https://github.com/zuanxu53-hub/ZPCL-Launcher) 为准。

## 版本要求

| 工具 | 建议版本 |
| --- | --- |
| Node.js | 22 LTS，最低 20.19.0 |
| npm | 随 Node.js 安装，用于按 `package-lock.json` 安装依赖 |
| Git | 最新稳定版 |

本站使用 npm 管理依赖，不使用 pnpm 或 yarn，以免重新生成锁文件。CI 与 Cloudflare Pages 部署均使用 Node.js 22。

## 安装 Node.js

从 [Node.js 官网](https://nodejs.org/) 下载 22 LTS 的安装包，按默认选项安装。安装后确认版本：

```bash
node -v
npm -v
```

`node -v` 输出 `v22.` 或更高版本即可继续。低于 20.19.0 时，VitePress 2 无法启动。

需要在多个 Node.js 版本之间切换时，可改用 fnm 或 nvm 管理。仅在单一版本下维护本站时，官方安装包已足够。

## 安装 Git

从 [Git 官网](https://git-scm.com/) 下载对应平台的安装包。Windows 安装时，行尾转换保持默认选项即可，仓库的 `.gitattributes` 已将文本文件统一为 LF，不依赖本地设置。

安装后确认版本：

```bash
git --version
```

## 环境检查

三项命令均能输出版本号后，再进入开发流程：

```bash
node -v
npm -v
git --version
```

## 开发流程

1. 拥有本仓库写权限时可直接克隆；无写权限时，先在 GitHub 上 Fork，再克隆自己的副本：

   ```bash
   git clone https://github.com/Jinby71/ZPCL-docs.git
   cd ZPCL-docs
   ```

2. 安装依赖并启动预览：

   ```bash
   npm ci
   npm run docs:dev
   ```

3. 打开 `http://localhost:5173`。修改 Markdown 后页面自动刷新，按 `Ctrl + C` 停止服务。

## 修改范围

- 使用文档位于仓库根目录，开发者文档位于 `dev/`，均为 `.md` 文件，使用 Markdown / VitePress 语法
- 新增页面需在 `.vitepress/config.mts` 的 `nav` 或 `sidebar` 中登记链接，否则导航中不会出现该页面
- 页面之间的链接使用站点绝对路径，如 `[项目结构](/dev/structure)`，不要写 `dev/structure.md`
- 图片等静态资源放在 `public/`。当前为 `logo.png`，从官方安装包中提取
- `README.md`、`CHANGELOG.md`、`SECURITY.md` 已通过 `srcExclude` 排除，不会生成站点页面。文档页中不应链接这些文件，否则构建会报 dead link。`CONTRIBUTING.md` 本身就是站点页面，路径为 `/CONTRIBUTING`
- 不要提交 `node_modules/`、`.vitepress/dist/`、`.vitepress/cache/`，这些已在 `.gitignore` 中排除

本站文档与站点代码按 [MIT License](https://github.com/Jinby71/ZPCL-docs/blob/main/LICENSE) 发布。提交至本仓库的内容，视为同意以该许可发布。文档中转引的第三方文字、图片与代码示例仍归原作者，需确认其许可允许转载后再提交。

## 写作规范

全站文字遵循以下规范，新增内容请保持一致。

- 一句表达一个信息点。多个限定条件分开陈述，避免长句套叠。
- 先说明对象与原因，再给出操作。技术概念不宜直接以参数表开头。
- 加粗仅用于「不执行会出错」的情形，如**必须先卸载**、**必须递增**。名词与语气强调不加粗。
- 表格用于呈现天然结构化的信息：选项、字段、命令、版本对照。不要为版面效果将并列句拆分为表格。
- 列表项使用完整短句，避免名词堆砌。
- 无法支持的功能、可能出错的操作、依赖环境的行为，应直接说明，不用「通常」「一般」模糊表述。
- 提示块仅在需要中断阅读时使用。`tip` 为建议，`warning` 为执行会出错，`danger` 为可能导致数据丢失。
- 页面开头用一至两句说明该页解决的问题。页尾不另加链接段，跳转由侧边栏与正文内链承担。
- 不使用「致力于」「一站式」「轻松」「强大」「极致」「赋能」「助力」等无实际信息的词。
- 不使用破折号插入语，不使用「不仅……而且」句式。
- 使用书面语。可替换为规范动词的口语词一律替换，例如「弄」「搞」「搞定」「跑一遍」「看一下」「照着做」；表态性的「差不多」「基本」「其实」删去或改为具体判断；不使用「吧」「呢」「啊」等语气助词
- 限制性要求后附一句原因，说明违反后会出现什么。只写「不得」而不给原因，读者无法判断例外情形
- 不使用感叹号。

事实类内容修改后，请对照官方仓库复核。官方 README 与官网会持续更新，文档滞后属正常情况，不应将过时内容表述为确定结论。

## 提交前检查

```bash
npm run docs:build
```

构建通过后再提交 PR。CI 会再次执行构建，存在死链时失败。

## 提交 PR

1. 从 `main` 创建分支，不要直接修改主分支：

   ```bash
   git checkout -b docs/我的改动
   git add .
   git commit -m "docs: 补充说明 XXX"
   git push -u origin docs/我的改动
   ```

2. 在 GitHub 打开 **Pull requests → New pull request**，选定分支后按模板填写描述。
3. 有关联 Issue 时填写 `Closes #编号`。
4. 等待 CI 通过及维护者审核。

提交信息使用 [Conventional Commits](https://www.conventionalcommits.org/) 前缀：

| 前缀 | 用于 |
| --- | --- |
| `docs:` | 新增或修改文档内容 |
| `fix:` | 修正链接、错别字 |
| `chore:` | 依赖、配置等杂项 |
| `ci:` | 工作流调整 |

## 依赖升级

升级 VitePress 时，`package.json` 与 `package-lock.json` 需一并提交，并在 `CHANGELOG.md` 的 `Unreleased` 中记录。当前使用 `2.0.0-alpha`，升级前请阅读官方发布说明，alpha 版本之间也存在不兼容变更。

## 获取帮助

- 本站文档的问题：提交 [Issue](https://github.com/Jinby71/ZPCL-docs/issues)
- 启动器本身的问题：提交 [ZPCL Launcher Issues](https://github.com/zuanxu53-hub/ZPCL-Launcher/issues)，不要提交至上游仓库
