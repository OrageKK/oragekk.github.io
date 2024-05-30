import{_ as s,o as a,c as i,e as n}from"./app-qsy7IMJo.js";const l={},e=n(`<blockquote><p>本文介绍使用 WKWebView 拦截 url 进行原生界面跳转</p></blockquote><figure><img src="https://storage1.cuntuku.com/2017/05/27/3.gif" alt="3.gif" tabindex="0" loading="lazy"><figcaption>3.gif</figcaption></figure><ul><li>使用代理方法 decidePolicyForNavigationAction</li></ul><div class="language-objc line-numbers-mode" data-ext="objc" data-title="objc"><pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">- (</span><span style="color:#C678DD;--shiki-dark:#C678DD;">void</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(</span><span style="color:#C678DD;--shiki-dark:#C678DD;">void</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> (^)(WKNavigationActionPolicy))decisionHandler {</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">    // 获取完整url并进行UTF-8转码</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">    NSString</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *strRequest </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [navigationAction.request.URL.absoluteString </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">stringByRemovingPercentEncoding</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">    if</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> ([strRequest </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">hasPrefix:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;app://&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">]) {</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">        // 拦截点击链接</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">        [</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">self</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> handleCustomAction:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">strRequest];</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">        // 不允许跳转</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">      	decisionHandler</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(WKNavigationActionPolicyCancel);</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span><span style="color:#C678DD;--shiki-dark:#C678DD;">else</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">    	// 允许跳转</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">        decisionHandler</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(WKNavigationActionPolicyAllow);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>自定义方法传过来 url 进行判断，需要 html 元素本身就有跳转链接，才可以拦截，如没有，拦截不到。下文 app://xxx 链接为自定义链接</li></ul><div class="language-objc line-numbers-mode" data-ext="objc" data-title="objc"><pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">- (</span><span style="color:#C678DD;--shiki-dark:#C678DD;">void</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">)handleCustomAction:(</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSString</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *)URL</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">    // 判断跳转</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">    NSString</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *link_id </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#98C379;--shiki-dark:#98C379;"> @&quot;&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">    if</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> ([URL </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">hasPrefix:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;app://video&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">]) {</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">        // 视频</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">        MMLog</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;点击了视频</span><span style="color:#D19A66;--shiki-dark:#D19A66;">%@</span><span style="color:#98C379;--shiki-dark:#98C379;">&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">,link_id);</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span><span style="color:#C678DD;--shiki-dark:#C678DD;">else</span><span style="color:#C678DD;--shiki-dark:#C678DD;"> if</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> ([URL </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">hasPrefix:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;app://item&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">]) {</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">        // 单品</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">        MMLog</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;点击了单品</span><span style="color:#D19A66;--shiki-dark:#D19A66;">%@</span><span style="color:#98C379;--shiki-dark:#98C379;">&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">,link_id);</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span><span style="color:#C678DD;--shiki-dark:#C678DD;">else</span><span style="color:#C678DD;--shiki-dark:#C678DD;"> if</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> ([URL </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">hasPrefix:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;app://brand&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">]) {</span></span>
<span class="line"><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">        // 品牌</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">        link_id </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [URL </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">substringFromIndex:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">[</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSString</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> stringWithFormat:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;app://brand&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">].length];</span></span>
<span class="line"><span style="color:#61AFEF;--shiki-dark:#61AFEF;">        MMLog</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;点击了品牌</span><span style="color:#D19A66;--shiki-dark:#D19A66;">%@</span><span style="color:#98C379;--shiki-dark:#98C379;">&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">,link_id);</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function t(r,p){return a(),i("div",null,o)}const B=s(l,[["render",t],["__file","WKWebView-URL.html.vue"]]),d=JSON.parse(`{"path":"/posts/iOS/system/WKWebView-URL.html","title":"WKWebView拦截URL","lang":"zh-CN","frontmatter":{"title":"WKWebView拦截URL","date":"2017-05-27T00:00:00.000Z","category":["iOS"],"tag":["iOS"],"description":"本文介绍使用 WKWebView 拦截 url 进行原生界面跳转 3.gif3.gif 使用代理方法 decidePolicyForNavigationAction 自定义方法传过来 url 进行判断，需要 html 元素本身就有跳转链接，才可以拦截，如没有，拦截不到。下文 app://xxx 链接为自定义链接","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/system/WKWebView-URL.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"WKWebView拦截URL"}],["meta",{"property":"og:description","content":"本文介绍使用 WKWebView 拦截 url 进行原生界面跳转 3.gif3.gif 使用代理方法 decidePolicyForNavigationAction 自定义方法传过来 url 进行判断，需要 html 元素本身就有跳转链接，才可以拦截，如没有，拦截不到。下文 app://xxx 链接为自定义链接"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://storage1.cuntuku.com/2017/05/27/3.gif"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:published_time","content":"2017-05-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WKWebView拦截URL\\",\\"image\\":[\\"https://storage1.cuntuku.com/2017/05/27/3.gif\\"],\\"datePublished\\":\\"2017-05-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[],"git":{"createdTime":1678187456000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":0.77,"words":230},"filePathRelative":"posts/iOS/system/WKWebView-URL.md","localizedDate":"2017年5月27日","excerpt":"<blockquote>\\n<p>本文介绍使用 WKWebView 拦截 url 进行原生界面跳转</p>\\n</blockquote>\\n<figure><img src=\\"https://storage1.cuntuku.com/2017/05/27/3.gif\\" alt=\\"3.gif\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>3.gif</figcaption></figure>\\n<ul>\\n<li>使用代理方法 decidePolicyForNavigationAction</li>\\n</ul>\\n<div class=\\"language-objc line-numbers-mode\\" data-ext=\\"objc\\" data-title=\\"objc\\"><pre class=\\"shiki shiki-themes one-dark-pro one-dark-pro vp-code\\" style=\\"background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">- (</span><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">void</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(</span><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">void</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> (^)(WKNavigationActionPolicy))decisionHandler {</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic\\">    // 获取完整url并进行UTF-8转码</span></span>\\n<span class=\\"line\\"><span style=\\"color:#E5C07B;--shiki-dark:#E5C07B\\">    NSString</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> *strRequest </span><span style=\\"color:#56B6C2;--shiki-dark:#56B6C2\\">=</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> [navigationAction.request.URL.absoluteString </span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">stringByRemovingPercentEncoding</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">];</span></span>\\n<span class=\\"line\\"><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">    if</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> ([strRequest </span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">hasPrefix:</span><span style=\\"color:#98C379;--shiki-dark:#98C379\\">@\\"app://\\"</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">]) {</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic\\">        // 拦截点击链接</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">        [</span><span style=\\"color:#E5C07B;--shiki-dark:#E5C07B\\">self</span><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\"> handleCustomAction:</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">strRequest];</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic\\">        // 不允许跳转</span></span>\\n<span class=\\"line\\"><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">      \\tdecisionHandler</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">(WKNavigationActionPolicyCancel);</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    }</span><span style=\\"color:#C678DD;--shiki-dark:#C678DD\\">else</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\"> {</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic\\">    \\t// 允许跳转</span></span>\\n<span class=\\"line\\"><span style=\\"color:#61AFEF;--shiki-dark:#61AFEF\\">        decisionHandler</span><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">(WKNavigationActionPolicyAllow);</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{B as comp,d as data};
