![](https://img.shields.io/badge/version-2.5.0-orange) ![](https://img.shields.io/badge/theme-hope-green) ![](https://img.shields.io/badge/powerby-vuepress-lightgrey?style=flat-square&logo=appveyor) ![](https://img.shields.io/badge/deploy-vercel-lightgrey?style=flat-square&logo=vercel) ![](https://img.shields.io/github/last-commit/oragekk/oragekk.github.io?display_timestamp=committer)

# 博客源码

地址：[https://oragekk.me](https://oragekk.me)

基于`vuepress2.x`和`vuepress-theme-hope`开发，基于TypeScript使用vue3编写组件

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

3. **插件开发**

   - vuepress-plugin-canvas（支持彩虹背景和动态几何图形两种）
   - vuepress-plugin-gradient-cover （遮罩背景）
   - vuepress-plugin-hitokoto （一言插件）
   - vuepress-plugin-live2DAssist （看板娘辅助，由于子页有sidebar，看板娘会挡住，所以写了一个子页隐藏的小东西）
   - vuepress-plugin-popper （鼠标特效，基于[@moefy-canvas/theme-popper](https://github.com/moefyit/moefy-canvas)）
   - [vuepress-plugin-meting2](https://github.com/OrageKK/vuepress-plugin-meting2) （播放器插件，可以全局使用和md文件使用）
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
   - waline 增加自定义emoji，并修改展示样式
   - 个性log
   - 自动推送新文章url到搜索引擎（百度、Bing、Google）👉[详细配置](https://oragekk.me/blog/auto-push.html)


## 使用方式
因本项目为个人项目，其中有很多个性化配置，不建议直接clone使用，可以选择你喜欢的内容模块（本地插件、本地替换组件）到自己项目中使用

 >详细介绍参考：[关于本站](https://oragekk.me/about)
