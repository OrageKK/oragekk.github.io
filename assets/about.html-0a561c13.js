import{_ as t,O as r,P as c,Q as s,ad as n,a4 as l,a5 as B,U as e,C as o}from"./framework-dab5a93a.js";const i={},y=e('<h1 id="关于本站" tabindex="-1"><a class="header-anchor" href="#关于本站" aria-hidden="true">#</a> 关于本站</h1><div class="hint-container info"><p class="hint-container-title">✨📒</p><p>详细记录一下此次建站过程</p></div><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>',3),d=s("code",null,"vue3",-1),u=s("code",null,"typescript",-1),F=s("code",null,"vite",-1),v={href:"https://theme-hope.vuejs.press/zh/",target:"_blank",rel:"noopener noreferrer"},A=s("h2",{id:"markdown增强",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#markdown增强","aria-hidden":"true"},"#"),n(" Markdown增强")],-1),h=e(`<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="shiki one-dark-pro" style="background-color:#282c34;" tabindex="0"><code><span class="line"><span style="color:#56B6C2;">.</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">.github</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">ISSUE_TEMPLATE</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># issus 模版</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">bug-report.yml</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">workflows</span></span>
<span class="line"><span style="color:#ABB2BF;">│       </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">deploy-docs.yml</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 推送脚本</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">CNAME</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">LICENSE</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">README.md</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">api</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">proxy.js</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 跨域代理</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">env.d.ts</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">package.json</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">pnpm-lock.yaml</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">script</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">requirements.txt</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">submit.py</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># Github Actions 推送URL使用脚本</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">src</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">.vuepress</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">client.ts</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 客户端配置文件</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">components</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">MyCoverLink.vue</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 友链组件</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">Mylink.vue</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 卡片组件</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">config.ts</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># vuepress配置文件</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">data</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 数据</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">navbar</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">plugins</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">vuepress-plugin-canvas</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">vuepress-plugin-gradient-cover</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">vuepress-plugin-hitokoto</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">vuepress-plugin-live2DAssist</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">vuepress-plugin-popper</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">public</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">assets</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 资源</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">sidebar</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">styles</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">theme</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">api</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">bing.ts</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># bing 每日壁纸</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">components</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;">#自定义组件</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">index.ts</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">layouts</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 自定义布局</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">utils</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">       </span><span style="color:#98C379;">├──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">busuanzi.pure.js</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 不蒜子统计</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">       </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">time.ts</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;">#运行时间</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">│</span><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">theme.ts</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># 主题配置文件</span></span>
<span class="line"><span style="color:#ABB2BF;">│   </span><span style="color:#98C379;">└──</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">README.md</span></span>
<span class="line"><span style="color:#ABB2BF;">├── </span><span style="color:#98C379;">tsconfig.json</span></span>
<span class="line"><span style="color:#ABB2BF;">└── </span><span style="color:#98C379;">vercel.json</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># vercel 配置文件</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="框架支持" tabindex="-1"><a class="header-anchor" href="#框架支持" aria-hidden="true">#</a> 框架支持</h2>`,3),C={href:"https://v2.vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},m=s("h2",{id:"主题支持",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#主题支持","aria-hidden":"true"},"#"),n(" 主题支持")],-1),_={href:"https://theme-hope.vuejs.press/zh/",target:"_blank",rel:"noopener noreferrer"},b=s("h2",{id:"自定义内容",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#自定义内容","aria-hidden":"true"},"#"),n(" 自定义内容")],-1),f=s("p",null,"基于原主题进行了继承，个性化内容如下，主要自定义内容分为",-1),g=s("li",null,[s("p",null,[s("strong",null,"替换主题组件")]),s("ul",null,[s("li",null,[s("p",null,"BlogHero.vue")]),s("li",null,[s("p",null,"PageFooter.vue")])])],-1),k=s("p",null,[s("strong",null,"本地插件开发")],-1),E=s("li",null,"vuepress-plugin-canvas（支持彩虹背景和动态几何图形两种）",-1),x=s("li",null,"vuepress-plugin-gradient-cover （遮罩背景）",-1),w=s("li",null,"vuepress-plugin-hitokoto （一言插件）",-1),j=s("li",null,"vuepress-plugin-live2DAssist （看板娘辅助，由于子页有sidebar，看板娘会挡住，所以写了一个子页隐藏的小东西）",-1),L={href:"https://github.com/moefyit/moefy-canvas",target:"_blank",rel:"noopener noreferrer"},M=s("p",null,[s("strong",null,"引用外部内容")],-1),N={href:"https://github.com/oh-my-live2d/vuepress-plugin-oh-my-live2d",target:"_blank",rel:"noopener noreferrer"},S=s("li",null,[s("p",null,"不蒜子统计")],-1),z={href:"https://github.com/moefyit/moefy-canvas",target:"_blank",rel:"noopener noreferrer"},R={href:"https://v2.vuepress.vuejs.org/zh/reference/plugin/google-analytics.html",target:"_blank",rel:"noopener noreferrer"},V=s("p",null,[s("strong",null,"配置内容")],-1),D=s("li",null,"navbar",-1),G=s("li",null,"sidebar",-1),I={href:"https://waline.js.org/",target:"_blank",rel:"noopener noreferrer"},P={href:"https://www.algolia.com/developers/?utm_content=powered_by&utm_source=localhost&utm_medium=referral&utm_campaign=docsearch",target:"_blank",rel:"noopener noreferrer"},U=s("li",null,"启用 copyright 版权信息插件",-1),T=s("li",null,"feed rss插件",-1),q=s("li",null,[s("p",null,[s("strong",null,"零碎")]),s("ul",null,[s("li",null,"运行时间统计"),s("li",null,"CSS 样式美化"),s("li",null,"引入字体，品如手写体，夏行楷体"),s("li",null,"wanlie 增加自定义emoji，并修改展示样式"),s("li",null,"个性log"),s("li",null,[n("自动推送新文章url到搜索引擎（百度、Bing、Google）👉"),s("a",{href:"/platform/github/github-action"},"详细配置")])])],-1),H=s("h2",{id:"总结",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),n(" 总结")],-1),O=s("p",null,"过程中，碰到很多bug和问题，也学习了很多前端方面的知识，还学到了Vue3的setup语法和h函数的写法，磕磕绊绊，目前总算是上线了，后续有空再写吧 ┏(＾0＾)┛ 本地插件，喜欢自取，源码公开，点击右上角，github图标即可，当然不要忘记点个✨哦",-1);function Q(W,J){const a=o("ExternalLinkIcon"),p=o("RouterLink");return r(),c("div",null,[y,s("p",null,[n("之前的博客是基于jekyll打造的，要添加和定制化的东西都只能基于html+js+css完成，对于我这个非专业前端人员来说，有些麻烦，所以一直有想更换引擎的想法 直到偶然间发现vuepress，首先是被"),d,n("+"),u,n("+"),F,n("吸引，然后看到默认主题属实有点不合符我的期待，自己动手成本又太高，也没有太急着去折腾，直到无意中发现了 "),s("a",v,[n("vuepress-theme-hope"),l(a)]),n("，漂亮的外观一下子就吸引到我了，然后去官网深入研究了一番，发现二次开发的成本并不高，对于我来说比较友好，基本都是基于选项的配置型，和一小部分的定制开发，也可以基于vue来写，这让我觉得很合适。所以，一步步折腾了起来……")]),A,s("p",null,[n("hope主题的markdown效果是出乎意料的好，而且支持了很多普通markdown不支持的东西，如自定义容器、带tab的代码块，最方便的是可以直接写流程图了，可选高亮主题（本站代码高亮基于shikiPlugin,虽不如默认的prismjs轻量高效，但能提供更准确的语法高亮）具体效果看这里☞"),l(p,{to:"/demo/markdown.html"},{default:B(()=>[n("Markdown展示")]),_:1})]),h,s("p",null,[s("a",C,[n("vuepress2.x"),l(a)])]),m,s("p",null,[s("a",_,[n("vuepress-theme-hope"),l(a)])]),b,f,s("ol",null,[g,s("li",null,[k,s("ul",null,[E,x,w,j,s("li",null,[n("vuepress-plugin-popper （鼠标特效，基于"),s("a",L,[n("@moefy-canvas/theme-popper"),l(a)]),n("）")])])]),s("li",null,[M,s("ul",null,[s("li",null,[s("p",null,[s("a",N,[n("vuepress-plugin-oh-my-live2d"),l(a)]),n(" 看板娘插件")])]),S,s("li",null,[s("p",null,[s("a",z,[n("@moefy-canvas/theme-popper"),l(a)]),n("原有插件只支持vuepress1.x，自己基于moefy-canvas进行了支持vuepress2.x的本地化插件开发")])]),s("li",null,[s("p",null,[s("a",R,[n("@vuepress/plugin-google-analytics"),l(a)]),n(" 支持Google Analytics 4 正好看到通知原来的UA也要被强制转换了，所以更换了G4")])])])]),s("li",null,[V,s("ul",null,[D,G,s("li",null,[n("评论基于 "),s("a",I,[n("Waline"),l(a)])]),s("li",null,[n("搜索基于"),s("a",P,[n("algolia"),l(a)])]),U,T])]),q]),H,O])}const X=t(i,[["render",Q],["__file","about.html.vue"]]);export{X as default};
