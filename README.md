![](https://img.shields.io/badge/version-2.10-orange) ![](https://img.shields.io/badge/theme-hope-green) ![](https://img.shields.io/badge/powerby-vuepress-lightgrey?style=flat-square&logo=appveyor) ![](https://img.shields.io/badge/deploy-vercel-lightgrey?style=flat-square&logo=vercel) ![](https://img.shields.io/github/last-commit/oragekk/oragekk.github.io?display_timestamp=committer)

# 博客源码

地址：[https://oragekk.me](https://oragekk.me)

基于`vuepress2.x`和`vuepress-theme-hope`开发，最大限度利用vite的打包速度，基于TypeScript使用vue3编写组件

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
   - vuepress-plugin-live2DAssist （看板娘辅助）
   - vuepress-plugin-popper （鼠标特效）

3. **引用外部内容**

   - [vuepress-plugin-oh-my-live2d](https://github.com/oh-my-live2d/vuepress-plugin-oh-my-live2d) 看板娘插件

   - 不蒜子统计

   - [@moefy-canvas/theme-popper](https://github.com/moefyit/moefy-canvas)原有插件只支持vuepress1.x，自己基于moefy-canvas进行了支持vuepress2.x的本地化插件开发

## 特别鸣谢

[墨七](https://blog.mo7.cc/)

遮罩背景css样式和bing每日图片内容，借鉴自墨七

## 使用方式
因本项目为个人项目，其中有很多个性化配置，不建议直接clone使用，可以选择你喜欢的内容模块（本地插件、本地替换组件）到自己项目中使用

 >详细介绍参考：[关于本站](https://oragekk.me/about)
