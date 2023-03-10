---
title: "WKWebView使用及自适应高度"
date: 2017-05-26 15:47:40
category:
  - iOS
tag:
  - iOS
---

> 记录一下 iOS8 之后的新控件 WKWebView，用以替代之前的 UIWebView，因为需求是在 TableView 的 Cell 中放一个 WebView。就产生了滑动手势冲突，为了解决这个问题就需要让 webView 高度自适应

## 一、新特性

- 在性能、稳定性、功能方面有很大的提升，最明显的就是内存占用降低了很多。
- 允许 JavaScript 的 Nitro 库加载并使用（UIWebView 中限制）
- 支持了更多的 HTML5 特性；
- 高达 60fps 的滚动刷新率以及内置手势（支持右滑返回）；
- 将 UIWebViewDelegate 与 UIWebView 重构成了 14 类与 3 个协议（[查看苹果官方文档](https://developer.apple.com/reference/webkit)）；

## 二、初始化

- 首先需要引入 WebKit 库

```objc
#import <WebKit/WebKit.h>
```

- 采用 configuration 的方式初始化（可选）

```objc
- (WKWebView *)webView {
    if (!_webView) {
        WKWebViewConfiguration *config = [WKWebViewConfiguration new];
        //初始化偏好设置属性：preferences
        config.preferences = [WKPreferences new];
        //The minimum font size in points default is 0;
        config.preferences.minimumFontSize = 10;
        //是否支持JavaScript
        config.preferences.javaScriptEnabled = YES;
        //不通过用户交互，是否可以打开窗口
        config.preferences.javaScriptCanOpenWindowsAutomatically = NO;
        _webView = [[WKWebView alloc]initWithFrame:CGRectMake(0, 0, self.view.width, self.view.height) configuration:config];
        _webView.UIDelegate =self;
        _webView.navigationDelegate = self;
        // 此处因为高度自适应所以不应该让webview内部可以滚动
        _webView.scrollView.scrollEnabled = NO;

    }

    return _webView;
}

```

- 加载网页

```objc
WKWebView *webView = [[WKWebView alloc] initWithFrame:self.view.bounds];
[webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://m.baidu.com"]]];
[self.view addSubview:webView];
```

## 三、WKWebView 代理方法

1.WKNavigationDelegate

该代理提供的方法，可以用来追踪加载过程（页面开始加载、加载完成、加载失败）、决定是否执行跳转。

```objc
// 页面开始加载时调用
- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation;
// 当内容开始返回时调用
- (void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation;
// 页面加载完成之后调用
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation;
// 页面加载失败时调用
- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation;
```

页面跳转的代理方法有三种，分为（收到跳转与决定是否跳转两种）

```objc
// 接收到服务器跳转请求之后调用
- (void)webView:(WKWebView *)webView didReceiveServerRedirectForProvisionalNavigation:(WKNavigation *)navigation;
// 在收到响应后，决定是否跳转
- (void)webView:(WKWebView *)webView decidePolicyForNavigationResponse:(WKNavigationResponse *)navigationResponse decisionHandler:(void (^)(WKNavigationResponsePolicy))decisionHandler;
// 在发送请求之前，决定是否跳转
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler;
```

2.WKUIDelegate

```objc
// 创建一个新的WebView
- (WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures;
```

剩下三个代理方法全都是与界面弹出提示框相关的，针对于 web 界面的三种提示框（警告框、确认框、输入框）分别对应三种代理方法。下面只举了警告框的例子

```objc
/**
 *  web界面中有弹出警告框时调用
 *
 *  @param webView           实现该代理的webview
 *  @param message           警告框中的内容
 *  @param frame             主窗口
 *  @param completionHandler 警告框消失调用
 */
- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(void (^)())completionHandler;
```

3.WKScriptMessageHandler

这个协议中包含一个必须实现的方法，这个方法是提高 App 与 web 端交互的关键，它可以直接将接收到的 JS 脚本转为 OC 或 Swift 对象

```objc
// 从web界面中接收到一个脚本时调用
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message;
```

## 四、WKWebView 加载 JS

```objc
// js代码
NSString *js = @"	var count = document.images.length;for (var i = 0; i < count; i++) {var image = document.images[i];image.style.width=320;};window.alert('找到' + count + '张图');";
// 根据JS字符串初始化WKUserScript对象
WKUserScript *script = [[WKUserScript alloc] initWithSource:js injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:YES];
// 根据生成的WKUserScript对象，初始化WKWebViewConfiguration
WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init]; [config.userContentController addUserScript:script]; _webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
// 加载html字符串
[_webView loadHTMLString:@"<head></head><img src='http://www.nsu.edu.cn/v/2014v3/img/background/3.jpg' />"baseURL:nil];
[self.view addSubview:_webView];
```

## 五、作为 cell 自适应行高

![2.gif](https://storage2.cuntuku.com/2017/05/27/2.gif)

- 在 didFinishNavigation 方法中获取行高，然后刷新表格，网上资料所说的获取 webview.scrollview.contentsize.height 本人测试不可行，此处采用调用 js 通过 ajax 获取高度

```objc
// 页面加载完成之后调用 此方法会调用多次
- (void)webView:(WKWebView *)webView didFinishNavigation:(null_unspecified WKNavigation *)navigation {
    __block CGFloat webViewHeight;
    self.height = webView.frame.size.height;
    //获取内容实际高度（像素）@"document.getElementById(\"content\").offsetHeight;"
    [webView evaluateJavaScript:@"document.body.scrollHeight" completionHandler:^(id _Nullable result,NSError * _Nullable error) {
    // 此处js字符串采用scrollHeight而不是offsetHeight是因为后者并获取不到高度，看参考资料说是对于加载html字符串的情况下使用后者可以，但如果是和我一样直接加载原站内容使用前者更合适
        //获取页面高度，并重置webview的frame
        webViewHeight = [result doubleValue];
        NSLog(@"%f",webViewHeight);
        dispatch_async(dispatch_get_main_queue(), ^{
            if (webViewHeight != self.height) {
                webView.frame = CGRectMake(0, 0, self.view.frame.size.width, webViewHeight);
                [self.tableView reloadData];

            }
        });
    }];

    NSLog(@"结束加载");

}
```

- 此处完成之后需要在 heightforrow 方法中设置 cell 的高为 webview 的高，但是会出现一个问题就是内容显示不全。还需要调用下面这个方法进行重布局

```objc
- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    if ([scrollView isKindOfClass:[self.tableView class]]) {

        [self.webView setNeedsLayout];
    }
}
```

## 六、小结

> 自适应行高是本文的重点，是我自己试验了多种方法之后确定可行的方法

> 下篇文章将介绍拦截 url 进行原生跳转
