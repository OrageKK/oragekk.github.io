---
date: 2016-12-26 13:39:59
category:
  - iOS
tag:
  - iOS
---

# Runloop

### Runloop 是什么

- Runloop 是事件接收和分发机制的一个实现。
  - Runloop 提供了一种异步执行代码的机制，不能并行执行任务。
  - 在主队列中，Main RunLoop 直接配合任务的执行，负责处理 UI 事件、定时器以及其他内核相关事件。

###Runloop 的主要目的

- 保证执行程序的线程不会被终止

###什么时候使用 Runloop

- 当需要和该线程进行交互的时候才会使用 Runloop

- 每一个线程都有其对应的 RunLoop，但是默认非主线程的 RunLoop 是没有运行的，需要为 RunLoop 添加至少一个事件源，然后去 run 它。

- 一般情况下我们是没有必要去启用线程的 RunLoop 的，除非你在一个单独的线程中需要长久的检测某个事件。

- 主线程 默认有 Runloop。当自己启动一个线程，如果只是用于处理单一的事件，则该线程在执行完之后就退出了。所以当我们需要让该线程监听某项事务时，就得让线程一直不退出，runloop 就是这么一个循环，没有事件的时候，一直卡着，有事件来临了，执行其对应的函数。

---

> _Runloop，正如其名所示，是线程进入和被线程用来响应事件以及调用事件处理函数的地方。需要在代码中使用控制语句实现 run loop 的循环，也就是说，需要代码提供 while 或者 for 循环来驱动 run loop。_

在这个循环中使用一个 Runloop 对象`[NSRunloop currentRunloop]`执行接收消息，调用对应的处理函数。

- Runloop 接收两种源事件:`input sources`和`timer sources`。

- input sources  传递异步事件，通常是来自其他线程和不同的程序中的消息；

- timer sources(定时器)  传递同步事件（重复执行或者在特定时间上触发）。

- 除了处理`input sources`，Runloop 也会产生一些关于本身行为的`notificaiton`。注册成为 Runloop 的`observer`，可以接收到这些 notification，做一些额外的处理。（使用`CoreFoundation`来成为 runloop 的 observer）。

###Runloop 特性

- 当有事件发生时，Runloop 会根据具体的事件类型通知应用程序作出响应；

- 当没有事件发生时，Runloop 会进入休眠状态，从而达到省电的目的；

- 当事件再次发生时，Runloop 会被重新唤醒，处理事件。

- iOS 中所有的事件监听全部由运行循环负责
- 主线程的  RunLoop 在应用启动的时候就会自动创建
- 其他线程则需要在该线程下自己启动
- 不能自己创建  RunLoop
- RunLoop 并不是线程安全的，所以需要避免在其他线程上调用当前线程的 RunLoop
- RunLoop 负责管理  `autorelease pools`
- RunLoop 负责处理消息事件，即输入源事件、计时器事件和网络请求事情

###应用场景

- 创建常驻线程，执行一些会一直存在的任务。该线程的生命周期跟  App
    相同
  @autoreleasepool {
  NSLog(@"%@", [NSThread currentThread]);
  NSRunLoop \*runLoop = [NSRunLoop currentRunLoop];
  // 只有添加端口后，才能能够保证运行循环持续运行
  [runLoop addPort:[NSMachPort port] forMode:NSDefaultRunLoopMode];
  [runLoop run];

           // 线程结束之前，不会执行至此
           NSLog(@"%@", [NSThread currentThread]);
        }

- 维护线程的生命周期，让线程不自动退出，`isFinished`
    为  `Yes`时退出
- 在一定时间内监听某种事件，或执行某种任务的线程

---

> ####提示：一般在开发中很少会主动创建 Runloop，而通常会把事件添加到 Runloop 中。

###参考文章
[官方文档](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/Multithreading/RunLoopManagement/RunLoopManagement.html#//apple_ref/doc/uid/10000057i-CH16-SW23)
[深入理解 Runloop](http://blog.ibireme.com/2015/05/18/runloop/)
[Runloop 原理和核心机制](http://www.cnblogs.com/zy1987/p/4582466.html)
