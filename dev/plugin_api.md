# 插件 API

协议版本为 1.4.6，自启动器 1.4.0 起逐步开放，当前 1.5.5 沿用该协议。协议原文见官方仓库的 [docs/PLUGIN_GUIDE.md](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/docs/PLUGIN_GUIDE.md)。

插件是一个普通 APK，不是代码模块。启动器不加载插件的 dex，也不与插件共享进程。启动器只读取 APK 内 `assets/zplugin/` 下的配置，再用原生控件渲染页面。

因此，插件能实现什么功能，取决于插件自身的应用。启动器只提供入口、渲染和若干系统动作。

按步骤编写插件的教程见[帮助文档](/help/)的「插件」专题；本页只说明协议本身。

## 插件类型

| 类型 | 标记 | 作用 |
| --- | --- | --- |
| 资源插件 | `target: "minecraft"` 与 `files/` | 把文件树覆盖到游戏目录，用于模组、资源包与配置 |
| 皮肤插件 | `ui: "<标识>"` 与 `ui.json` | 只改变外观，包括配色、圆角与玻璃渲染 |
| 自带界面插件 | `entry: true` 与 `label` | 插件本身是一个已安装的应用，启动器为它提供一个入口 |

三类标记可以同时出现在一个 APK 中。本页以自带界面插件为主，这类插件同时可以使用页面协议。

## 目录结构

```text
assets/zplugin/
├── plugin.json      # 必需：清单
├── pages.json       # 可选：页面、版块接管、左栏入口
├── ui.json          # 可选：皮肤
├── files/           # 可选：要覆盖到游戏目录的文件树
└── res/             # 可选：icon 积木引用的图片
```

启动器判断一个 APK 是否为插件，只看包内是否存在 `assets/zplugin/plugin.json`。文件缺失时，导入会被拒绝，并提示「不是有效的插件 APK」。

## plugin.json

```json
{
  "name": "基岩版管理器",
  "version": "1.0.12",
  "author": "Zalith",
  "description": "管理、安装并启动 Minecraft 基岩版的独立应用。",
  "target": "launcher",
  "enabled": true,
  "entry": true,
  "label": "基岩版"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 插件名，用于列表与提示 |
| `version` | string | 展示用版本号。升级判定不读取该字段，读取的是 APK 的 versionCode |
| `author` / `description` | string | 展示用信息 |
| `target` | string | 取 `"minecraft"` 或 `"launcher"`，表示插件装给谁 |
| `enabled` | bool | 安装后是否立即启用，默认为 `true` |
| `ui` | string | 皮肤标识。填写后按皮肤插件处理 |
| `entry` | bool | 是否为自带界面插件，此类插件可以没有 `files/` |
| `label` | string | 入口名称，用于首页入口与插件列表中的「打开」 |

`entry` 为 `true` 时，启动器通过 `getLaunchIntentForPackage` 打开插件自身的应用，不读取插件代码。

## pages.json

顶层有三个数组：`pages` 为页面，`sections` 为整块接管版块，`entries` 为向版块左栏追加条目。

```json
{
  "pages": [
    { "id": "home", "title": "基岩版", "blocks": [] }
  ],
  "sections": [
    { "section": "home", "left": "side", "content": "home" }
  ],
  "entries": [
    {
      "section": "download",
      "label": "下载基岩版",
      "page": "bedrock-download",
      "position": "top",
      "display": "content"
    }
  ]
}
```

### 页面

| 字段 | 说明 |
| --- | --- |
| `id` | 页面 id。`page` 动作、`sections` 与 `entries` 通过它引用页面 |
| `title` | 二级页标题 |
| `left` | 字符串数组。提供后在左栏列出，为纯文本，不可点击 |
| `blocks` | 积木数组，按数组顺序从上到下渲染 |
| `footer` | 贴在底部的积木，不随内容滚动 |
| `layout` | 布局名，默认为 `scroll` |

### sections

`sections` 用于整块接管某个版块。

```json
{ "section": "home", "left": "side", "content": "home" }
```

`section` 取 `home`、`download`、`link`、`setup` 或 `other`。`left` 与 `content` 各指向一个页面 id，两者都可以省略，省略时沿用启动器原有的页面。

`sections` 是整块替换。接管某个版块后，该版块原有的左栏不再显示，`entries` 向同一版块添加的条目也不会出现，因此两者对同一版块互斥。

接管只在插件模式下生效，即首页选中该插件时。

### entries

`entries` 用于向版块左栏追加一个条目。

```json
{
  "section": "download",
  "label": "下载基岩版",
  "page": "bedrock-download",
  "position": "top",
  "display": "content"
}
```

| 字段 | 说明 |
| --- | --- |
| `section` | 条目加入哪个版块的左栏 |
| `label` | 条目文字 |
| `page` | 点击后显示的页面 |
| `position` | `top` 紧跟第一个系统条目，与原版游戏并列；`end` 追加到末尾，为默认值 |
| `display` | `content` 画在右侧主栏；`page` 打开二级页，为默认值 |

`entries` 不受插件模式限制。插件安装后条目即显示。

## 可用积木

| `type` | 关键字段 | 说明 |
| --- | --- | --- |
| `title` | `text` | 段落标题，加粗并大一号 |
| `text` | `text`、`muted` | 正文。`muted: true` 时使用次要色 |
| `card` | `title`、`blocks` | 卡片容器，可以嵌套 |
| `row` | `blocks` | 横排，子元素等宽 |
| `button` | `text`、`action`、`primary`、`height` | 按钮。`primary: true` 为高亮主按钮 |
| `switch` | `text`、`checked`、`action` | 开关。状态只在本次停留期间有效 |
| `divider` | 无 | 分割线 |
| `space` | `height` | 竖向留白，单位为 dp，取值 0 至 200 |
| `status` | `package`、`text` | 显示指定应用的安装状态，如「已安装 v1.21.90」或「未安装」。回到前台时自动刷新 |
| `icon` | `resource`、`size` | 引用 `assets/zplugin/res/` 下的图片 |
| `version_collection` | 见下文数据通道 | 由插件提供数据的版本列表，启动器以原生样式渲染 |

## 可用动作

| `type` | 字段 | 行为 |
| --- | --- | --- |
| `hint` | `text` | 在底部显示一条提示，3 秒后消失 |
| `page` | `id` | 打开同一份 `pages.json` 中的另一页 |
| `section` | `value` | 切换到内置版块，取 `home`、`download`、`link`、`setup` 或 `other` |
| `launch` | 无 | 打开本插件的界面，即拉起插件自身的 Activity |
| `open` | `url` | 用系统浏览器或应用商店打开链接 |
| `copy` | `text` | 复制到剪贴板并提示 |
| `install` | 无 | 让用户选择一个本地 APK，交给系统安装器处理，不需要存储权限 |
| `app` | `package` | 启动另一个已安装的应用 |
| `app_info` | `package` | 打开系统的应用信息页 |

只有上表中的 9 种动作会被执行，其余类型直接忽略。

```json
{
  "type": "button",
  "text": "启动",
  "primary": true,
  "action": { "type": "app", "package": "com.example.app" }
}
```

## 数据通道

页面是静态数据，无法得知此刻有哪些版本。需要动态数据时，使用 `version_collection` 积木，并由插件在自身应用中实现 ContentProvider 提供数据。

```xml
<provider
    android:name=".PluginProvider"
    android:authorities="${applicationId}.pclplugin"
    android:exported="true" />
