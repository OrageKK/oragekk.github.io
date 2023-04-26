---
title: "Dart 中的并发"
icon: "asynchronous"
date: 2023-04-26
cover: "https://w.wallhaven.cc/full/72/wallhaven-7286w9.png"
category:
  - Flutter
  - Dart
tag:
  - Dart
---

Dart 通过 async-await、isolate 以及一些异步类型概念（例如 `Future` 和 `Stream`）支持了并发代码编程。本篇文章会对 async-await、`Future` 和 `Stream` 进行简略的介绍，而侧重点放在 isolate 的讲解上。

在应用中，所有的 Dart 代码都在 **isolate** 中运行。每一个 Dart 的 isolate 都有独立的运行线程，它们无法与其他 isolate 共享可变对象。在需要进行通信的场景里，isolate 会使用消息机制。很多 Dart 应用都只使用一个 isolate，也就是 main isolate。你可以创建额外的 isolate 以便在多个处理器核心上执行并行代码。

尽管 Dart 的 isolate 模型设计是基于操作系统提供的进程和线程等更为底层的原语进行设计的， Dart 虚拟机对其的使用是一个具体的实现，在本篇文章中，我们不对其具体实现展开讨论。

## 异步的类型和语法

如果你已经对 `Future`、`Stream` 和 async-await 比较熟悉了，可以直接跳到 [isolate 部分](https://dart.cn/guides/language/concurrency#how-isolates-work) 进行阅读。

### Future 和 Stream 类型

Dart 语言和库通过 `Future` 和 `Stream` 对象，来提供会在当前调用的未来返回某些值的功能。以 JavaScript 中的 Promise 为例，在 Dart 中一个最终会返回 `int` 类型值的 promise，应当声明为 `Future<int>`；一个会持续返回一系列 `int` 类型值的 promise，应当声明为 `Stream<int>`。

让我们用 dart:io 来举另外一个例子。`File` 的同步方法 [`readAsStringSync()`](https://api.dart.cn/stable/dart-io/File/readAsStringSync.html) 会以同步调用的方式读取文件，在读取完成或者抛出错误前保持阻塞。这个会返回 `String` 类型的对象，或者抛出异常。而与它等效的异步方法 [`readAsString()`](https://api.dart.cn/stable/dart-io/File/readAsString.html)，会在调用时立刻返回 `Future<String>` 类型的对象。在未来的某一刻，`Future<String>` 会结束，并返回一个字符串或错误。

#### 为什么异步的代码如此重要？

It matters whether a method is synchronous or asynchronous because most apps need to do more than one thing at a time.

大部分应用需要在同一时刻做很多件事。例如，应用可能会发起一个 HTTP 请求，同时在请求返回前对用户的操作做出不同的界面更新。异步的代码会有助于应用保持更高的可交互状态。

异步场景包括调用系统 API，例如非阻塞的 I/O 操作、HTTP 请求或与浏览器交互。还有一些场景是利用 Dart 的 isolate 进行计算，或等待一个计时器的触发。这些场景要么是在不同的线程运行，要么是被系统或 Dart 运行时处理，让 Dart 代码可以在计算时同步运行。

### async-await 语法

`async` 和 `await` 关键字是用声明来定义异步函数和获取它们的结果的方式。

下面是一段同步代码调用文件 I/O 时阻塞的例子：

```dart
void main() {
  // Read some data.
  final fileData = _readFileSync();
  final jsonData = jsonDecode(fileData);

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}

String _readFileSync() {
  final file = File(filename);
  final contents = file.readAsStringSync();
  return contents.trim();
}
```

下面是类似的代码，但是变成了 **异步调用**：

```dart
void main() async {
  // Read some data.
  final fileData = await _readFileAsync();
  final jsonData = jsonDecode(fileData);

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}

Future<String> _readFileAsync() async {
  final file = File(filename);
  final contents = await file.readAsString();
  return contents.trim();
}
```

`main()` 函数在调用 `_readFileAsync()` 前使用了 `await` 关键字，让原生代码（文件 I/O）执行的同时，其他的 Dart 代码（例如事件处理器）能继续执行。使用 `await` 后，`_readFileAsync()` 调用返回的 `Future<String>` 类型也转换为了 `String`。从而在将结果 `content` 赋予变量时，隐式转换为 `String` 类型。

 **备注:**

`await` 关键字仅在函数体前定义了 `async` 的函数中有效。

如下图所示，无论是在 Dart VM 还是在系统中， Dart 代码都会在 `readAsString()` 执行非 Dart 代码时暂停。在 `readAsString()` 返回值后，Dart 代码将继续执行。

![类似于流程图的图形显示了应用程序代码从开始到退出的执行过程，在这之间等待本地I/O](https://dart.cn/guides/language/concurrency/images/basics-await.png)

如果你想了解更多关于 `async`、`await` 和 `Future` 的内容，可以访问 [异步编程 codelab](https://dart.cn/codelabs/async-await) 进行学习。

## Isolate 的工作原理

现代的设备通常会使用多核 CPU。开发者为了让程序在设备上有更好的表现，有时会使用共享内容的线程来并发运行代码。然而，状态的共享可能会 [产生竞态条件，从而造成错误](https://baike.baidu.com/l/kex6qKvt)，也可能会增加代码的复杂度。

Dart 代码并不在多个线程上运行，取而代之的是它们会在 isolate 内运行。每一个 isolate 会有自己的堆内存，从而确保 isolate 之间互相隔离，无法互相访问状态。由于这样的实现并不会共享内存，所以你也不需要担心 [互斥锁和其他锁](https://baike.baidu.com/l/My2bXiba)。

在使用 isolate 时，你的 Dart 代码可以在同一时刻进行多个独立的任务，并且使用可用的处理器核心。 Isolate 与线程和进程近似，但是==每个 isolate 都拥有独立的内存，以及运行事件循环的独立线程。==

 **Platform note:** Only the [Dart Native platform](https://dart.cn/overview#platform) implements isolates. To learn more about the Dart Web platform, see the [Concurrency on the web](https://dart.cn/guides/language/concurrency#concurrency-on-the-web) section.
:::info 平台说明
只有[Dart Native](https://dart.cn/overview#platform)平台实现了隔离器。要了解更多关于Dart网络平台的信息，请参见[Web的并发性部分](#在web的并发)。
:::
### 主 isolate

在一般场景下，你完全无需关心 isolate。通常一个 Dart 应用会在主 isolate 下执行所有代码，如下图所示：

![图中显示了一个主隔离区，它运行`main()`，对事件作出反应，然后退出](https://dart.cn/guides/language/concurrency/images/basics-main-isolate.png)

就算是只有一个 isolate 的应用，只要通过使用 async-await 来处理异步操作，也完全可以流畅运行。一个拥有良好性能的应用，会在快速启动后尽快进入事件循环。这使得应用可以通过异步操作快速响应对应的事件。

### Isolate 的生命周期

如下图所示，每个 isolate 都是从运行 Dart 代码开始的，比如 `main()` 函数。执行的 Dart 代码可能会注册一些事件监听，例如处理用户操作或文件读写。当 isolate 执行的 Dart 代码结束后，如果它还需要处理已监听的事件，那么它依旧会继续被保持。处理完所有事件后，isolate 会退出。

![一个更一般的图显示，任何隔离体都会运行一些代码，选择性地对事件做出反应，然后退出](https://dart.cn/guides/language/concurrency/images/basics-isolate.png)

### 事件处理

在客户端应用中，主 isolate 的事件队列内，可能会包含重绘的请求、点击的通知或者其他界面事件。例如，下图展示了包含四个事件的事件队列，队列会按照先进先出的模式处理事件。

![一个显示事件被逐一送入事件循环的图。](https://dart.cn/guides/language/concurrency/images/event-loop.png)

如下图所示，在 `main()` 方法执行完毕后，事件队列中的处理才开始，此时处理的是第一个重绘的事件。而后主 isolate 会处理点击事件，接着再处理另一个重绘事件。

![显示主隔离区逐一执行事件处理程序的图](https://dart.cn/guides/language/concurrency/images/event-handling.png)

如果某个同步执行的操作花费了很长的处理时间，应用看起来就像是失去了响应。在下图中，处理点击事件的代码比较耗时，导致紧随其后的事件并没有及时处理。这时应用可能会产生卡顿，所有的动画都无法流畅播放。

![图中显示了一个执行时间过长的分接处理程序](https://dart.cn/guides/language/concurrency/images/event-jank.png)

在一个客户端应用中，耗时过长的同步操作，通常会导致 [卡顿的动画](https://flutter.cn/docs/perf/rendering-performance)。而最糟糕的是，应用界面可能完全失去响应。

### 后台运行对象

如果你的应用受到耗时计算的影响而出现卡顿，例如 [解析较大的 JSON 文件](https://flutter.cn/docs/cookbook/networking/background-parsing)，你可以考虑将耗时计算转移到单独工作的 isolate，通常我们称这样的 isolate 为 **后台运行对象**。下图展示了一种常用场景，你可以生成一个 isolate，它将执行耗时计算的任务，并在结束后退出。这个 isolate 工作对象退出时会把结果返回。

![A figure showing a main isolate and a simple worker isolate](https://dart.cn/guides/language/concurrency/images/isolate-bg-worker.png)

每个 isolate 都可以通过消息通信传递一个对象，这个对象的所有内容都需要满足可传递的条件。并非所有的对象都满足传递条件，在无法满足条件时，消息发送会失败。举个例子，如果你想发送一个 `List<Object>`，你需要确保这个列表中所有元素都是可被传递的。假设这个列表中有一个 `Socket`，由于它无法被传递，所以你无法发送整个列表。

你可以查阅 [`send()` 方法](https://api.dart.cn/stable/dart-isolate/SendPort/send.html) 的文档来确定哪些类型可以进行传递。

Isolate 工作对象可以进行 I/O 操作、设置定时器，以及其他各种行为。它会持有自己内存空间，与主 isolate 互相隔离。这个 isolate 在阻塞时也不会对其他 isolate 造成影响。

## 代码示例

本节将重点讨论使用 `Isolate` API 实现 isolate 的一些示例。

### 实现一个简单的 isolate 工作对象

这些例子实现了一个主隔离器，它生成了一个简单的工作隔离器。 [`Isolate.run()`](https://api.dart.cn/dev/dart-isolate/Isolate/run.html) 简化了设置和管理工作者隔离区的步骤:

1. 生成（启动并创建）一个隔离器
2. 在生成的隔离体上运行一个函数
3. 捕获结果
4. 将结果返回给主隔离区
5. 工作完成后，终止隔离区的运行
6. 检查、捕获并将异常和错误抛回给主隔离区


:::tip 备注
如果你使用Flutter，考虑使用[Flutter的`compute()`函数](https://api.flutter-io.cn/flutter/foundation/compute-constant.html)而不是`Isolate.run()`。`compute`函数允许你的代码在[本地和非本地平台](https://dart.cn/overview#platform)上工作。当只针对原生平台时，使用`Isolate.run()`以获得更符合人类工程学的的API。
:::

#### 在一个新的隔离区中运行一个现有的方法

主 isolate 的代码如下：

```dart
void main() async {
  // Read some data.
  final jsonData = await Isolate.run(_readAndParseJson);

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

生成的隔离器会执行作为第一个参数传递的函数, `_readAndParseJson`:

```dart
Future<Map<String, dynamic>> _readAndParseJson() async {
  final fileData = await File(filename).readAsString();
  final jsonData = jsonDecode(fileData) as Map<String, dynamic>;
  return jsonData;
}
```

1. `Isolate.run()` 产生了一个隔离器，即后台工作者， 而 `main()` 则在等待结果
2. 生成的隔离器会执行传递给 `run()`的参数: the function `_readAndParseJson()`.
3. `Isolate.run()` 从返回中获取结果，并将该值送回主隔离区，从而关闭工作隔离区。
4. 工作者隔离区会将保存结果的内存*转移*到主隔离区。它并*不复制*数据。工作者隔离区会执行一个验证通道，以确保对象被允许转移。

`_readAndParseJson()` 是一个现有的异步函数，可以很容易地直接在主隔离区中运行。使用 `Isolate.run()` 来运行它，从而实现了并发性。工作者隔离区完全抽象了`_readAndParseJson()`的计算过程。它可以在不阻塞主隔离区的情况下完成。

`Isolate.run()` 的结果总是一个Future，因为主隔离区的代码仍在继续运行。工作者隔离区执行的计算是同步的还是异步的，并不影响主隔离区，因为无论如何，它都是在并发地运行。

#### Sending closures with isolates
您也可以在主隔离区中直接使用函数字面或闭包，用`run()` 创建一个简单的工作隔离区。

```dart
void main() async {
  // Read some data.
  final jsonData = await Isolate.run(() async {
    final fileData = await File(filename).readAsString();
    final jsonData = jsonDecode(fileData) as Map<String, dynamic>;
    return jsonData;
  });

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

这个例子的完成情况与前一个例子相同。一个新的隔离器产生了，计算了一些东西，并把结果送了回来。

不过，现在这个隔离体发送的是一个[闭包](https://dart.cn/guides/language/language-tour#anonymous-functions)。与典型的命名函数相比，闭包的限制较少，无论是在功能上还是在代码中的编写方式上。在这个例子中，`Isolate.run()`执行的是看起来像本地代码的东西，同时进行。在这个意义上，你可以把`run()`想象成一个 "并行运行 "的[控制流操作符](https://dart.cn/guides/language/language-tour#control-flow-statements)。

### 实现一个简单的 isolate 工作对象

`Isolate.run()` a抽取了一些较低级别的、与隔离物相关的API，以简化隔离物管理：

- [`Isolate.spawn()`](https://api.dart.cn/stable/dart-isolate/Isolate/spawn.html) and [`Isolate.exit()`](https://api.dart.cn/stable/dart-isolate/Isolate/exit.html)
- [`ReceivePort`](https://api.dart.cn/stable/dart-isolate/ReceivePort-class.html) and [`SendPort`](https://api.dart.cn/stable/dart-isolate/SendPort-class.html)


您可以直接使用这些基元来对隔离区的功能进行更精细的控制。例如，`run()`在返回一条消息后就会关闭其隔离区。如果您想允许多个消息在隔离区之间传递，该怎么办呢？您可以用与`run()`的实现方式大致相同的方式来设置自己的隔离区，只是以稍微不同的方式利用`SendPort`的[`send()`方法](https://api.dart.cn/stable/dart-isolate/SendPort/send.html)。

如果你想在 isolate 之间建立更多的通信，那么你需要使用 `SendPort` 的 [`send()` 方法](https://api.dart.cn/stable/dart-isolate/SendPort/send.html)。下图展示了一种常见的场景，主 isolate 会发送请求消息至 isolate 工作对象，然后它们之间会继续进行多次通信，进行请求和回复。

![图中显示了主隔离器催生隔离器，然后发送请求消息，工作隔离器用回复消息进行响应；显示了两个请求-回复循环。](https://dart.cn/guides/language/concurrency/images/isolate-custom-bg-worker.png)

下方列举的 [isolate 示例](https://github.com/dart-lang/samples/tree/master/isolates) 包含了发送多次消息的使用方法：

- [send_and_receive.dart](https://github.com/dart-lang/samples/tree/master/isolates/bin/send_and_receive.dart) 展示了如何从主 isolate 发送消息至生成的 isolate，与前面的示例较为接近，不过没有使用 `run()` 方法；
- [long_running_isolate.dart](https://github.com/dart-lang/samples/tree/master/isolates/bin/long_running_isolate.dart) 展示了如何生成一个长期运行、且多次发送和接收消息的 isolate。

## 性能和 isolate 组

当一个 isolate 调用了 [`Isolate.spawn()`](https://api.dart.cn/stable/dart-isolate/Isolate/spawn.html)，两个 isolate 将拥有同样的执行代码，并归入同一个 **isolate 组** 中。 Isolate 组会带来性能优化，例如新的 isolate 会运行由 isolate 组持有的代码，即共享代码调用。同时，`Isolate.exit()` 仅在对应的 isolate 属于同一组时有效。

某些场景下，你可能需要使用 [`Isolate.spawnUri()`](https://api.dart.cn/stable/dart-isolate/Isolate/spawnUri.html)，使用执行的 URI 生成新的 isolate，并且包含代码的副本。然而，`spawnUri()` 会比 `spawn()` 慢很多，并且新生成的 isolate 会位于新的 isolate 组。另外，当 isolate 在不同的组中，它们之间的消息传递会变得更慢。


:::tip 备注
![Flutter logo](https://dart.cn/assets/img/shared/flutter/icon/64.png =20x)Flutter 不支持 `Isolate.spawnUri()`。
:::

## 在Web的并发

所有的Dart应用程序都可以使用`async-await`、`Future`和`Stream`进行非阻塞、交错的计算。然而，[Dart web 平台]((https://dart.cn/overview#platform))并不支持隔离器。Dart网络应用程序可以使用网络工作者在后台线程中运行脚本，这与隔离程序类似。不过，[web workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers)的功能和能力与隔离器有些不同。

例如，当Web工作者在线程之间发送数据时，他们会来回复制数据。不过，数据复制的速度可能非常慢，尤其是对于大的消息。隔离器也做同样的事情，但也提供了API，可以更有效地传输保存消息的内存。

创建Web Worker和Isolates也有不同。你只能通过声明一个单独的程序入口并单独编译来创建网络工作者。启动Web Worker类似于使用`Isolate.spoonUri`来启动一个隔离器。您也可以使用`Isolate.spown`来启动一个隔离器，这需要的资源较少，因为它[重用了一些与催生隔离器相同的代码和数据](https://dart.cn/guides/language/concurrency#performance-and-isolate-groups)。Web Worker没有一个同等的API。