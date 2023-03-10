---
title: "AFNetworking A memory leak"
date: 2017-01-19
category:
  - iOS
tag:
  - iOS
  - Bug录
---

> 细心的你是否也发现了 AFN 的内存泄漏的问题了呢.

### 解决方法

```objc
    + (AFHTTPSessionManager *)sharedHTTPSession{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [AFHTTPSessionManager manager];
        manager.requestSerializer.timeoutInterval = 30;
        [manager.requestSerializer  setValue:@"XMLHttpRequest" forHTTPHeaderField:@"X-Requested-With"];
    });
    return manager;
    }

    + (AFURLSessionManager *)sharedURLSession{
    static dispatch_once_t onceToken2;
    dispatch_once(&onceToken2, ^{
        urlsession = [[AFURLSessionManager alloc] initWithSessionConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    });
    return urlsession;
    }
```

> 将有问题的语句全部替换成单例后，再用 instruments 检查，再也没有出现泄漏的红叉了。O(∩_∩)O 哈哈~
