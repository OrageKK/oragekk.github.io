import{_ as s,o as a,c as t,e}from"./app-PXH2Uynu.js";const n={},i=e(`<blockquote><p>昨天试验了 iOS 11 beta6 发现原有的 https 自建证书不能使用，可能是新版本要对 ATS 加强验证，之前一直说的要全面 https 估计在不久的将来就要来临，未接入的可能要像 Apple 说的不允许上架。所以把配置过程记录在此</p></blockquote><h2 id="要求" tabindex="-1"><a class="header-anchor" href="#要求"><span>要求</span></a></h2><p>启用 ATS 必须符合以下标准，不满足条件的 HTTPS 证书，ATS 都会拒绝链接：</p><ul><li>服务器所有的链接使用 TLS1.2 以上版本</li><li>HTTPS 证书必须使用 SHA 256 以上哈希算法签名</li><li>HTTPS 证书必须使用 RAS 2048 位或 ECC 356 位以上公钥算法</li><li>使用前向加密技术</li></ul><h2 id="afsecuritypolicy-相关的配置" tabindex="-1"><a class="header-anchor" href="#afsecuritypolicy-相关的配置"><span>AFSecurityPolicy 相关的配置</span></a></h2><ul><li><p>SSLPinningMode<br> SSLPinningMode 定义了 https 连接时，如何校验服务器端给予的证书</p><div class="language-objc" data-ext="objc" data-title="objc"><pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD;">typedef</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> NS_ENUM</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">(NSUInteger, AFSSLPinningMode){</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">AFSSLPinningModeNone,</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">AFSSLPinningModePublicKey,</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">AFSSLPinningModeCertificate,</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">};</span></span></code></pre></div><p>AFSSLPinningModeNone: 代表客户端无条件地信任服务器端返回的证书。</p><p>AFSSLPinningModePublicKey: 代表客户端会将服务器端返回的证书与本地保存的证书中，PublicKey 的部分进行校验；如果正确，才继续进行。</p><p>AFSSLPinningModeCertificate: 代表客户端会将服务器端返回的证书和本地保存的证书中的所有内容，包括 PublicKey 和证书部分，全部进行校验；如果正确，才继续进行。</p></li><li><p>allowInvalidCertificates 是否支持自建证书默认 NO 改为 YES</p></li><li><p>validatesDomainName 是否进行域名验证 默认 YES 改为 NO</p></li></ul><h2 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置"><span>客户端配置</span></a></h2><ul><li><p>首先导入证书到项目<br><a href="https://cuntuku.com/image/4xc6p" target="_blank" rel="noopener noreferrer"><img src="https://storage1.cuntuku.com/2017/08/16/daoru.md.png" alt="daoru.md.png" loading="lazy"></a><br><a href="https://cuntuku.com/image/4xyN0" target="_blank" rel="noopener noreferrer"><img src="https://storage2.cuntuku.com/2017/08/16/phases.md.png" alt="phases.md.png" loading="lazy"></a></p></li><li><p>配置 info.plist 文件<br><a href="https://cuntuku.com/image/4xA2z" target="_blank" rel="noopener noreferrer"><img src="https://storage1.cuntuku.com/2017/08/16/infoplist.md.png" alt="infoplist.md.png" loading="lazy"></a></p></li><li><p>网络请求配置(AFN)</p></li></ul><div class="language-objc" data-ext="objc" data-title="objc"><pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSString</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *cerPath </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [[</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSBundle</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> mainBundle</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">] </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">pathForResource:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;UpopRsaCert&quot;</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> ofType:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;cer&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">//证书的路径</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSData</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *certData </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSData</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> dataWithContentsOfFile:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">cerPath];</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSString</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *cerPath2 </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [[</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSBundle</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> mainBundle</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">] </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">pathForResource:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;verify_sign_acp&quot;</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> ofType:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;cer&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">//证书的路径</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSData</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *certData2 </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSData</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> dataWithContentsOfFile:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">cerPath2];</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSString</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *cerPath3 </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [[</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSBundle</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> mainBundle</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">] </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">pathForResource:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;myWebsite&quot;</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> ofType:</span><span style="color:#98C379;--shiki-dark:#98C379;">@&quot;cer&quot;</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span><span style="color:#7F848E;--shiki-dark:#7F848E;font-style:italic;--shiki-dark-font-style:italic;">//证书的路径</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSData</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *certData3 </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSData</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> dataWithContentsOfFile:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">cerPath3];</span></span>
<span class="line"><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSSet</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> *cerArray </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> [</span><span style="color:#E5C07B;--shiki-dark:#E5C07B;">NSSet</span><span style="color:#61AFEF;--shiki-dark:#61AFEF;"> setWithObjects:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">certData,certData2,certData3, </span><span style="color:#D19A66;--shiki-dark:#D19A66;">nil</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">];</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">securityPolicy.pinnedCertificates </span><span style="color:#56B6C2;--shiki-dark:#56B6C2;">=</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;"> cerArray;</span></span>
<span class="line"><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">[httpManager </span><span style="color:#61AFEF;--shiki-dark:#61AFEF;">setSecurityPolicy:</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;">securityPolicy];</span></span></code></pre></div>`,9),o=[i];function l(r,p){return a(),t("div",null,o)}const B=s(n,[["render",l],["__file","配置https.html.vue"]]),k=JSON.parse(`{"path":"/posts/iOS/tool/%E9%85%8D%E7%BD%AEhttps.html","title":"iOS 配置https","lang":"zh-CN","frontmatter":{"title":"iOS 配置https","date":"2017-08-16T00:00:00.000Z","category":["iOS"],"tag":["iOS"],"description":"昨天试验了 iOS 11 beta6 发现原有的 https 自建证书不能使用，可能是新版本要对 ATS 加强验证，之前一直说的要全面 https 估计在不久的将来就要来临，未接入的可能要像 Apple 说的不允许上架。所以把配置过程记录在此 要求 启用 ATS 必须符合以下标准，不满足条件的 HTTPS 证书，ATS 都会拒绝链接： 服务器所有的链接...","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/tool/%E9%85%8D%E7%BD%AEhttps.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"iOS 配置https"}],["meta",{"property":"og:description","content":"昨天试验了 iOS 11 beta6 发现原有的 https 自建证书不能使用，可能是新版本要对 ATS 加强验证，之前一直说的要全面 https 估计在不久的将来就要来临，未接入的可能要像 Apple 说的不允许上架。所以把配置过程记录在此 要求 启用 ATS 必须符合以下标准，不满足条件的 HTTPS 证书，ATS 都会拒绝链接： 服务器所有的链接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://storage1.cuntuku.com/2017/08/16/daoru.md.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:published_time","content":"2017-08-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iOS 配置https\\",\\"image\\":[\\"https://storage1.cuntuku.com/2017/08/16/daoru.md.png\\",\\"https://storage2.cuntuku.com/2017/08/16/phases.md.png\\",\\"https://storage1.cuntuku.com/2017/08/16/infoplist.md.png\\"],\\"datePublished\\":\\"2017-08-16T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":2,"title":"要求","slug":"要求","link":"#要求","children":[]},{"level":2,"title":"AFSecurityPolicy 相关的配置","slug":"afsecuritypolicy-相关的配置","link":"#afsecuritypolicy-相关的配置","children":[]},{"level":2,"title":"客户端配置","slug":"客户端配置","link":"#客户端配置","children":[]}],"git":{"createdTime":1678187456000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":1.63,"words":488},"filePathRelative":"posts/iOS/tool/配置https.md","localizedDate":"2017年8月16日","excerpt":"<blockquote>\\n<p>昨天试验了 iOS 11 beta6 发现原有的 https 自建证书不能使用，可能是新版本要对 ATS 加强验证，之前一直说的要全面 https 估计在不久的将来就要来临，未接入的可能要像 Apple 说的不允许上架。所以把配置过程记录在此</p>\\n</blockquote>\\n<h2>要求</h2>\\n<p>启用 ATS 必须符合以下标准，不满足条件的 HTTPS 证书，ATS 都会拒绝链接：</p>\\n<ul>\\n<li>服务器所有的链接使用 TLS1.2 以上版本</li>\\n<li>HTTPS 证书必须使用 SHA 256 以上哈希算法签名</li>\\n<li>HTTPS 证书必须使用 RAS 2048 位或 ECC 356 位以上公钥算法</li>\\n<li>使用前向加密技术</li>\\n</ul>","autoDesc":true}`);export{B as comp,k as data};
