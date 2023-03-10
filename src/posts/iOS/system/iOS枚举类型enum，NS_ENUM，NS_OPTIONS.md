---
title: "OC 中的枚举类型"
date:  2017-01-06 11:19:16
category:
  - iOS
tag:
  - iOS
  - Objectiv-C语法  
---

>进入正题，今天介绍一下objective-c中的枚举

### 提要
- 首先要知道的是,枚举值 它是一个整形(int) 并且,它不参加内存的占用和释放 枚举定义变量即可直接使用,不用初始化
- 三种类型的枚举
  - **enum** 在iOS6之前一般我们采用C风格的enum关键字可以定义枚举类型
 
  在iOS6之后引入两个宏来定义枚举实际上是将enum定义和typedef合二为一，并且采用不同的宏来从代码角度来区分。
  
  - **NS_ENUM**  普通枚举定义可参见UIKit.Framework中
  
  - **NS_OPTIONS**  位运算及特殊枚举的定义。什么时候要用到这种方式呢? 那就是一个枚举变量可能要代表多个枚举值的时候. 其实给一个枚举变量赋予多个枚举值的时候,原理只是把各个枚举值加起来罢了. 当加起来以后,就获取了一个新的值,那么为了保证这个值的唯一性,这个时候就体现了位运算的重要作用. 位运算可以确保枚举值组合的唯一性. 因为位运算的计算方式是将二进制转换成十进制,也就是说,枚举值里面存取的是 计算后的十进制值. 打个比方: 通过上面的位运算方式设定好枚举以后,打印出来的枚举值分别是: 1 2 4 8 16 这5个数字,无论你如何组合在一起,也不会产生两个同样的数字.

  这两个宏的定义在Foundation.framework的NSObjCRuntime.h中：

``` objc 
  		#if (__cplusplus && __cplusplus >= 201103L && (__has_extension(cxx_strong_enums) || __has_feature(objc_fixed_enum))) || (!__cplusplus && __has_feature(objc_fixed_enum))
		#define NS_ENUM(_type, _name) enum _name : _type _name; enum _name : _type
		#if (__cplusplu 
		#define NS_OPTIONS(_type, _name) _type _name; enum : _type  
		#else  
		#define NS_OPTIONS(_type, _name) enum _name : _type _name; enum _name : _type  
		#endif  
		#else  
		#define NS_ENUM(_type, _name) _type _name; enum  
				#define NS_OPTIONS(_type, _name) _type _name; enum  
		#endif  
```
### 举个🌰

``` objc
    //推荐的定义枚举类型的方式
    typedef NS_ENUM(NSInteger, RWTLeftMenuTopItemType) {
     RWTLeftMenuTopItemMain, 
     RWTLeftMenuTopItemShows,
     RWTLeftMenuTopItemSchedule 
    }; 
    typedef NS_ENUM(NSInteger, RWTGlobalConstants) { 
    RWTPinSizeMin = 1, 
    RWTPinSizeMax = 5, 
    RWTPinCountMin = 100, 
    RWTPinCountMax = 500
    }; 
    typedef NS_OPTIONS(NSInteger, Test) {

    TestA = 1, //1 1 1等于号后面必须等于1

    TestB = 1 << 1, //2 2 10 转换成 10进制 2

    TestC = 1 << 2, //4 3 100 转换成 10进制 4

    TestD = 1 << 3, //8 4 1000 转换成 10进制 8

    TestE = 1 << 4 //16 5 10000 转换成 10进制 16

    };
    //不推荐的方式
    enum GlobalConstants { 
    kMaxPinSize = 5, 
    kMaxPinCount = 500
    };
```
> 共同学习共同进步，加油。fighting😆