```

`authorities` 必须是 `<包名>.pclplugin`，否则启动器找不到该 Provider。

启动器按以下方式调用，`arg` 可以传空字符串：

```kotlin
val bundle = contentResolver.call(
    Uri.parse("content://<插件包名>.pclplugin"), method, arg, null
)
val json  = bundle?.getString("json")     // 成功
val error = bundle?.getString("error")    // 失败，原样显示给用户
```

积木声明如下：

```json
{
  "type": "version_collection",
  "title": "版本列表",
  "method": "list",
  "detail_method": "details",
  "groups": ["正式版", "预览版"],
  "group_icons": { "正式版": "pcl_block_grass", "预览版": "pcl_block_command_block" },
  "options": [
    { "value": "v8a", "label": "ARM64" },
    { "value": "v7a", "label": "ARM32" }
  ]
}
```

`method` 返回版本列表：

```json
{
  "items": [
    {
      "id": "1.21.90",
      "title": "1.21.90",
      "subtitle": "2025-06-10 · 620 MB",
      "group": "正式版",
      "latest": true
    }
  ]
}
```

`id` 为必需字段且必须唯一。`group` 对应 `groups` 中的名字。`latest` 为 `true` 时标注「最新」。

`detail_method` 返回下载源。调用时 `arg` 为两行文本，第一行是版本 id，第二行是选项的 `value`。

```json
{
  "items": [
    { "title": "夸克网盘", "url": "https://pan.quark.cn/s/xxxx", "password": "a1b2" },
    { "title": "123 云盘", "url": "https://www.123pan.com/s/xxxx" }
  ]
}
```

返回内容有三条约束：

- `url` 必须以 `http://` 或 `https://` 开头，否则该条目被丢弃
- 含 `password` 的条目显示为「提取码 xxx」，选中时先自动复制，再打开链接
- 返回空数组表示没有可用源，页面显示「没有可用的下载源」

启动器只发起这两种调用，也只渲染返回的条目。它不内置任何下载源，也不识别具体站点。

## 安装与升级

| 行为 | 说明 |
| --- | --- |
| 安装来源 | 设备上装有带 `assets/zplugin/` 的 APK 时自动识别；也可在插件管理中选择 APK 文件 |
| 存储位置 | `<外部 files>/plugins/<id>/`，内含 `plugin.apk`、`meta.json`、`files/` 与 `pages.json` |
| 启用与停用 | 停用只改变状态，不删除文件。`pages.json` 仅在启用时加载 |
| 升级 | 下次扫描发现 versionCode 变化时重新解包，页面与素材一并更新 |
| 页面刷新 | 进入首页时重新读取 `pages.json`，无需重启启动器 |

