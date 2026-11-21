import { defineConfig } from 'vitepress'

const REPO = 'https://github.com/zuanxu53-hub/ZPCL-Launcher'

export default defineConfig({
  title: 'ZPCL Launcher',
  description: 'ZPCL Launcher 使用文档：下载安装、功能说明、插件开发与常见问题。',
  lang: 'zh-CN',

  // 仓库规范文件只供 GitHub 阅读，不生成站点页面
  srcExclude: ['README.md', 'CHANGELOG.md', 'SECURITY.md', '_ref/**'],

  lastUpdated: true,

  head: [
    // 标签页图标由 logo.png 裁去透明边距后生成，图形接近满画布，缩小到 16px 仍可辨认
    ['link', { rel: 'icon', href: './favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: './favicon-96.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: './favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: './apple-touch-icon.png' }],
    ['meta', { property: 'og:title', content: 'ZPCL Launcher 文档' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'ZPCL Launcher 使用文档：下载安装、功能说明、插件开发与常见问题。',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: '简介', link: '/intro' },
      { text: '下载', link: '/download' },
      { text: '快速开始', link: '/getting-started' },
      { text: '功能总览', link: '/features' },
      { text: '插件 API', link: '/dev/plugin_api' },
      { text: '常见问题', link: '/faq' },
      {
        text: '隐私与服务协议',
        items: [
          { text: '隐私政策', link: '/privacy' },
          { text: '使用条款', link: '/terms' },
        ],
      },
    ],

    sidebar: [
      { text: '项目简介', link: '/intro' },
      {
        text: '使用文档',
        items: [
          { text: '下载安装', link: '/download' },
          { text: '快速开始', link: '/getting-started' },
          { text: '模组加载器', link: '/loaders' },
          { text: '功能总览', link: '/features' },
          { text: '常见问题', link: '/faq' },
        ],
      },
      {
        text: '帮助文档',
        items: [
          { text: '栏目介绍', link: '/help/' },
          { text: '编写指南', link: '/help/writing' },
        ],
      },
      {
        text: '开发者',
        items: [
          { text: '贡献者名单', link: '/contributor' },
          { text: '环境配置', link: '/dev/environment' },
          { text: '项目结构', link: '/dev/structure' },
          { text: '插件 API', link: '/dev/plugin_api' },
          { text: '贡献指南', link: '/CONTRIBUTING' },
        ],
      },
      {
        text: '关于软件',
        items: [
          { text: '隐私政策', link: '/privacy' },
          { text: '使用条款', link: '/terms' },
          { text: '修改声明与许可', link: '/license' },
          { text: '第三方组件', link: '/third-party' },
        ],
      },
      {
        text: '关于本站',
        items: [{ text: '关于与联系', link: '/about' }],
      },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  navigateText: '导航',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    socialLinks: [{ icon: 'github', link: REPO }],

    editLink: {
      pattern: 'https://github.com/Jinby71/ZPCL-docs/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: 'ZPCL Launcher 是 Zalith Launcher 2 的非官方修改版，遵循 GPLv3 开源协议',
      copyright: '© 2026 ZPCL Launcher 项目文档',
    },

    docFooter: { prev: '上一页', next: '下一页' },
    outline: { label: '页面导航', level: [2, 3] },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
