---
title: "TableView性能优化"
subtitle: "工具集，iOS开发，Demo 归纳笔记"
date: 2016-12-26 13:39:59
category:
  - iOS
tag:
  - iOS
  - 性能优化
---

## ![此子必成大器](http://upload-images.jianshu.io/upload_images/2076247-98a0c6450c69fa62.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 本文介绍内容主要是 tableView 的性能优化之不使用 cornerRadius 设置图片圆角

有人问我为什么 tableView 滑动不流畅，甚至闪退，其实和 cell 中的圆角头像使用了 cornerRadius 有关

### 优化点

- 行高一定要缓存
- 不要动态创建子视图
- 所有子视图都要预先创建
- 如果不需要显示可以设置 hidden
- 所有的子视图都应该添加到  `contentView`上
- 所有的子视图都必须要指定颜色
- 不要动态的修改 cornerRadius 之类的图层渲染相关属性
- 使用颜色不要带透明度，此处我们可以使用模拟器中的混合模式去检测，如果如下图所示出现红色，除了 UILabel 之外，其他的我们都应该尽量去处理
- cell 栅格化

      ``cell.layer.shouldRasterize = YES;``

      ``cell.layer.rasterizationScale = [UIScreen mainScreen].scale;``

- 异步绘制
  `// 异步绘制
    layer.drawsAsynchronously = YES;`

![Color Blended Layers模式下](http://upload-images.jianshu.io/upload_images/2076247-b9d269a0daab047f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下图是使用了 CornerRadius 设置圆角之后 Color Misaligned Images 检测效果
![Color Misaligned Images模式下](http://upload-images.jianshu.io/upload_images/2076247-a60b840cceed974b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此处使用了一张 800*\*\* 800 的图片设置在一个 200*200 的 ImageView 上，没有做任何特殊处理

---

### 优化步骤

1.  新建一个 UIImage 分类
2.  定义方法
        - (void)oa_cornerImageWithSize:(CGSize)size fillColor: (UIColor *)fillColor

        completion:(void (^)(UIImage *))completion {

        dispatch_async(dispatch_get_global_queue(0, 0), ^{
        NSTimeInterval start = CACurrentMediaTime();

        	// 1. 利用绘图，建立上下文

        	UIGraphicsBeginImageContextWithOptions(size, YES, 0);
        	CGRect rect = CGRectMake(0, 0, size.width, size.height);
        	// 2. 设置填充颜色
        	[fillColor setFill];
        	UIRectFill(rect);
        	// 3. 利用 贝赛尔路径 `裁切 效果
        	UIBezierPath *path = [UIBezierPath bezierPathWithOvalInRect:rect];
        	[path addClip];
        	// 4. 绘制图像
        	[self drawInRect:rect];
        	// 5. 取得结果
        	UIImage *result = UIGraphicsGetImageFromCurrentImageContext();
        	// 6. 关闭上下文
        	UIGraphicsEndImageContext();
        	NSLog(@"%f", CACurrentMediaTime() - start);
        	// 7. 完成回调
        	dispatch_async(dispatch_get_main_queue(), ^{
        		if (completion != nil) {
        			completion(result);
        			}
        		});
        	});
        }

3.控制器中代码如下

      UIImageView *iv = [[UIImageView alloc]  initWithFrame:CGRectMake(0, 0, 200, 200)];
      iv.center = self.view.center;
      [self.view addSubview:iv];
      // 设置图像
      UIImage *image = [UIImage imageNamed:@"avatar.jpg"];
      [image oa_cornerImageWithSize:iv.bounds.size fillColor:[UIColor whiteColor] completion:^(UIImage *image) {
      iv.image = image;
      }];

4.模拟器`Color Blended Layers` 和`Color Misaligned Images`检测结果如下图

![优化之后](http://upload-images.jianshu.io/upload_images/2076247-d35c6e1664f0601e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5.Color Misaligned Images 如果是黄色说明图像做过拉伸处理，如果在 tableView 快速滚动中，附加操作越多，性能越差
使用如上方法不仅可以裁切圆角头像，同时解决了 800*\*\*800 设置在 200*200 的 ImageView 上会拉伸的问题
此举可以帮助 tableView 提升一部分性能
