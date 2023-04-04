---
date: 2023-3-14 21:45:45
category:
  - Blog
tag:
  - Blog
---
# 建站过程

:::: info ✨📒
详细记录一下此次建站过程
::::

## 开始

之前的博客是基于jekyll打造的，要添加和定制化的东西都只能基于html+js+css完成，对于我这个非专业前端人员来说，有些麻烦，所以一直有想更换引擎的想法
直到偶然间发现vuepress，首先是被`vue3`+`typescript`+`vite`吸引，然后看到默认主题属实有点不合符我的期待，自己动手成本又太高，也没有太急着去折腾，直到无意中发现了
[vuepress-theme-hope](https://theme-hope.vuejs.press/zh/)，漂亮的外观一下子就吸引到我了，然后去官网深入研究了一番，发现二次开发的成本并不高，对于我来说比较友好，基本都是基于选项的配置型，和一小部分的定制开发，也可以基于vue来写，这让我觉得很合适。所以，一步步折腾了起来……


## Markdown增强

hope主题的markdown效果是出乎意料的好，而且支持了很多普通markdown不支持的东西，如自定义容器、带tab的代码块，可选高亮主题（本站代码高亮基于shikiPlugin,虽不如默认的prismjs轻量高效，但能提供更准确的语法高亮）具体效果看这里☞[Markdown展示](/demo/markdown.md)

## 目录结构

```shell
-src
    +---.vuepress
    |   +---components
    |   +---data
    |   +---navbar
    |   +---plugins
    |   |   +---vuepress-plugin-canvas
    |   |   |   +---client
    |   |   |   \---components
    |   |   +---vuepress-plugin-gradient-cover
    |   |   |   \---client
    |   |   |       +---components
    |   |   |       \---style
    |   |   +---vuepress-plugin-hitokoto
    |   |   |   \---client
    |   |   +---vuepress-plugin-live2DAssist
    |   |   \---vuepress-plugin-popper
    |   |       \---client
    |   |           \---components
    |   +---public
    |   |   +---assets
    |   |   |   +---font
    |   |   |   +---icon
    |   |   |   +---lafei_4
    |   |   |   |   +---motions
    |   |   |   |   \---textures
    |   |   |   +---sipeibojue_5
    |   |   |   |   +---motions
    |   |   |   |   \---textures
    |   |   |   \---z46_2
    |   |   |       +---motions
    |   |   |       \---textures
    |   |   \---script
    |   +---sidebar
    |   +---styles
    |   \---theme
    |       +---api
    |       +---components
    |       \---utils
    \---
```

## 框架支持

[vuepress2.x](https://v2.vuepress.vuejs.org/zh/)

## 主题支持

[vuepress-theme-hope](https://theme-hope.vuejs.press/zh/)

## 自定义内容

基于原主题进行了继承，个性化内容如下，主要自定义内容分为

1. **替换主题组件**

   - BlogHero.vue

   - PageFooter.vue

2. **本地插件开发**

   - vuepress-plugin-canvas（支持彩虹背景和动态几何图形两种）
   - vuepress-plugin-gradient-cover （遮罩背景）
   - vuepress-plugin-hitokoto （一言插件）
   - vuepress-plugin-live2DAssist （看板娘辅助，由于子页有sidebar，看板娘会挡住，所以写了一个子页隐藏的小东西）
   - vuepress-plugin-popper （鼠标特效，基于[@moefy-canvas/theme-popper](https://github.com/moefyit/moefy-canvas)）

3. **引用外部内容**

   - [vuepress-plugin-oh-my-live2d](https://github.com/oh-my-live2d/vuepress-plugin-oh-my-live2d) 看板娘插件

   - 不蒜子统计

   - [@moefy-canvas/theme-popper](https://github.com/moefyit/moefy-canvas)原有插件只支持vuepress1.x，自己基于moefy-canvas进行了支持vuepress2.x的本地化插件开发

   - [@vuepress/plugin-google-analytics](https://v2.vuepress.vuejs.org/zh/reference/plugin/google-analytics.html) 支持Google Analytics 4 正好看到通知原来的UA也要被强制转换了，所以更换了G4
4. **配置内容**
   - navbar
   - sidebar
   - 评论基于 [Waline](https://waline.js.org/)
   - 搜索基于[algolia](https://www.algolia.com/developers/?utm_content=powered_by&utm_source=localhost&utm_medium=referral&utm_campaign=docsearch)
   - 启用 copyright 版权信息插件
   - feed rss插件

5. **零碎**
   - 运行时间统计
   - CSS 样式美化
   - 引入字体，品如手写体，夏行楷体
   - wanlie 增加自定义emoji，并修改展示样式
   - 个性log

## 总结
过程中，碰到很多bug和问题，也学习了很多前端方面的知识，还学到了Vue3的setup语法和h函数的写法，磕磕绊绊，目前总算是上线了，后续有空再写吧 ┏(＾0＾)┛
本地插件，喜欢自取，源码公开，点击右上角，github图标即可，当然不要忘记点个✨哦
## 特别鸣谢

[墨七](https://blog.mo7.cc/)

遮罩背景css样式和bing每日图片内容，借鉴自墨七，感谢提供API接口
