---
title: "vuepress-plugin-meting2"
icon: "plugin"
description: "支持vuepress2.x的音乐播放器"
date: 2023-10-11
star: true
isOriginal: true
category:
  - 开源软件
  - GitHub
tag:
  - GitHub
---
## 前言
嘿~
:cake::cake::cake: 播放器有了，撒花✿✿ヽ(°▽°)ノ✿:tada::tada::tada:
<p align="center">
   <a href="https://www.npmjs.com/package/vuepress-plugin-meting2" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/vuepress-plugin-meting2.svg"></a>&nbsp
   <a href="https://github.com/moefyit/vuepress-plugin-meting2/stargazers" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oragekk/vuepress-plugin-meting2"></a>&nbsp
   <a href="https://www.npmjs.com/package/vuepress-plugin-meting2" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/vuepress-plugin-meting2.svg"></a>&nbsp
   <a href="https://www.npmjs.com/package/vuepress-plugin-meting2" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/vuepress-plugin-meting2.svg"></a>&nbsp
   <a href="https://github.com/oragekk/vuepress-plugin-meting2/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/oragekk/vuepress-plugin-meting2"></a>
</p>

文档👉🏻戳这里[文档](https://github.com/OrageKK/vuepress-plugin-meting2)

## 介绍
借鉴了[vuepress-plugin-sbaudio](https://github.com/u2sb/vuepress-plugin-sbaudio)和[vuepress-plugin-meting](https://github.com/moefyit/vuepress-plugin-meting) 在此表示感谢 <Badge text="Thanks" type="warning" />

借鉴MetingJS解析和使用APlayer作为播放组件

## 安装很方便
::: code-tabs
@tab npm
```bash
npm i vuepress-plugin-meting2 -D
```

@tab pnpm
```bash
pnpm add vuepress-plugin-meting2 -D
```
:::


## 使用也很方便
```javascript
plugins: [
    metingPlugin({
      metingOptions: {
        global:true, // 开启关闭全局播放器
        server: "tencent",
        api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        type: "playlist",
        mid: "851947617",
      },
    }),
];
```
### 可作为组件引入
<Meting auto="https://y.qq.com/n/ryqq/songDetail/003UTVCN0QvffG" api="https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r"/>

### 也可作为全局播放器引入
全局引入目前和看板娘有些重叠，还没有处理，先把开关关了