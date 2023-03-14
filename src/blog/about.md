---
date: 2023-3-14 21:45:45
category:
  - Blog
tag:
  - Blog
---
# 建站过程

:::: info ✨📒

<p>如有问题可邮件联系我<a href="mailto:oragekk@163.com">Mail to Oragekk</a></p>

**💡人生天地之间，若白驹过隙，忽然而已**
::: center
_-- 《庄子·外篇·知北游》_
:::
**🏷 我们有很多的声音而没有真理，我们来自一个良心却各自藏起**

🏷 有什么想说的，可以写在下面🌤

::::


地址：[https://oragekk.me](https://oragekk.me)

基于`vuepress2.x`和`theme-hope`开发，最大限度利用vite的打包速度，基于TypeScript使用vue3编写组件

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

遮罩背景css样式和bing每日图片内容，借鉴自墨七，感谢提供API接口
