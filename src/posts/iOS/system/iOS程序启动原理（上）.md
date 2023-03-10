---
title: "iOS程序启动原理（上）"
date: 2016-12-30 15:59:12
category:
  - iOS
tag:
  - iOS
---


> 本文介绍 iOS 程序中的 Info.plist,pch 文件,UIApplication,openURL 以及 UIWindow 的常用属性及方法;

### info.plist

#### 常见设置

建立一个工程后,会在 Supporting files 文件夹下看到一个"_工程名-Info.plist_"的文件,该文件对工程做一些运行期的配置,非常重要,不能删除.
在旧版 Xcode 创建的工程中,这个配置文件的名字叫做"Info.plist".
项目中的其他 plist 文件不能带有"Info"这个字眼,不然会被错认为是传说中非常重要的"Info.plist".
项目中还有一个"InfoPlist.strings"的文件(Xcode6 之后需手动添加),跟 Info.plist 文件的本地化相关.

#### Info.plist 常见属性:

1.  Localiztion native development region (CFBundleDevelopmentRegion)-本地化相关;
2.  Bundle display name(CFBundleDisplayName)-程序安装后显示的名称,限制在 10-12 个字符,如果超出,将被显示缩写名称;
3.  Icon file(CFBundleIconFile)-app 图标名称,一般为 Icon.png;
4.  Bundle version(CFBundleVersion)-应用程序的版本号,每次往 App Store 上发布一个新版本时,需要增加这个版本号;
5.  Main storyboard file base name(NSMainStoryboardFile)-主 storyboard 文件名称;
6.  Bundle identifier(CFBundleIdentifier)-项目的唯一标识,部署到真机时用到;
7.  额外说一下从 iOS9 开始，所有的 http 请求都改成了 https，采用 TLS 1.2 协议，目的是增强数据安全。如果不更新的话，暂时可以在 Info.plist 中声明，使用不安全的网络请求。
    可以在 info.plist 中添加一下字段
    <key>NSAppTransportSecurity</key>
    <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    </dict>
    即如：![](http://upload-images.jianshu.io/upload_images/2076247-22165721d20be6ab?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### pch 文件

项目的 Supporting files 文件夹下面有个"工程名-Prefix.pch"文件,也是一个头文件;

    pch头文件的内容能被项目中的其他所有源文件共享和访问;

    一般在pch头文件中定义一些全局的宏;

    在pch头文件中添加下列预处理指令,然后在项目中使用Log(...)来输出日志信息,就可以在发布应用的时候,一次性将NSLog语句移除(在调试模式下,才有定义DEBUG)
        #ifdef DEBUG
        #define Log(...) NSLog(__VA_ARGS__)
        #else#define Log(...) /* */
        #endif``

### UIApplication

UIApplication 对象是应用程序的象征;
     每一个应用都有自己的 UIApplication 对象,而且是单例的;
     通过[UIApplication sharedApplication]可以获得这个单例对象;
     一个 iOS 程序启动后创建的第一个对象就是 UIApplication 对象;
     利用 UIApplication 对象,能进行一些应用级别的操作.

#### UIApplication 的常用属性

设置应用程序图标右上角的红色提醒数字:
@property(nonatomic) NSInteger applicationIconBadgeNumber;
设置联网指示器(菊花)的可见性
@property(nonatomic,getter=isNetworkActivityIndicatorVisible) BOOL networkActivityIndicatorVisible;

### 状态栏

##### 从 iOS7 开始,系统提供了两种管理状态栏的方式:

1.>通过 UIViewController 管理(在 iOS 中,默认情况下,状态栏都是由 UIViewController 管理的):
状态栏的样式:
- (UIStatusBarStyle)preferredStatusBarStyle;
  状态栏的可见性
- (BOOL)prefersStatusBarHidden;
2.>通过 UIApplication 管理(一个应用程序的状态栏都由它统一管理)
application.statusBarHidden = NO;

#### openURL:

UIApplication 有个功能十分强大的 openURL 方法:
- (BOOL)openURL:(NSURL\*)url;
openURL:方法的部分功能有

- 打电话
  UIApplication \*app = [UIApplication sharedApplication];
  [app openURL:[NSURL URLWithString:@"tel://10086"]];
- 发短信
  [app openURL:[NSURL URLWithString:@"sms://10086"]];
- 发邮件
  [app openURL[NSURL URLWithString:@"mailto://605453790@qq.com"]];
- 打开一个网页资源
  [app openURL:[NSURL URLWithString:@"http://www.baidu.com"]];
- 打开其他 app 程序
  NSString \*urlString = [NSString stringWithFormat:@"AppJumpSecond://%@",textField.text];
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]];

### UIApplication 和 delegate

所有的移动操作系统都有个致命的缺点:app 很容易受到打扰.比如一个来电或者锁屏会导致 app 进入后台甚至被终止;

还有很多其他类似的情况会导致 app 受到干扰,在 app 受到干扰时,会产生一些系统事件,这时 UIApplication 会通知它的 delegate 对象,让 delegate 来处理这些系统事件.

delegate 可处理的事件包括:

    1> 应用程序的生命周期事件(如程序的启动和关闭);

    2> 系统事件(如来电);

    3> 内存警告...

#### UIApplicationDelegate 协议

    // app接收到内存警告时调用
    - (void)applicationDidReceiveMemoryWarning:(UIApplication *)application;
    // app进入后台时调用（比如按了home键）
    - (void)applicationDidEnterBackground:(UIApplication *)application;
    // app启动完毕时调用
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;

每次新建完项目,都有个带有"AppDelegate"字眼的类,它就是 UIApplication 的代理,*AppDelegate*默认已经遵守了`UIApplicationDelegate`协议,已经是 UIApplication 的代理;

### UIWindow

UIWindow 是一种特殊的 UIView,通常在一个 App 中只会有一个 UIWindow;
    iOS 程序启动完毕后,创建的第一个视图控件就是 UIWindow,接着创建控制器的 View,最后将控制器的 view 添加到 UIWindow 上,于是控制器的 view 就显示在屏幕上了.
     一个程序之所以能显示在屏幕上,完全是因为它有 UIWindow,没有 UIWindow,就看不见任何 UI 界面;
添加 UIView 到 UIWindow 中的两种常见方式:
    1> 直接将 view 添加到 UIWindow 中,但并不会理会 view 对应的 UIViewController
- (void)addSubview:(UIView \*)view;

2> 自动将 rootViewController 的 view 添加到 UIWindow 中,负责管理 rootViewController 的生命周期;

    @property(nonatomic,retain) UIViewController *rootViewController;

常用方法:
  - (void)makeKeyWindow;  //让当前 UIWindow 变成 keyWindow(主窗口) 
- (void)makeKeyAndVisible;  //让当前 UIWindow 变成 keyWindow，并显示出来

#### UIWindow 的获得:

    [UIApplication sharedApplication].windows

在本应用中打开的 UIWindow 列表,这样就可以接触应用中的任何一个 UIView 对象(平时输入文字弹出的键盘,就处在一个新的 UIWindow 中).

    [UIApplication sharedApplication].keyWindow

用来接收键盘以及非触摸类的消息事件的 UIWindow,而且程序中每时每刻只能有一个 UIWindow 是 keyWindow.如果某个 UIWindow 内部的文本框不能输入文字,可能是因为这个 UIWindow 不是 keyWindow.

    view.window

获得某个 UIView 所在的 UIWindow.
