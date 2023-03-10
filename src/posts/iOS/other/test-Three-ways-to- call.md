---
title: "Test Three ways to call"
date: 2016-11-12 12:31:17
category:
  - iOS
tag:
  - iOS
---

# LabelPhoneNum

使用 YYtext 实现 label 中的某些文字点击拨打电话---[Github](https://github.com/OrageKK/LabelPhoneNum)

## 真机测试结果

#### 设备型号：iphone6s

#### 系统:10.1.1

#### Xcode 版本：8.1

### 三种打电话的方法

> 方法一:网上说使用此方法，电话结束后进入联系人列表，测试结果为：正常，电话结束后返回程序

```objc
    +(void)callPhoneOne:(NSString *)phoneNum{
    UIApplication *application = [UIApplication sharedApplication];
    /*--------拨号方法一-----------*/
    // 使用此方法，电话结束后进入联系人列表
    NSString *num1 = [NSString stringWithFormat:@"tel://%@",phoneNum];
    [application openURL:[NSURL URLWithString:num1] options:@{} completionHandler:^(BOOL success) {}];
    }
```

> 方法二：测试结果为先弹窗后拨打，呼叫结束后返回程序，是否可以通过审核无法确认

```objc
    +(void)callPhoneTwo:(NSString *)phoneNum{
    UIApplication *application = [UIApplication sharedApplication];
        /*--------拨号方法二-----------*/
        //这个方法则打电话前先弹框  是否打电话 然后打完电话之后回到程序中 网上说这个方法可能不合法 无法通过审核
        NSString *num2 = [NSString stringWithFormat:@"telprompt://%@",phoneNum];
        [application openURL:[NSURL URLWithString:num2] options:@{} completionHandler:^(BOOL success) {}];

    }
```

> 方法三：调用 UIWebView 进行呼叫功能，测试结果为：弹窗速度稍慢，电话挂掉之后返回程序

```objc
    // 要在出发呼叫功能前不被release需要强引用
    @property (nonatomic,strong) UIWebView *phoneCallWebView;
    #pragma mark - 拨号方法三，会稍微慢于前两种方法
    - (void)callPhoneThree:(NSString *)phoneNum{
    /*--------拨号方法三-----------*/
    NSURL *phoneURL = [NSURL URLWithString:[NSString stringWithFormat:@"tel://%@",phoneNum]];
    if ( !_phoneCallWebView ) {

        _phoneCallWebView = [[UIWebView alloc] initWithFrame:CGRectZero];// 这个webView只是一个后台的容易 不需要add到页面上来  效果跟方法二一样 但是这个方法是合法的
    }
    [_phoneCallWebView loadRequest:[NSURLRequest requestWithURL:phoneURL]];
   }
```

- 总结来说除了第二种不知是否可以通过审核，其余方法均可实现呼叫并返回程序功能。

- 只是第一种方法爱需要手动弹出 AlertViewController；
- 第三种方法优势在于可以自动识别电话格式并弹窗，如号码为:01088867777 弹窗为 010-88867777。并且代码相对于第一种来说极为精简，少了自定义 AlertViewController 的步骤
