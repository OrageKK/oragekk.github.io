import{_ as p,r as t,o as r,c as u,a as o,b as e,d as l,e as i}from"./app-DcuhSCpV.js";const a={},c=i(`<h1 id="runloop" tabindex="-1"><a class="header-anchor" href="#runloop"><span>Runloop</span></a></h1><h3 id="runloop-是什么" tabindex="-1"><a class="header-anchor" href="#runloop-是什么"><span>Runloop 是什么</span></a></h3><ul><li>Runloop 是事件接收和分发机制的一个实现。 <ul><li>Runloop 提供了一种异步执行代码的机制，不能并行执行任务。</li><li>在主队列中，Main RunLoop 直接配合任务的执行，负责处理 UI 事件、定时器以及其他内核相关事件。</li></ul></li></ul><p>###Runloop 的主要目的</p><ul><li>保证执行程序的线程不会被终止</li></ul><p>###什么时候使用 Runloop</p><ul><li><p>当需要和该线程进行交互的时候才会使用 Runloop</p></li><li><p>每一个线程都有其对应的 RunLoop，但是默认非主线程的 RunLoop 是没有运行的，需要为 RunLoop 添加至少一个事件源，然后去 run 它。</p></li><li><p>一般情况下我们是没有必要去启用线程的 RunLoop 的，除非你在一个单独的线程中需要长久的检测某个事件。</p></li><li><p>主线程 默认有 Runloop。当自己启动一个线程，如果只是用于处理单一的事件，则该线程在执行完之后就退出了。所以当我们需要让该线程监听某项事务时，就得让线程一直不退出，runloop 就是这么一个循环，没有事件的时候，一直卡着，有事件来临了，执行其对应的函数。</p></li></ul><hr><blockquote><p><em>Runloop，正如其名所示，是线程进入和被线程用来响应事件以及调用事件处理函数的地方。需要在代码中使用控制语句实现 run loop 的循环，也就是说，需要代码提供 while 或者 for 循环来驱动 run loop。</em></p></blockquote><p>在这个循环中使用一个 Runloop 对象<code>[NSRunloop currentRunloop]</code>执行接收消息，调用对应的处理函数。</p><ul><li><p>Runloop 接收两种源事件:<code>input sources</code>和<code>timer sources</code>。</p></li><li><p>input sources  传递异步事件，通常是来自其他线程和不同的程序中的消息；</p></li><li><p>timer sources(定时器)  传递同步事件（重复执行或者在特定时间上触发）。</p></li><li><p>除了处理<code>input sources</code>，Runloop 也会产生一些关于本身行为的<code>notificaiton</code>。注册成为 Runloop 的<code>observer</code>，可以接收到这些 notification，做一些额外的处理。（使用<code>CoreFoundation</code>来成为 runloop 的 observer）。</p></li></ul><p>###Runloop 特性</p><ul><li><p>当有事件发生时，Runloop 会根据具体的事件类型通知应用程序作出响应；</p></li><li><p>当没有事件发生时，Runloop 会进入休眠状态，从而达到省电的目的；</p></li><li><p>当事件再次发生时，Runloop 会被重新唤醒，处理事件。</p></li><li><p>iOS 中所有的事件监听全部由运行循环负责</p></li><li><p>主线程的  RunLoop 在应用启动的时候就会自动创建</p></li><li><p>其他线程则需要在该线程下自己启动</p></li><li><p>不能自己创建  RunLoop</p></li><li><p>RunLoop 并不是线程安全的，所以需要避免在其他线程上调用当前线程的 RunLoop</p></li><li><p>RunLoop 负责管理  <code>autorelease pools</code></p></li><li><p>RunLoop 负责处理消息事件，即输入源事件、计时器事件和网络请求事情</p></li></ul><p>###应用场景</p><ul><li><p>创建常驻线程，执行一些会一直存在的任务。该线程的生命周期跟  App<br>   相同<br> @autoreleasepool {<br> NSLog(@&quot;%@&quot;, [NSThread currentThread]);<br> NSRunLoop *runLoop = [NSRunLoop currentRunLoop];<br> // 只有添加端口后，才能能够保证运行循环持续运行<br> [runLoop addPort:[NSMachPort port] forMode:NSDefaultRunLoopMode];<br> [runLoop run];</p><pre><code>     // 线程结束之前，不会执行至此
     NSLog(@&quot;%@&quot;, [NSThread currentThread]);
  }
</code></pre></li><li><p>维护线程的生命周期，让线程不自动退出，<code>isFinished</code><br>   为  <code>Yes</code>时退出</p></li><li><p>在一定时间内监听某种事件，或执行某种任务的线程</p></li></ul><hr><blockquote><p>####提示：一般在开发中很少会主动创建 Runloop，而通常会把事件添加到 Runloop 中。</p></blockquote>`,17),s=o("br",null,null,-1),d={href:"https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/Multithreading/RunLoopManagement/RunLoopManagement.html#//apple_ref/doc/uid/10000057i-CH16-SW23",target:"_blank",rel:"noopener noreferrer"},R=o("br",null,null,-1),h={href:"http://blog.ibireme.com/2015/05/18/runloop/",target:"_blank",rel:"noopener noreferrer"},m=o("br",null,null,-1),_={href:"http://www.cnblogs.com/zy1987/p/4582466.html",target:"_blank",rel:"noopener noreferrer"};function g(L,b){const n=t("ExternalLinkIcon");return r(),u("div",null,[c,o("p",null,[e("###参考文章"),s,o("a",d,[e("官方文档"),l(n)]),R,o("a",h,[e("深入理解 Runloop"),l(n)]),m,o("a",_,[e("Runloop 原理和核心机制"),l(n)])])])}const k=p(a,[["render",g],["__file","iOS中的Runloop.html.vue"]]),S=JSON.parse(`{"path":"/posts/iOS/system/iOS%E4%B8%AD%E7%9A%84Runloop.html","title":"Runloop","lang":"zh-CN","frontmatter":{"date":"2016-12-26T13:39:59.000Z","category":["iOS"],"tag":["iOS"],"description":"Runloop Runloop 是什么 Runloop 是事件接收和分发机制的一个实现。 Runloop 提供了一种异步执行代码的机制，不能并行执行任务。 在主队列中，Main RunLoop 直接配合任务的执行，负责处理 UI 事件、定时器以及其他内核相关事件。 ###Runloop 的主要目的 保证执行程序的线程不会被终止 ###什么时候使用 Ru...","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/system/iOS%E4%B8%AD%E7%9A%84Runloop.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"Runloop"}],["meta",{"property":"og:description","content":"Runloop Runloop 是什么 Runloop 是事件接收和分发机制的一个实现。 Runloop 提供了一种异步执行代码的机制，不能并行执行任务。 在主队列中，Main RunLoop 直接配合任务的执行，负责处理 UI 事件、定时器以及其他内核相关事件。 ###Runloop 的主要目的 保证执行程序的线程不会被终止 ###什么时候使用 Ru..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:published_time","content":"2016-12-26T13:39:59.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Runloop\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2016-12-26T13:39:59.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":3,"title":"Runloop 是什么","slug":"runloop-是什么","link":"#runloop-是什么","children":[]}],"git":{"createdTime":1678429841000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":3.16,"words":948},"filePathRelative":"posts/iOS/system/iOS中的Runloop.md","localizedDate":"2016年12月26日","excerpt":"\\n<h3>Runloop 是什么</h3>\\n<ul>\\n<li>Runloop 是事件接收和分发机制的一个实现。\\n<ul>\\n<li>Runloop 提供了一种异步执行代码的机制，不能并行执行任务。</li>\\n<li>在主队列中，Main RunLoop 直接配合任务的执行，负责处理 UI 事件、定时器以及其他内核相关事件。</li>\\n</ul>\\n</li>\\n</ul>\\n<p>###Runloop 的主要目的</p>\\n<ul>\\n<li>保证执行程序的线程不会被终止</li>\\n</ul>\\n<p>###什么时候使用 Runloop</p>\\n<ul>\\n<li>\\n<p>当需要和该线程进行交互的时候才会使用 Runloop</p>\\n</li>\\n<li>\\n<p>每一个线程都有其对应的 RunLoop，但是默认非主线程的 RunLoop 是没有运行的，需要为 RunLoop 添加至少一个事件源，然后去 run 它。</p>\\n</li>\\n<li>\\n<p>一般情况下我们是没有必要去启用线程的 RunLoop 的，除非你在一个单独的线程中需要长久的检测某个事件。</p>\\n</li>\\n<li>\\n<p>主线程 默认有 Runloop。当自己启动一个线程，如果只是用于处理单一的事件，则该线程在执行完之后就退出了。所以当我们需要让该线程监听某项事务时，就得让线程一直不退出，runloop 就是这么一个循环，没有事件的时候，一直卡着，有事件来临了，执行其对应的函数。</p>\\n</li>\\n</ul>","autoDesc":true}`);export{k as comp,S as data};
