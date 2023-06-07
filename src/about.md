---
date: 2023-3-14 21:45:45
icon: info
sidebar: false
category:
  - Blog
tag:
  - Blog
---
# 关于本站

:::: info ✨📒
详细记录一下此次建站过程
::::

## 开始

之前的博客是基于jekyll打造的，要添加和定制化的东西都只能基于html+js+css完成，有些麻烦，所以一直有想更换引擎的想法
直到偶然间发现vuepress，首先是被`vue3`+`typescript`+`vite`吸引，然后看到默认主题属实有点不合符我的期待，自己动手成本又太高，也没有太急着去折腾，直到无意中发现了
[vuepress-theme-hope](https://theme-hope.vuejs.press/zh/)，漂亮的外观一下子就吸引到我了，然后去官网深入研究了一番，发现二次开发的成本并不高，对于我来说比较友好，基本都是基于选项的配置型，和一小部分的定制开发，也可以基于vue来写，这让我觉得很合适。所以，一步步折腾了起来……


## Markdown增强

hope主题的markdown效果是出乎意料的好，而且支持了很多普通markdown不支持的东西，如自定义容器、带tab的代码块，最方便的是可以直接写流程图了，可选高亮主题（本站代码高亮基于shikiPlugin,虽不如默认的prismjs轻量高效，但能提供更准确的语法高亮）具体效果看这里☞[Markdown展示](/demo/markdown.md)

## 目录结构

```shell
.
├── .github
│   ├── ISSUE_TEMPLATE # issus 模版
│   │   └── bug-report.yml
│   └── workflows
│       └── deploy-docs.yml # 推送脚本
├── CNAME
├── LICENSE
├── README.md
├── api
│   └── proxy.js # 跨域代理
├── env.d.ts
├── package.json
├── pnpm-lock.yaml
├── script
│   ├── requirements.txt 
│   └── submit.py # Github Actions 推送URL使用脚本
├── src
│   ├── .vuepress
│   │   ├── client.ts # 客户端配置文件
│   │   ├── components
│   │   │   ├── MyCoverLink.vue # 友链组件
│   │   │   └── Mylink.vue # 卡片组件
│   │   ├── config.ts # vuepress配置文件
│   │   ├── data # 数据
│   │   ├── navbar
│   │   ├── plugins
│   │   │   ├── vuepress-plugin-canvas
│   │   │   ├── vuepress-plugin-gradient-cover
│   │   │   ├── vuepress-plugin-hitokoto
│   │   │   ├── vuepress-plugin-live2DAssist
│   │   │   └── vuepress-plugin-popper
│   │   ├── public
│   │   │   ├── assets # 资源
│   │   ├── sidebar
│   │   ├── styles
│   │   ├── theme
│   │   │   ├── api
│   │   │   │   └── bing.ts # bing 每日壁纸
│   │   │   ├── components #自定义组件
│   │   │   ├── index.ts
│   │   │   ├── layouts # 自定义布局
│   │   │   └── utils
│   │   │       ├── busuanzi.pure.js # 不蒜子统计
│   │   │       └── time.ts #运行时间
│   │   └── theme.ts # 主题配置文件
│   └── README.md
├── tsconfig.json
└── vercel.json # vercel 配置文件
```

## 框架支持

[vuepress2.x](https://v2.vuepress.vuejs.org/zh/)

## 主题支持

[vuepress-theme-hope](https://theme-hope.vuejs.press/zh/)

## 自定义内容

基于原主题进行了继承，个性化内容如下，主要自定义内容分为
1. **自定义布局**
   - NotFound.vue
   - Layout.vue(增加打赏组件)
   - News.vue(说说列表布局)

2. **自定义组件**

   - BlogHero.vue
   - PageFooter.vue
   - Sponsor.vue（打赏组件）
   - NewsList.vue （说说列表）
   - NewsItem.vue （说说item）

3. **本地插件开发**

   - vuepress-plugin-canvas（支持彩虹背景和动态几何图形两种）
   - vuepress-plugin-gradient-cover （遮罩背景）
   - vuepress-plugin-hitokoto （一言插件）
   - vuepress-plugin-live2DAssist （看板娘辅助，由于子页有sidebar，看板娘会挡住，所以写了一个子页隐藏的小东西）
   - vuepress-plugin-popper （鼠标特效，基于[@moefy-canvas/theme-popper](https://github.com/moefyit/moefy-canvas)）

4. **引用外部内容**

   - [vuepress-plugin-oh-my-live2d](https://github.com/oh-my-live2d/vuepress-plugin-oh-my-live2d) 看板娘插件

   - 不蒜子统计

   - [@moefy-canvas/theme-popper](https://github.com/moefyit/moefy-canvas)原有插件只支持vuepress1.x，自己基于moefy-canvas进行了支持vuepress2.x的本地化插件开发

   - [@vuepress/plugin-google-analytics](https://v2.vuepress.vuejs.org/zh/reference/plugin/google-analytics.html) 支持Google Analytics 4 正好看到通知原来的UA也要被强制转换了，所以更换了G4
5. **配置内容**
   - navbar
   - sidebar
   - 评论基于 [Waline](https://waline.js.org/)
   - 搜索基于[algolia](https://www.algolia.com/developers/?utm_content=powered_by&utm_source=localhost&utm_medium=referral&utm_campaign=docsearch)
   - 启用 copyright 版权信息插件
   - feed rss插件
   - 增加文章类型-说说，为说说markdown图片添加预览选择器

6. **零碎**
   - 运行时间统计
   - CSS 样式美化
   - 引入字体，品如手写体，夏行楷体
   - wanlie 增加自定义emoji，并修改展示样式
   - 个性log
   - 自动推送新文章url到搜索引擎（百度、Bing、Google）👉[详细配置](/platform/github/github-action)

## 总结
> 未完待续，持续优化中
> 
本地插件，喜欢自取，源码公开，点击右上角，github图标即可，当然不要忘记点个✨哦

