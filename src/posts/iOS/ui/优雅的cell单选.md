---
title: "优雅的实现TableViewCell单选"
date: 2018-01-12
category:
  - iOS
tag:
  - iOS
---

> 最近有些忙，好久没有写博客了。
> 分享一个 cell 做单选的思路

## 可行的思路

1. 在 tableview 的控制器中设立一个变量记录选择的 indexPath，点击 cell 之后刷新表格来和现有 indexPath 对比
2. 和第一种大同小异，做一个和 dataArr 同样的数组，记录 indexPath，循环确定当前 cell 是否为选中 cell
3. 利用 cell 的`- (void)setSelected:(BOOL)selected animated:(BOOL)animated`方法

## 利弊分析

1. 前两种，都需要在`didSelectRowAtIndexPath`方法中来刷新表格，可能会造成不必要的滑动，而且需要单独的外在属性来记录这个选择
2. 第三种方法是我要介绍的，不用任何外在属性，不用变量，不用数组。实现 cell、或 cell 中 Button 的单选。并且不会因为复用而造成位置错乱，如果要实现 cell 的多选可以参考我之前的文章[Cell 的 accessoryType 属性标记单元格之后，出现的重用问题](http://oragekk.me/02-13-2017/cell%E5%A4%8D%E7%94%A8-accessoryType%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95.html)

## 实现方式

1. 如果要有默认选择在初始化 tableView 完成后写

   ```objc
   NSIndexPath *indexPath = [NSIndexPath indexPathForRow:0 inSection:0];
   [self.tableView selectRowAtIndexPath:indexPath animated:YES scrollPosition:UITableViewScrollPositionNone];
   ```

2. 然后在 cell 中实现`- (void)setSelected:(BOOL)selected animated:(BOOL)animated`方法

   ```objc
   - (void)setSelected:(BOOL)selected animated:(BOOL)animated {
   [super setSelected:selected animated:animated];
   	if (selected) {
       	self.selBtn.selected = YES;
   	}else {
       	self.selBtn.selected = NO;
   	}
   }
   ```

3. 在`didSelectRowAtIndexPath`方法中给点击的 cell 手动选中，并不需要刷新表格

   ```objc
   [tableView selectRowAtIndexPath:indexPath animated:YES scrollPosition:UITableViewScrollPositionNone];
   ```

> 至此结束，可以看一下效果
> ![效果图.md.gif](https://storage4.cuntuku.com/2018/01/13/dvITJ.gif)
