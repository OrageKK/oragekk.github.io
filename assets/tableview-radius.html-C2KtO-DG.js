import{_ as e,o as i,c as a,e as t}from"./app-D0dFEHJl.js";const o={},l=t(`<h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span><img src="http://upload-images.jianshu.io/upload_images/2076247-98a0c6450c69fa62.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="此子必成大器" loading="lazy"></span></a></h2><blockquote><p>本文介绍内容主要是 tableView 的性能优化之不使用 cornerRadius 设置图片圆角</p></blockquote><p>有人问我为什么 tableView 滑动不流畅，甚至闪退，其实和 cell 中的圆角头像使用了 cornerRadius 有关</p><h3 id="优化点" tabindex="-1"><a class="header-anchor" href="#优化点"><span>优化点</span></a></h3><ul><li><p>行高一定要缓存</p></li><li><p>不要动态创建子视图</p></li><li><p>所有子视图都要预先创建</p></li><li><p>如果不需要显示可以设置 hidden</p></li><li><p>所有的子视图都应该添加到  <code>contentView</code>上</p></li><li><p>所有的子视图都必须要指定颜色</p></li><li><p>不要动态的修改 cornerRadius 之类的图层渲染相关属性</p></li><li><p>使用颜色不要带透明度，此处我们可以使用模拟器中的混合模式去检测，如果如下图所示出现红色，除了 UILabel 之外，其他的我们都应该尽量去处理</p></li><li><p>cell 栅格化</p><pre><code>\`\`cell.layer.shouldRasterize = YES;\`\`

\`\`cell.layer.rasterizationScale = [UIScreen mainScreen].scale;\`\`
</code></pre></li><li><p>异步绘制<br><code>// 异步绘制 layer.drawsAsynchronously = YES;</code></p></li></ul><figure><img src="http://upload-images.jianshu.io/upload_images/2076247-b9d269a0daab047f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="Color Blended Layers模式下" tabindex="0" loading="lazy"><figcaption>Color Blended Layers模式下</figcaption></figure><p>下图是使用了 CornerRadius 设置圆角之后 Color Misaligned Images 检测效果<br><img src="http://upload-images.jianshu.io/upload_images/2076247-a60b840cceed974b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="Color Misaligned Images模式下" loading="lazy"></p><p>此处使用了一张 800*** 800 的图片设置在一个 200*200 的 ImageView 上，没有做任何特殊处理</p><hr><h3 id="优化步骤" tabindex="-1"><a class="header-anchor" href="#优化步骤"><span>优化步骤</span></a></h3><ol><li><p>新建一个 UIImage 分类</p></li><li><p>定义方法<br> - (void)oa_cornerImageWithSize:(CGSize)size fillColor: (UIColor *)fillColor</p><pre><code>completion:(void (^)(UIImage *))completion {

dispatch_async(dispatch_get_global_queue(0, 0), ^{
NSTimeInterval start = CACurrentMediaTime();

	// 1. 利用绘图，建立上下文

	UIGraphicsBeginImageContextWithOptions(size, YES, 0);
	CGRect rect = CGRectMake(0, 0, size.width, size.height);
	// 2. 设置填充颜色
	[fillColor setFill];
	UIRectFill(rect);
	// 3. 利用 贝赛尔路径 \`裁切 效果
	UIBezierPath *path = [UIBezierPath bezierPathWithOvalInRect:rect];
	[path addClip];
	// 4. 绘制图像
	[self drawInRect:rect];
	// 5. 取得结果
	UIImage *result = UIGraphicsGetImageFromCurrentImageContext();
	// 6. 关闭上下文
	UIGraphicsEndImageContext();
	NSLog(@&quot;%f&quot;, CACurrentMediaTime() - start);
	// 7. 完成回调
	dispatch_async(dispatch_get_main_queue(), ^{
		if (completion != nil) {
			completion(result);
			}
		});
	});
}
</code></pre></li></ol><p>3.控制器中代码如下</p><pre><code>  UIImageView *iv = [[UIImageView alloc]  initWithFrame:CGRectMake(0, 0, 200, 200)];
  iv.center = self.view.center;
  [self.view addSubview:iv];
  // 设置图像
  UIImage *image = [UIImage imageNamed:@&quot;avatar.jpg&quot;];
  [image oa_cornerImageWithSize:iv.bounds.size fillColor:[UIColor whiteColor] completion:^(UIImage *image) {
  iv.image = image;
  }];
</code></pre><p>4.模拟器<code>Color Blended Layers</code> 和<code>Color Misaligned Images</code>检测结果如下图</p><figure><img src="http://upload-images.jianshu.io/upload_images/2076247-d35c6e1664f0601e.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="优化之后" tabindex="0" loading="lazy"><figcaption>优化之后</figcaption></figure><p>5.Color Misaligned Images 如果是黄色说明图像做过拉伸处理，如果在 tableView 快速滚动中，附加操作越多，性能越差<br> 使用如上方法不仅可以裁切圆角头像，同时解决了 800***800 设置在 200*200 的 ImageView 上会拉伸的问题<br> 此举可以帮助 tableView 提升一部分性能</p>`,16),n=[l];function r(p,s){return i(),a("div",null,n)}const g=e(o,[["render",r],["__file","tableview-radius.html.vue"]]),d=JSON.parse(`{"path":"/posts/iOS/ui/tableview-radius.html","title":"TableView性能优化","lang":"zh-CN","frontmatter":{"title":"TableView性能优化","subtitle":"工具集，iOS开发，Demo 归纳笔记","date":"2016-12-26T13:39:59.000Z","category":["iOS"],"tag":["iOS","性能优化"],"description":"此子必成大器 本文介绍内容主要是 tableView 的性能优化之不使用 cornerRadius 设置图片圆角 有人问我为什么 tableView 滑动不流畅，甚至闪退，其实和 cell 中的圆角头像使用了 cornerRadius 有关 优化点 行高一定要缓存 不要动态创建子视图 所有子视图都要预先创建 如果不需要显示可以设置 hidden 所有的...","head":[["meta",{"property":"og:url","content":"https://oragekk.me/posts/iOS/ui/tableview-radius.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"TableView性能优化"}],["meta",{"property":"og:description","content":"此子必成大器 本文介绍内容主要是 tableView 的性能优化之不使用 cornerRadius 设置图片圆角 有人问我为什么 tableView 滑动不流畅，甚至闪退，其实和 cell 中的圆角头像使用了 cornerRadius 有关 优化点 行高一定要缓存 不要动态创建子视图 所有子视图都要预先创建 如果不需要显示可以设置 hidden 所有的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://upload-images.jianshu.io/upload_images/2076247-98a0c6450c69fa62.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T06:30:41.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"iOS"}],["meta",{"property":"article:tag","content":"性能优化"}],["meta",{"property":"article:published_time","content":"2016-12-26T13:39:59.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T06:30:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TableView性能优化\\",\\"image\\":[\\"http://upload-images.jianshu.io/upload_images/2076247-98a0c6450c69fa62.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"http://upload-images.jianshu.io/upload_images/2076247-b9d269a0daab047f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"http://upload-images.jianshu.io/upload_images/2076247-a60b840cceed974b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"http://upload-images.jianshu.io/upload_images/2076247-d35c6e1664f0601e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\"],\\"datePublished\\":\\"2016-12-26T13:39:59.000Z\\",\\"dateModified\\":\\"2023-03-10T06:30:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":2,"title":"","slug":"","link":"#","children":[{"level":3,"title":"优化点","slug":"优化点","link":"#优化点","children":[]},{"level":3,"title":"优化步骤","slug":"优化步骤","link":"#优化步骤","children":[]}]}],"git":{"createdTime":1678187456000,"updatedTime":1678429841000,"contributors":[{"name":"huangkun","email":"huangkun@tonshow.cn","commits":1}]},"readingTime":{"minutes":2.16,"words":647},"filePathRelative":"posts/iOS/ui/tableview-radius.md","localizedDate":"2016年12月26日","excerpt":"<h2><img src=\\"http://upload-images.jianshu.io/upload_images/2076247-98a0c6450c69fa62.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240\\" alt=\\"此子必成大器\\" loading=\\"lazy\\"></h2>\\n<blockquote>\\n<p>本文介绍内容主要是 tableView 的性能优化之不使用 cornerRadius 设置图片圆角</p>\\n</blockquote>\\n<p>有人问我为什么 tableView 滑动不流畅，甚至闪退，其实和 cell 中的圆角头像使用了 cornerRadius 有关</p>","autoDesc":true}`);export{g as comp,d as data};
