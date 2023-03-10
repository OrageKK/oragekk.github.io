---
title: "iOS Cookie的配置及使用"
date: 2017-07-05
category:
  - iOS
tag:
  - iOS
---

> 本文介绍 iOS 中 cookie 的使用包含 AFNetWorking 3.0 中的使用，常用于登录状态信息保存

## 什么是 Cookies？

Cookie 是由服务器保存在用户浏览器（客户端）上的一块数据，它可以包含有关用户的信息,比如果登陆的状态，用户标识等。
Cookie 有什么作用？

主要用在以下三个方面:

- 会话状态管理（如用户登录状态、购物车）

- 个性化设置（如用户自定义设置）

- 浏览器行为跟踪（如跟踪分析用户行为）

## cookie 的处理步骤

- 服务器向客户端发送 cookie
- 通常使用 HTTP 协议规定的 Set-Cookie 头操作。
- 规范规定 cookie 的格式为 name = value 格式，且必须包含这部分。
- 浏览器将 cookie 保存
- 每次请求浏览器都会将 cookie 发向服务器

其他可选的 cookie 参数会影响将 cookie 发送给服务器端的过程，主要有以下几种：

| key      | 是否可选 |                                                                                                                     value |
| -------- | :------: | ------------------------------------------------------------------------------------------------------------------------: |
| name     |    T     |                                                                                                                       xxx |
| value    |    T     |                                                                                                                       xxx |
| path     |    F     |                                                                                                                      路径 |
| expires  |    F     |                                                                                                              UTC 格式时间 |
| maxAge   |    F     |                                                                                            是 cookie 多久后过期的相对时间 |
| secure   |    F     |                                                                      为 true 时 cookie 在 HTTP 中是无效 在 HTTPS 中才有效 |
| httpOnly |    F     | 浏览器不允许脚本操作 document.cookie 去更改 cookie。一般情况下都应该设置这个为 true，这样可以避免被 xss 攻击拿到 cookie。 |

## Cookies 长什么样子？

当服务器收到 HTTP 请求时，可以在响应头里面增加一个 Set-Cookie 头部。浏览器收到响应之后会取出 Cookie 信息并保存，之后对该服务器每一次请求中都通过 Cookie 请求头部将 Cookie 信息发送给服务器。大概都长的都是这个格式：

`Set-Cookie: <cookie名称>=<cookie值>`

所以一个简单的 Cookie 像这样：

`language=zh_CN; expires=Sat, 05-Aug-2017 08:21:16 GMT; Max-Age=2592000; path=/; domain=192.75.17.211:6603`

## 在 iOS 中使用 Cookies

- NSHTTPCookieStorage 这个类就是一个单例，它的主要任务就是管理 Cookies, 增删改查等各种
- NSURLRequest NSURLRequest 是 HTTP 请求协议 URL 资源的消息对象 Request
- NSHTTPURLResponse

  NSHTTPURLResponse 是 HTTP 协议请求 URL 资源的响应消息对象。这个对象将 HTTP 协议的序列化了，可以很方便的获得的状态码(statusCode)，消息报头(allHeaderFields)等信息

## 开始手动管理 Cookies

- 从 NSHTTPURLResponse 获取服务器发给我们的 Cookie,**此种方式获取的是 Headers 中的**

```objc
NSHTTPURLResponse* response = (NSHTTPURLResponse* )task.response;
    NSDictionary *allHeaderFieldsDic = response.allHeaderFields;
    NSString *setCookie = allHeaderFieldsDic[@"Set-Cookie"];
    if (setCookie != nil) {
         NSString *cookie = [[setCookie componentsSeparatedByString:@";"] objectAtIndex:0];
         NSLog(@"cookie : %@", cookie); // 这里可对cookie进行存储
    }
```

![cookie12x.png](https://storage1.cuntuku.com/2017/07/06/cookie12x.png)

- 从 NSHTTPCookieStorage 获取想要 Cookie，**此种获取方式是获取的 cookies 中的**

```objc
//获取cookie
    NSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage]cookiesForURL:[NSURL URLWithString:[NSString stringWithFormat:@"%@%@",kBaseURL,[NSString stringWithFormat:@"/index.php?route=mapi/%@",urlstring]]]];
    for (NSHTTPCookie *tempCookie in cookies)
    {
        //打印cookies
        NSLog(@"getCookie:%@",tempCookie);
    }
    NSDictionary *Request = [NSHTTPCookie requestHeaderFieldsWithCookies:cookies];

    NSUserDefaults *userCookies = [NSUserDefaults standardUserDefaults];

    [userCookies setObject:[Request objectForKey:@"Cookie"] forKey:@"cookie"];
    [userCookies synchronize];
```

![cookie22x.png](https://storage2.cuntuku.com/2017/07/06/cookie22x.png)

- 清除 Cookie

```objc
NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSArray *_tmpArray = [NSArray arrayWithArray:[cookieStorage cookies]];
    for (id obj in _tmpArray) {
        [cookieStorage deleteCookie:obj];
    }
```

## 使用 AFNetworking 时，对 Cookies 管理的示例

- AFNetworking 3.0 默认是保存 cookies 的。
- 模拟登录，保存 cookie 以及设置 cookie:
-

```objc
NSURLSessionConfiguration *sessionConfiguration = [NSURLSessionConfiguration defaultSessionConfiguration];
    AFHTTPSessionManager *httpManager = [[AFHTTPSessionManager alloc] initWithBaseURL:[NSURL URLWithString:@"hostURL"] sessionConfiguration:sessionConfiguration];
    AFHTTPRequestSerializer *requestSerialization = [AFHTTPRequestSerializer serializer];
    requestSerialization.timeoutInterval = 15;

    // 设置自动管理Cookies
    requestSerialization.HTTPShouldHandleCookies = YES;

    // 如果已有Cookie, 则把你的cookie符上
    NSString *cookie = [[NSUserDefaults standardUserDefaults] objectForKey:@"Set-Cookie"];
        if (cookie != nil) {
            [requestSerialization setValue:cookie forHTTPHeaderField:@"Set-Cookie"];
        }

    // 安全策略
    AFSecurityPolicy *securityPolicy = [AFSecurityPolicy policyWithPinningMode:AFSSLPinningModeNone];
    securityPolicy.allowInvalidCertificates = YES;
    securityPolicy.validatesDomainName = NO;

    [httpManager POST:@"logInURL"
           parameters:nil
             progress:NULL
              success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                  if ([responseObject[@"status"] isEqualToString:@"SUCCESS"]) {
                      //获取 Cookie
                      NSHTTPURLResponse* response = (NSHTTPURLResponse* )task.response;
                      NSDictionary *allHeaderFieldsDic = response.allHeaderFields;
                      NSString *setCookie = allHeaderFieldsDic[@"Set-Cookie"];
                      if (setCookie != nil) {
                          NSString *cookie = [[setCookie componentsSeparatedByString:@";"] objectAtIndex:0];
                          // 这里对cookie进行存储
                          [[NSUserDefaults standardUserDefaults] setObject:cookie forKey:@"cookie"];
                      }
                  }else{
                      // 登录失败
                  }
              }
              failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
                  NSString *errorMessage = error.userInfo[@"NSLocalizedDescription"];
              }];
```
