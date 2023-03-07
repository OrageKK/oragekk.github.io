---
title: "WKWebView拦截URL"
date: 2017-05-27
category:
  - iOS
tag:
  - iOS
---

> 本文介绍使用 WKWebView 拦截 url 进行原生界面跳转

![3.gif](https://storage1.cuntuku.com/2017/05/27/3.gif)

- 使用代理方法 decidePolicyForNavigationAction

```objc
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    // 获取完整url并进行UTF-8转码
    NSString *strRequest = [navigationAction.request.URL.absoluteString stringByRemovingPercentEncoding];
    if ([strRequest hasPrefix:@"app://"]) {
        // 拦截点击链接
        [self handleCustomAction:strRequest];
        // 不允许跳转
      	decisionHandler(WKNavigationActionPolicyCancel);
    }else {
    	// 允许跳转
        decisionHandler(WKNavigationActionPolicyAllow);

    }
}
```

- 自定义方法传过来 url 进行判断，需要 html 元素本身就有跳转链接，才可以拦截，如没有，拦截不到。下文 app://xxx 链接为自定义链接

```objc
- (void)handleCustomAction:(NSString *)URL
{
    // 判断跳转
    NSString *link_id = @"";
    if ([URL hasPrefix:@"app://video"]) {
        // 视频
        MMLog(@"点击了视频%@",link_id);
    }else if ([URL hasPrefix:@"app://item"]) {
        // 单品
        MMLog(@"点击了单品%@",link_id);
    }else if ([URL hasPrefix:@"app://brand"]) {
        // 品牌
        link_id = [URL substringFromIndex:[NSString stringWithFormat:@"app://brand"].length];
        MMLog(@"点击了品牌%@",link_id);
    }
}
```
