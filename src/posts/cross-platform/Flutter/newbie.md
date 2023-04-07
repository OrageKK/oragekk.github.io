---
title: "Flutter 基础大集合"
description: Flutter初学，demo
icon: "hk-flutter"
date: 2023-03-20
star: true
category:
  - Flutter
  - 前端跨平台
tag:
  - Flutter
---

:::tip
把之前学习时候写的demo拿出来记录一下
地址：
[flutter_my_app](https://github.com/OrageKK/flutter_my_app)
:::

demo是照着B站的视频敲的，现在可能用不上了，但是还是觉得当时写的demo对于想学习flutter的新手来说作用还是有的，因为视频课程很零散，所以我边看边写了一个app，里边基本介绍了大部分基础的用法，当然进阶的东西，这部分demo是没有的，最近也在忙，有空了再补一部分进阶的东西吧

现在在做的内容是native+flutter混编，其中坑也不少，有时间会慢慢记录一下



## 预览
![home](https://s3.bmp.ovh/imgs/2023/03/20/b4d8d0a22fcdfd1a.png =500x)

![side](https://s3.bmp.ovh/imgs/2023/03/20/a4e70357270289d9.png =500x)

![animation](https://s3.bmp.ovh/imgs/2023/03/20/88359eef4b2eee2f.png =500x)

![search](https://s3.bmp.ovh/imgs/2023/03/20/a1e88c9565dd0831.png =500x)

![alert](https://s3.bmp.ovh/imgs/2023/03/20/5e6fe8f921ad4079.png =500x)



## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## 包含
- 路由管理
- 基础组件（Text、Image、Icon）
- 布局组件
  - 容器组件Container
  - 线性布局Row、Column
  - 弹性布局Flex
  - 流式布局Wrap
  - 层叠布局Stack、Positioned
  - 对齐与相对定位Align
- 容器类组件
  - 填充Padding
  - 装饰容器DecoratedBox
  - 变换Transform
  - 剪裁Clip
  - 页面骨架Scaffold、AppBar
  - 抽屉菜单Drawer
  - 底部Tab导航
  - 页面body
- 可滚动组件
  - GridView
  - ListView
  - TabBarView
  - CustomScrollView 和 Slivers
- 动画
  - 隐式动画
  - 显式动画
  - 交错动画
  - 动画切换组件（AnimatedSwitcher）

## 使用库

- fluttertoast: ^8.0.9
- cached_network_image: ^3.2.2
