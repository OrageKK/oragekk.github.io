---
title: "iOS程序启动原理（下）"
date: 2016-12-30 16:02:25
category:
  - iOS
tag:
  - iOS
---

> 接上篇

[iOS 程序启动原理（上）](/posts/iOS/iOS程序启动原理（上）.html)

下图是一个 iOS 程序启动的完整过程

<!-- ![图](https://upload-images.jianshu.io/upload_images/2076247-1f1b30ddcfcd7ef3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) -->
<img src="https://upload-images.jianshu.io/upload_images/2076247-1f1b30ddcfcd7ef3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" referrerPolicy="no-referrer" alt="图">

main 函数中执行了一个 UIApplicationMain 这个函数.

      int main(int argc, char * argv[])
      {    
        @autoreleasepool {        
          return UIApplicationMain(argc, argv, nil, NSStringFromClass([JNAppDelegate class]));    
        }
       }
      int UIApplicationMain(int argc, char *argv[], NSString *principalClassName, NSString *delegateClassName);

argc, argv:直接传递给 UIApplicationMain 进行相关处理即可;

principalClassName:指定应用程序类名(app 象征),该类必须是 UIApplication(或子类).如果为 nil,则用 UIApplication 类作为默认值.

delegateClassName:指定应用程序的代理类,该类必须遵守 UIApplicationDelegate 协议.

UIApplicationMain 函数会根据 principalClassName 创建 UIApplication 对象,根据 delegateClassName 创建一个 delegate 对象,并将该 delegate 对象赋值给 UIApplication 对象中的 delegate 属性.

接着会建立应用程序的 Main Runloop(事件循环),进行事件的处理(首先会在程序启动完毕后调用 delegate 对象的 application:didFinishLaunchingWithOptions:方法)

程序正常退出时 UIApplicationMain 函数才返回.
