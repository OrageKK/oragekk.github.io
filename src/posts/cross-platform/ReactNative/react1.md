---
title: "ReactNative介绍"
description: "前置知识点介绍"
date: 2019-08-24 09:38:39
order: 1
category:
  - 前端跨平台
tag:
  - 前端
  - React Native
---

> ReactNative 是 Facebook 开发的一套用于开发跨平台 App 的技术框架
>
> 相比传统开发方式解决了一些痛点：
>
> 1.难以复用
>
> 2.多平台多次开发
>
> 3.效率低下
>
> 效率带来的缺点也可想而知就是一些原生可以实现的复杂操作，RN 做不到

## 前置知识

React Native 看起来很像 React，只不过其基础组件是原生组件而非 web 组件。要理解 React Native 应用的基本结构，首先需要了解一些基本的 React 的概念，比如 JSX 语法、组件、`state`状态以及`props`属性。如果你已经了解了 React，那么还需要掌握一些 React Native 特有的知识，比如原生组件的使用。

## 语言选择

typeScript 是[JavaScript](https://baike.baidu.com/item/JavaScript)的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的[面向对象编程](https://baike.baidu.com/item/面向对象编程)。

本次开发使用 typeScript 作为 ReactNative 的开发语言，对比 JavaScript 有一些优势

#### 一、ts 的静态检查

参考[为什么要使用 TypeScript？有哪些情景请简单介绍一下，或者来个例子?](https://www.zhihu.com/question/64563945)
TS 对 JS 的改进主要是静态类型检查，静态类型检查有何意义？标准答案是“静态类型更有利于构建大型应用”。为什么静态类型有利于构建大型应用？我总结，利在两点。

其一，静态类型检查可以做到 early fail，即你编写的代码即使没有被执行到，一旦你编写代码时发生类型不匹配，语言在编译阶段（解释执行也一样，可以在运行前）即可发现。针对大型应用，测试调试分支覆盖困难，很多代码并不一定能够在所有条件下执行到。而假如你的代码简单到任何改动都可以从 UI 体现出来，这确实跟大型应用搭不上关系，那么静态类型检查确实没什么作用。

配合 vscode 的**TSLint**插件可以很好的实现静态语法检查

#### 二、 类型就是最好的注释。

静态类型对阅读代码是友好的，针对大型应用，方法众多，调用关系复杂，不可能每个函数都有人编写细致的文档，所以静态类型就是非常重要的提示和约束。而假如你的代码像 jQuery 这样所有函数基本全是 API，根本没什么内部函数，而且逻辑关系看起来显而易见，这确实跟大型应用搭不上关系，那么静态类型对阅读代码确实也没什么帮助。总的来说，现代编程语言设计，很多特性已经有非常成熟的理论支持了，如果我们重视计算机基础，那么一些语言的适用场景就像是拼积木，可以用几句话概括。像是 TS 对 JS 这样，只是单一特性变化。

#### PS:typeScript 本质上还是一个解释执行的脚本语言，和 JavaScript 一样没有编译过程

同时也不是强类型语言，**是「静态类型检查」的「弱类型」**语言

真正的强类型语言有：java，swift，C#

#### 三、 其他语法特性

1. TypeScript 工具使重构更变的容易、快捷。

2. TypeScript 引入了 JavaScript 中没有的“类”概念。

3. 引入了 public，private，protected 访问控制符代替下划线私有

4. 支持泛型和命名空间

5. TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。

6. 支持接口的定义

   ……

## JSX

[JSX](https://facebook.github.io/jsx/)是一种嵌入式的类似 XML 的语法。 它可以被转换成合法的 JavaScript，尽管转换的语义是依据不同的实现而定的。 JSX 因[React](https://reactjs.org/)框架而流行，但也存在其它的实现。 TypeScript 支持内嵌，类型检查以及将 JSX 直接编译为 JavaScript。

想要使用 JSX 必须做两件事：

1. 给文件一个`.tsx`扩展名
2. 启用`jsx`选项

TypeScript 具有三种 JSX 模式：`preserve`，`react`和`react-native`。 这些模式只在代码生成阶段起作用 - 类型检查并不受影响。 在`preserve`模式下生成代码中会保留 JSX 以供后续的转换操作使用（比如：[Babel](https://babeljs.io/)）。 另外，输出文件会带有`.jsx`扩展名。 `react`模式会生成`React.createElement`，在使用前不需要再进行转换操作了，输出文件的扩展名为`.js`。 `react-native`相当于`preserve`，它也保留了所有的 JSX，但是输出文件的扩展名是`.js`。

参考资料：

[官方文档](https://reactnative.cn/docs/layout-props/#justifycontent)

[typeScriptg 中文文档](https://www.tslang.cn/docs/home.html)

[ReactNative 入门与进阶](https://www.imooc.com/video/14286)

[https://docs.nativebase.io ](<[https://docs.nativebase.io](https://docs.nativebase.io/)>)
