import{_ as a,o as n,c as e,a as i}from"./app-pN3Xaoxw.js";const l={};function r(o,s){return n(),e("div",null,s[0]||(s[0]=[i(`<blockquote><p>细心的你是否也发现了 AFN 的内存泄漏的问题了呢.</p></blockquote><h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法"><span>解决方法</span></a></h3><div class="language-objc line-numbers-mode" data-ext="objc" data-title="objc"><pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    + (AFHTTPSessionManager *)sharedHTTPSession{</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">    static</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> dispatch_once_t onceToken;</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">    dispatch_once</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(&amp;onceToken, ^{</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">        manager </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [AFHTTPSessionManager </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">manager</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">        manager</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">.</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">requestSerializer</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">.</span><span style="color:#E06C75;--shiki-dark:#E06C75;">timeoutInterval</span><span style="color:#56B6C2;--shiki-dark:#56B6C2;"> =</span><span style="color:#D19A66;--shiki-dark:#D19A66;"> 30</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">        [manager.requestSerializer  setValue:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;XMLHttpRequest&quot;</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> forHTTPHeaderField:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;X-Requested-With&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    });</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">    return</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> manager;</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    + (AFURLSessionManager *)sharedURLSession{</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">    static</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> dispatch_once_t onceToken2;</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">    dispatch_once</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(&amp;onceToken2, ^{</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">        urlsession </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [[AFURLSessionManager </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">alloc</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">] </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">initWithSessionConfiguration:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">[NSURLSessionConfiguration </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">defaultSessionConfiguration</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">]];</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    });</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">    return</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> urlsession;</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>将有问题的语句全部替换成单例后，再用 instruments 检查，再也没有出现泄漏的红叉了。O(∩_∩)O 哈哈~</p></blockquote>`,4)]))}const B=a(l,[["render",r],["__file","AFNETworking-A-memory-leak.html.vue"]]),t=JSON.parse(`{"path":"/posts/iOS/source/AFNETworking-A-memory-leak.html","title":"AFNetworking A memory leak","lang":"zh-CN","frontmatter":{"title":"AFNetworking A memory leak","date":"2017-01-19T00:00:00.000Z","category":["iOS"],"tag":["iOS","Bug录"],"description":"细心的你是否也发现了 AFN 的内存泄漏的问题了呢. 解决方法 将有问题的语句全部替换成单例后，再用 instruments 检查，再也没有出现泄漏的红叉了。O(∩_∩)O 哈哈~","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/source/AFNETworking-A-memory-leak.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"AFNetworking A memory leak"}],["meta",{"property":"og:description","content":"细心的你是否也发现了 AFN 的内存泄漏的问题了呢. 解决方法 将有问题的语句全部替换成单例后，再用 instruments 检查，再也没有出现泄漏的红叉了。O(∩_∩)O 哈哈~"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:tag","content":"Bug录"}],["meta",{"property":"article:published_time","content":"2017-01-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"AFNetworking A memory leak\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-01-19T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":3,"title":"解决方法","slug":"解决方法","link":"#解决方法","children":[]}],"git":{"createdTime":1678187456000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":0.39,"words":117},"filePathRelative":"posts/iOS/source/AFNETworking-A-memory-leak.md","localizedDate":"2017年1月19日","excerpt":"<blockquote>\\n<p>细心的你是否也发现了 AFN 的内存泄漏的问题了呢.</p>\\n</blockquote>\\n<h3>解决方法</h3>\\n<div class=\\"language-objc line-numbers-mode\\" data-ext=\\"objc\\" data-title=\\"objc\\"><pre class=\\"shiki shiki-themes one-dark-pro one-dark-pro vp-code\\" style=\\"background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    + (AFHTTPSessionManager *)sharedHTTPSession{</span></span>\\n<span class=\\"line\\"><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">    static</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> dispatch_once_t onceToken;</span></span>\\n<span class=\\"line\\"><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">    dispatch_once</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">(&amp;onceToken, ^{</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">        manager </span><span style=\\"color:#56B6C2;--shiki-dark:#56B6C2\\">=</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> [AFHTTPSessionManager </span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">manager</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">];</span></span>\\n<span class=\\"line\\"><span style=\\"color:#E5C07B;--shiki-dark:#E5C07B\\">        manager</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">.</span><span style=\\"color:#E5C07B;--shiki-dark:#E5C07B\\">requestSerializer</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">.</span><span style=\\"color:#E06C75;--shiki-dark:#E06C75\\">timeoutInterval</span><span style=\\"color:#56B6C2;--shiki-dark:#56B6C2\\"> =</span><span style=\\"color:#D19A66;--shiki-dark:#D19A66\\"> 30</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">        [manager.requestSerializer  setValue:</span><span style=\\"color:#98C379;--shiki-dark:#98C379\\">@\\"XMLHttpRequest\\"</span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\"> forHTTPHeaderField:</span><span style=\\"color:#98C379;--shiki-dark:#98C379\\">@\\"X-Requested-With\\"</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">];</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    });</span></span>\\n<span class=\\"line\\"><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">    return</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> manager;</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    + (AFURLSessionManager *)sharedURLSession{</span></span>\\n<span class=\\"line\\"><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">    static</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> dispatch_once_t onceToken2;</span></span>\\n<span class=\\"line\\"><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">    dispatch_once</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">(&amp;onceToken2, ^{</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">        urlsession </span><span style=\\"color:#56B6C2;--shiki-dark:#56B6C2\\">=</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> [[AFURLSessionManager </span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">alloc</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">] </span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">initWithSessionConfiguration:</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">[NSURLSessionConfiguration </span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">defaultSessionConfiguration</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">]];</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    });</span></span>\\n<span class=\\"line\\"><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">    return</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> urlsession;</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    }</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{B as comp,t as data};
