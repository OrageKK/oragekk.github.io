---
title: "评论系统从多说迁移到disqus指南"
shortTitle: "多说迁移到disqus指南"
icon: expansion
date: 2017-04-14
category:
  - Blog
tag:
  - Blog
---

> 由于多说评论系统将于 6 月 1 日下线，所以准备迁移至[disqus](https://disqus.com/)，相比较的话对于国内环境还是多说好用一点，毕竟加载快，支持各大媒体的分享，也不用小伙伴们翻墙；而 disqus 分享也只支持 Facebook 和 twitter。。PS:貌似现在又被墙了，以后有时间再换吧，目前就先这样，国内据说[畅言](http://changyan.kuaizhan.com/static/help/)还不错

## 迁移过程

### 1.首先为了不丢失原有评论，导出多说评论

![](http://i2.muimg.com/567571/f0d7b62ff410decf.png)

### 2.文件转换

- 由于 disqus 不支持多说导出的.json 文件，所以需要进行转换为 xml 文件，此处使用 github 上的轮子[JamesPan/duoshuo-migrator](https://github.com/JamesPan/duoshuo-migrator)
- 使用步骤
  1. 下载[duoshuo-migrator.py](https://github.com/JamesPan/duoshuo-migrator/blob/master/duoshuo-migrator.py?raw=true)并安装依赖
     ![](http://i2.muimg.com/567571/f98e1281fec1cdd7.png)
  2. 执行 `python duoshuo-migrator.py -i ~/Desktop/export.json  -o disqus.xml`命令  
     ![](http://i2.muimg.com/567571/8e27bcddc31c29b2.png)
  3. 将转换完成文件导入
     ![](http://i2.muimg.com/567571/213761ad8cf62886.png)
