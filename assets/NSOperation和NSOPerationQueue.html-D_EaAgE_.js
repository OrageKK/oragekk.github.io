import{_ as e,o as a,c as n,e as s}from"./app-DcuhSCpV.js";const o={},t=s(`<blockquote><h1 id="一-nsoperatioin" tabindex="-1"><a class="header-anchor" href="#一-nsoperatioin"><span>一. NSOperatioin</span></a></h1></blockquote><h4 id="_1-目的" tabindex="-1"><a class="header-anchor" href="#_1-目的"><span>1.目的</span></a></h4><ul><li>开启线程</li><li>提供一些 GCD 不具备的功能</li><li>OC 框架,内部封装的是 GCD</li></ul><h4 id="_2-区别" tabindex="-1"><a class="header-anchor" href="#_2-区别"><span>2.区别</span></a></h4><ul><li>GCD 执行效率高于 NSOperation</li><li>NSOperation 提供了一些 GCD 中不具备的功能(暂停/恢复/取消)---管理操作-NSOperation 的高级用法</li></ul><h4 id="_3-nsoperation-本身是一个抽象类不可以直接使用-实际开发中使用其子类" tabindex="-1"><a class="header-anchor" href="#_3-nsoperation-本身是一个抽象类不可以直接使用-实际开发中使用其子类"><span>3.NSOperation 本身是一个抽象类不可以直接使用,实际开发中使用其子类</span></a></h4><ul><li><p>苹果提供了两个原生子类</p><ul><li>NSInvocationOperation<div class="language-objc line-numbers-mode" data-ext="objc" data-title="objc"><pre class="shiki one-dark-pro" style="background-color:#282c34;color:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#E5C07B;">NSInvocationOperation</span><span style="color:#ABB2BF;"> *op </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> [[</span><span style="color:#E5C07B;">NSInvocationOperation</span><span style="color:#61AFEF;"> alloc</span><span style="color:#ABB2BF;">]  initWithTarget:</span><span style="color:#E5C07B;">self</span><span style="color:#61AFEF;"> selector:</span><span style="color:#C678DD;">@selector(</span><span style="color:#61AFEF;">test</span><span style="color:#C678DD;">)</span><span style="color:#61AFEF;"> object:</span><span style="color:#D19A66;">nil</span><span style="color:#ABB2BF;">];</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li>NSBlockOperation 将操作封装在 block 中<div class="language-objc line-numbers-mode" data-ext="objc" data-title="objc"><pre class="shiki one-dark-pro" style="background-color:#282c34;color:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF;"> NSBlockOperation *op1 </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> [NSBlockOperation </span><span style="color:#61AFEF;">blockOperationWithBlock:</span><span style="color:#ABB2BF;">^{</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 可以追加操作(无限)---如果在非主队列执行操作,原操作和追加的操作都会 开启多条线程去执行</span></span>
<span class="line"><span style="color:#56B6C2;">  NSLog</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">@&quot;操作 1---------</span><span style="color:#D19A66;">%@</span><span style="color:#98C379;">&quot;</span><span style="color:#ABB2BF;">,[</span><span style="color:#E5C07B;">NSThread</span><span style="color:#61AFEF;"> currentThread</span><span style="color:#ABB2BF;">]);</span></span>
<span class="line"><span style="color:#ABB2BF;">}];</span></span>
<span class="line"><span style="color:#ABB2BF;">[op1 </span><span style="color:#61AFEF;">addExecutionBlock:</span><span style="color:#ABB2BF;">^{</span></span>
<span class="line"><span style="color:#56B6C2;">   NSLog</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">@&quot;追加操作 2-----------</span><span style="color:#D19A66;">%@</span><span style="color:#98C379;">&quot;</span><span style="color:#ABB2BF;">,[</span><span style="color:#E5C07B;">NSThread</span><span style="color:#61AFEF;"> currentThread</span><span style="color:#ABB2BF;">]);</span></span>
<span class="line"><span style="color:#ABB2BF;">}];</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>缺点:</p><ul><li>有过在主队列执行操作,有一个操作在主线程执行(随机),其他操作在子线程执行 - 如果直接调用 start 方法执行操作,无法确定每一个操作在哪条线程执行</li><li>一般不要追加操作,除非就是在非主队列执行</li></ul></li><li><p>操作依赖 (串行/线程同步技术)添加数量不要太多</p><ul><li>对于不同的操作队列中的操作依然有效</li><li>添加操作依赖要在添加操作队列之前</li><li>只能对添加在操作队列的操作添加依赖</li><li>一定不要添加循环依赖</li></ul></li></ul><hr><blockquote><h1 id="一-nsoperatioinqueue" tabindex="-1"><a class="header-anchor" href="#一-nsoperatioinqueue"><span>一. NSOperatioinQueue</span></a></h1></blockquote><h4 id="_1-主队列" tabindex="-1"><a class="header-anchor" href="#_1-主队列"><span>1.主队列</span></a></h4><ul><li>放在主队列中的操作,都在主线程执行</li></ul><pre><code>NSOPerationQueue mainQueue</code></pre><h4 id="_2-非主队列" tabindex="-1"><a class="header-anchor" href="#_2-非主队列"><span>2.非主队列</span></a></h4><ul><li>放在非主队列中的操作,都在子线程执行</li></ul><pre><code>[[NSOPerationQueue alloc] init]</code></pre><h4 id="_3-一般定义成全局属性" tabindex="-1"><a class="header-anchor" href="#_3-一般定义成全局属性"><span>3.一般定义成全局属性</span></a></h4><hr><h4 id="_4-每一个操作都有一个-start-方法-用来在当前线程执行" tabindex="-1"><a class="header-anchor" href="#_4-每一个操作都有一个-start-方法-用来在当前线程执行"><span>4.每一个操作都有一个 start 方法,用来在当前线程执行</span></a></h4><ul><li><p>本质:将操作添加到操作队列之后,内部会自动调用内部 start 方法,操作就会自动执行</p></li><li><p>主队列和非主队列决定操作在哪条线程执行(在哪条线程启动操作的 start 方法)</p></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki one-dark-pro" style="background-color:#282c34;color:#abb2bf;" tabindex="0"><code><span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"></div></div>`,20),l=[t];function i(r,p){return a(),n("div",null,l)}const d=e(o,[["render",i],["__file","NSOperation和NSOPerationQueue.html.vue"]]),u=JSON.parse(`{"path":"/posts/iOS/system/NSOperation%E5%92%8CNSOPerationQueue.html","title":"NSOperatioin","lang":"zh-CN","frontmatter":{"title":"NSOperatioin","date":"2016-12-26T13:39:59.000Z","category":["iOS"],"tag":["iOS"],"description":" 一. NSOperatioin 1.目的 开启线程 提供一些 GCD 不具备的功能 OC 框架,内部封装的是 GCD 2.区别 GCD 执行效率高于 NSOperation NSOperation 提供了一些 GCD 中不具备的功能(暂停/恢复/取消)---管理操作-NSOperation 的高级用法 3.NSOperation 本身是一个抽象类不可...","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/system/NSOperation%E5%92%8CNSOPerationQueue.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"NSOperatioin"}],["meta",{"property":"og:description","content":" 一. NSOperatioin 1.目的 开启线程 提供一些 GCD 不具备的功能 OC 框架,内部封装的是 GCD 2.区别 GCD 执行效率高于 NSOperation NSOperation 提供了一些 GCD 中不具备的功能(暂停/恢复/取消)---管理操作-NSOperation 的高级用法 3.NSOperation 本身是一个抽象类不可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:published_time","content":"2016-12-26T13:39:59.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NSOperatioin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2016-12-26T13:39:59.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[],"git":{"createdTime":1678429841000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":1.77,"words":531},"filePathRelative":"posts/iOS/system/NSOperation和NSOPerationQueue.md","localizedDate":"2016年12月26日","excerpt":"<blockquote>\\n<h1>一. NSOperatioin</h1>\\n</blockquote>\\n<h4>1.目的</h4>\\n<ul>\\n<li>开启线程</li>\\n<li>提供一些 GCD 不具备的功能</li>\\n<li>OC 框架,内部封装的是 GCD</li>\\n</ul>\\n<h4>2.区别</h4>\\n<ul>\\n<li>GCD 执行效率高于 NSOperation</li>\\n<li>NSOperation 提供了一些 GCD 中不具备的功能(暂停/恢复/取消)---管理操作-NSOperation 的高级用法</li>\\n</ul>\\n<h4>3.NSOperation 本身是一个抽象类不可以直接使用,实际开发中使用其子类</h4>","autoDesc":true}`);export{d as comp,u as data};
