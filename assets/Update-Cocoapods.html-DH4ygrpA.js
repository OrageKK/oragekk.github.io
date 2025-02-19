import{_ as o,o as a,c as t,a as i}from"./app-pN3Xaoxw.js";const s={};function p(c,e){return a(),t("div",null,e[0]||(e[0]=[i('<blockquote><p>之前采用正常的 <code>sudo gem install cocoapods</code>更新 cocoapods 版本一直不成功，下面为和我遇到同样问题的兄弟们提供一个解决办法</p></blockquote><h4 id="先切换-gem-源" tabindex="-1"><a class="header-anchor" href="#先切换-gem-源"><span>先切换 gem 源</span></a></h4><ul><li><code>gem sources --remove https://rubygems.org/</code></li><li><code>gem source -a https://gems.ruby-china.org</code></li><li>查看是否切换成功 <code>gem source -l</code><br> 如果出现下图这样的就说明切换成功了, 如果还是官方的源, 请手动重启电脑尝试<br><img src="http://upload-images.jianshu.io/upload_images/2076247-365912ab78be4906.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" loading="lazy"></li></ul><h4 id="接下来就可以开始升级了-cocoapods-了" tabindex="-1"><a class="header-anchor" href="#接下来就可以开始升级了-cocoapods-了"><span>接下来就可以开始升级了 cocoapods 了</span></a></h4><ul><li><code>sudo gem install -n /usr/local/bin cocoapods --pre</code></li><li>是的, 你没看错是这个命令, 然后终端会出现一大推东西, 别管他, 最后停下来是这样的就差不多了<br><img src="http://upload-images.jianshu.io/upload_images/2076247-81b6046594fe772b.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" loading="lazy"></li><li>然后查看版本<code>pod --version</code><br> 出现 1.1.1，恭喜你已经安装成功了</li><li>接下来设置 pod 仓库 <code>pod setup</code></li></ul><p><img src="http://upload-images.jianshu.io/upload_images/2076247-cafa12def948db48.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="Paste_Image.png" loading="lazy"><br> 此处需要耐心等待，根据网络情况完成时间长短不一。<br> 可以在终端中 CD 到<code>~/.cocoapods</code>目录中输入 <code>du -sh *</code>查看下载进度</p><h3 id="至此-已经升级到-cocoapods1-1-1-了-可以愉快的把玩-swift3-0-的一些三方库了" tabindex="-1"><a class="header-anchor" href="#至此-已经升级到-cocoapods1-1-1-了-可以愉快的把玩-swift3-0-的一些三方库了"><span>至此, 已经升级到 cocoapods1.1.1 了, 可以愉快的把玩 Swift3.0 的一些三方库了</span></a></h3>',7)]))}const d=o(s,[["render",p],["__file","Update-Cocoapods.html.vue"]]),g=JSON.parse(`{"path":"/posts/iOS/tool/Update-Cocoapods.html","title":"Update Cocoapods 1.1.1","lang":"zh-CN","frontmatter":{"title":"Update Cocoapods 1.1.1","date":"2016-11-09T11:34:47.000Z","category":["iOS"],"tag":["iOS","工具集"],"description":"之前采用正常的 sudo gem install cocoapods更新 cocoapods 版本一直不成功，下面为和我遇到同样问题的兄弟们提供一个解决办法 先切换 gem 源 gem sources --remove https://rubygems.org/ gem source -a https://gems.ruby-china.org 查看是...","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/tool/Update-Cocoapods.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"Update Cocoapods 1.1.1"}],["meta",{"property":"og:description","content":"之前采用正常的 sudo gem install cocoapods更新 cocoapods 版本一直不成功，下面为和我遇到同样问题的兄弟们提供一个解决办法 先切换 gem 源 gem sources --remove https://rubygems.org/ gem source -a https://gems.ruby-china.org 查看是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://upload-images.jianshu.io/upload_images/2076247-365912ab78be4906.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:tag","content":"工具集"}],["meta",{"property":"article:published_time","content":"2016-11-09T11:34:47.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Update Cocoapods 1.1.1\\",\\"image\\":[\\"http://upload-images.jianshu.io/upload_images/2076247-365912ab78be4906.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"http://upload-images.jianshu.io/upload_images/2076247-81b6046594fe772b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"http://upload-images.jianshu.io/upload_images/2076247-cafa12def948db48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\"],\\"datePublished\\":\\"2016-11-09T11:34:47.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":3,"title":"至此, 已经升级到 cocoapods1.1.1 了, 可以愉快的把玩 Swift3.0 的一些三方库了","slug":"至此-已经升级到-cocoapods1-1-1-了-可以愉快的把玩-swift3-0-的一些三方库了","link":"#至此-已经升级到-cocoapods1-1-1-了-可以愉快的把玩-swift3-0-的一些三方库了","children":[]}],"git":{"createdTime":1678187456000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":1.01,"words":304},"filePathRelative":"posts/iOS/tool/Update-Cocoapods.md","localizedDate":"2016年11月9日","excerpt":"<blockquote>\\n<p>之前采用正常的 <code>sudo gem install cocoapods</code>更新 cocoapods 版本一直不成功，下面为和我遇到同样问题的兄弟们提供一个解决办法</p>\\n</blockquote>\\n<h4>先切换 gem 源</h4>\\n<ul>\\n<li><code>gem sources --remove https://rubygems.org/</code></li>\\n<li><code>gem source -a https://gems.ruby-china.org</code></li>\\n<li>查看是否切换成功 <code>gem source -l</code><br>\\n如果出现下图这样的就说明切换成功了, 如果还是官方的源, 请手动重启电脑尝试<br>\\n<img src=\\"http://upload-images.jianshu.io/upload_images/2076247-365912ab78be4906.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240\\" alt=\\"\\" loading=\\"lazy\\"></li>\\n</ul>","autoDesc":true}`);export{d as comp,g as data};