**升级时 versionCode 必须递增。** 只修改 `plugin.json` 中的 `version` 而 versionCode 不变时，启动器视为同一版本，不会重新解包，界面停留在旧配置。

## 最小示例

`assets/zplugin/plugin.json`：

```json
{
  "name": "示例插件",
  "version": "1.0.0",
  "target": "launcher",
  "entry": true,
  "label": "示例"
}
```

`assets/zplugin/pages.json`：

```json
{
  "sections": [{ "section": "home", "content": "home" }],
  "pages": [
    {
      "id": "home",
      "title": "示例",
      "blocks": [
        { "type": "title", "text": "示例插件" },
        { "type": "status", "package": "com.example.app", "text": "安装状态" },
        { "type": "space", "height": 8 },
        { "type": "button", "text": "启动", "primary": true,
          "action": { "type": "app", "package": "com.example.app" } },
        { "type": "button", "text": "打开插件界面", "action": { "type": "launch" } }
      ]
    }
  ]
}
```

把这两个文件放入 `assets/zplugin/`，打包签名后安装，首页会出现「示例」入口，点击后进入该页面。

## 问题排查

| 症状 | 可能原因 |
| --- | --- |
| 提示「不是有效的插件 APK」 | APK 中缺少 `assets/zplugin/plugin.json`。旧的资源包不视为插件 |
| 已安装但首页没有入口 | `entry` 未填写，或 `label` 与 `name` 为空，或插件已停用 |
| 界面未更新 | versionCode 未递增，未重新解包；或该版块已被 `sections` 接管 |
| 页面空白 | `sections` 或 `entries` 指向的页面 id 在 `pages` 中不存在 |
| 版本列表持续加载 | Provider 的 `authorities` 不是 `<包名>.pclplugin`，或返回的 Bundle 中没有 `json` |
| 提示「插件没有返回数据」 | Provider 返回了 null Bundle，或错误信息写入了 `json` 而非 `error` |
| 下载源列表为空 | `url` 不是 http 或 https，或返回结构不是 `{"items":[...]}` |

## 接口状态与版本

插件可以依赖的接口分为两类。标注「稳定」的属于正式契约，改名会随大版本进行；标注「试验」的当前可用，但字段细节可能调整。

| 接口 | 起始版本 | 状态 |
| --- | --- | --- |
| `plugin.json` 清单 | 1.4.0 | 稳定 |
| `pages` 页面（`footer`、`layout` 除外） | 1.4.0 | 稳定 |
| `pages[].footer` 与 `pages[].layout` | 1.4.0 | 试验 |
| `sections` 整块接管版块 | 1.4.1 | 稳定 |
| `entries` 左栏追加条目 | 1.4.1 | 稳定 |
| `entries[].display = content` | 1.4.3 | 稳定 |
| 积木 9 种（`icon`、`version_collection` 之外的 9 种） | 1.4.0 至 1.4.2 | 稳定 |
| `icon` 与 `version_collection` 积木 | 1.4.0 至 1.4.2 | 试验 |
| 动作 9 种 | 1.4.0 至 1.4.1 | 稳定 |
| `button.primary` 主按钮 | 1.4.1 | 稳定 |
| `status` 按包名显示安装状态 | 1.4.1 | 稳定 |
| 版本列表 `method` | 1.4.2 | 试验 |
| 下载源 `detail_method` | 1.4.2 | 试验 |
| 错误返回 `error` | 1.4.2 | 试验 |

启动器的内部实现不属于接口，包括 `PclUiRuntime`、渲染器、皮肤字段与 `plugins/<id>/` 的目录布局，不应依赖。

各版本开放的接口：

| 启动器 | 新增的开放接口 |
| --- | --- |
| 1.4.0 | 清单、页面、基础积木与动作 |
| 1.4.1 | `launch`、`status`、`open`、`copy`、`install`、`app`、`app_info` 动作，以及 `sections`、`entries`、`primary` 与页面热加载 |
| 1.4.2 | `version_collection` 积木与 ContentProvider 数据通道 |
| 1.4.3 | `entries[].display = content` |
| 1.4.4 | 下载源原生选择，数据契约不变 |
| 1.4.5 | `entries` 支持 `setup` 版块 |
| 1.4.6 | 升级重解包，属行为修复 |

## 能力边界

启动器不加载插件代码，插件也拿不到启动器的进程内数据。

启动器不绑定 AIDL，不反向调用插件的 Activity，也不向插件传递任何内部对象。

页面能触发的动作仅限于上表所列的 9 种，不包含文件读写，也不包含任意代码执行。

插件能实现什么功能，由插件自身应用决定。启动器只负责发现、拉起与渲染。

协议原文更新后，本页可能滞后。遇到表述不一致时，以官方仓库的 [docs/PLUGIN_GUIDE.md](https://github.com/zuanxu53-hub/ZPCL-Launcher/blob/main/docs/PLUGIN_GUIDE.md) 为准。
