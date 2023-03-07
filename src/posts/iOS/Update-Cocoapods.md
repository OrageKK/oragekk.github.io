---
title: "Update Cocoapods 1.1.1"
date: 2016-11-09 11:34:47
category:
  - iOS
tag:
  - iOS
  - 工具集
---

> 之前采用正常的 `sudo gem install cocoapods`更新 cocoapods 版本一直不成功，下面为和我遇到同样问题的兄弟们提供一个解决办法

#### 先切换 gem 源

- `gem sources --remove https://rubygems.org/`
- `gem source -a https://gems.ruby-china.org`
- 查看是否切换成功 `gem source -l`
  如果出现下图这样的就说明切换成功了, 如果还是官方的源, 请手动重启电脑尝试
  ![](http://upload-images.jianshu.io/upload_images/2076247-365912ab78be4906.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 接下来就可以开始升级了 cocoapods 了

- `sudo gem install -n /usr/local/bin cocoapods --pre`
- 是的, 你没看错是这个命令, 然后终端会出现一大推东西, 别管他, 最后停下来是这样的就差不多了
  ![](http://upload-images.jianshu.io/upload_images/2076247-81b6046594fe772b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 然后查看版本`pod --version`
  出现 1.1.1，恭喜你已经安装成功了
- 接下来设置 pod 仓库 `pod setup`

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2076247-cafa12def948db48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此处需要耐心等待，根据网络情况完成时间长短不一。
可以在终端中 CD 到`~/.cocoapods`目录中输入 `du -sh *`查看下载进度

### 至此, 已经升级到 cocoapods1.1.1 了, 可以愉快的把玩 Swift3.0 的一些三方库了
