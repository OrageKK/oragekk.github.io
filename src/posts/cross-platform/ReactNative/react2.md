---
title: "ReactNative开发环境配置，ES6语法介绍"
description: "ReactNative开发环境配置，ES6语法介绍"
date: 2019-08-25
order: 2
category:
  - 前端跨平台
tag:
  - 前端
  - React Native
---

> 接上篇 [ReactNative介绍](/posts/ReactNative/react1.html)

## 创建 ReactNative 项目

#### 环境配置

```shell
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react-native
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

#### 配置 rn-cli.config.js

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

#### Create our new project

`react-native init AwesomeProject`

`cd AwesomeProject
react-native run-ios`

#### 项目结构图

```shell
my-app/
├─ .gitignore
├─ images.d.ts
├─ node_modules/
├─ public/
├─ src/
│  └─ ...
├─ package.json
├─ tsconfig.json
├─ tsconfig.prod.json
├─ tsconfig.test.json
└─ tslint.json
```

- `tsconfig.json` 包含我们项目的 TypeScript 特定选项。
- `package.json` 包含我们的依赖项，以及我们想要运行的命令的一些快捷方式，用于测试，预览和部署我们的应用程序。
- `public`包含静态资产，例如我们计划部署到的 HTML 页面或图像。您可以删除此文件夹中的任何文件`index.html`。
- `src`包含我们的 TypeScript 和 CSS 代码。`index.tsx`是我们文件的入口点，并且是强制性的。
- `images.d.ts`将告诉 TypeScript 可以使用某些类型的图像文件`import`，create-react-app 支持这些文件。

#### 添加 TypeScript 配置文件

我们想将 TypeScript 文件整合到一起 - 这包括我们写的源码和必要的声明文件。

我们需要创建一个`tsconfig.json`文件，它包含了输入文件列表以及编译选项。 在工程根目录下新建文件`tsconfig.json`文件，添加以下内容：

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": ["./src/**/*"]
}
```

你可以在[这里](https://www.tslang.cn/docs/handbook/tsconfig-json.html)了解更多关于`tsconfig.json`文件的说明。

#### 运行

`npm run start`

`npm run test`

## 组件

示例代码

```typescript
import React, { Component } from "react";
import { Text, View } from "react-native";

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}
```

示例中的这一行`<View><Text>Hello world!</Text></View>`恐怕很多人看起来也觉得陌生。这叫做 JSX——是一种在 JavaScript 中嵌入 XML 结构的语法。很多传统的应用框架会设计自有的模板语法，让你在结构标记中嵌入代码。React 反其道而行之，设计的 JSX 语法却是让你在代码中嵌入结构标记。初看起来，这种写法很像 web 上的 HTML，只不过使用的并不是 web 上常见的标签如`<div>`或是`<span>`等，这里我们使用的是 React Native 的组件。上面的示例代码中，使用的是内置的`<Text>`组件，它专门用来显示文本，而`<View>`就类似 html 中的`div`或是`span`这样的容器。

上面的代码定义了一个名为`HelloWorldApp`的新的`组件（Component）`。你在编写 React Native 应用时，肯定会写出很多新的组件。而一个 App 的最终界面，其实也就是各式各样的组件的组合。组件本身结构可以非常简单——唯一必须的就是在`render`方法中返回一些用于渲染结构的 JSX 语句。

## Props（属性）

大多数组件在创建时就可以使用各种参数来进行定制。用于定制的这些参数就称为`props`（属性）。

以常见的基础组件`Image`为例，在创建一个图片时，可以传入一个名为`source`的 prop 来指定要显示的图片的地址，以及使用名为`style`的 prop 来控制其尺寸。

```typescript
import React, { Component } from "react";
import { Image } from "react-native";

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
    };
    return <Image source={pic} style={{ width: 193, height: 110 }} />;
  }
}
```

请注意`{pic}`外围有一层括号，我们需要用括号来把`pic`这个变量嵌入到 JSX 语句中。括号的意思是括号内部为一个 js 变量或表达式，需要执行后取值。因此我们可以把任意合法的 JavaScript 表达式通过括号嵌入到 JSX 语句中。

使用的时候像这样`this.props`，请注意一点，在自定义组件内部，由外部传入的 props 的属性均为**readonly（只读）**不可在组件内部修改

## ES6 props 使用解构赋值

组件内部赋值是这样的

```typescript
render() {
        return (
            <View style={style.ri_item}>
                <View style={style.ri_line}></View>
                {/* 中间部分 */}
                <View style={style.ri_item_center}>
                    <BidderView
                        bidderHeadImg={this.props.data.bidderHeadImg}
                        bidderName={this.props.data.bidderName}
                        targetName={this.props.data.targetName}
                    />
                </View>

                {/* 尾部按钮 */}
                <View style={{ flexDirection: "row", flex: 1, backgroundColor: "white", justifyContent: 'center', }}>
                    {this.recordOpinionButton()}
                    {this.recordButton()}
                </View>
            </View>
        );
    }
```

而使用解构赋值之后是这样的

```typescript
render() {
        const {bidderHeadImg,bidderName,targetName}=this.props.data
        return (
            <View style={style.ri_item}>
                <View style={style.ri_line}></View>
                {/* 中间部分 */}
                <View style={style.ri_item_center}>
                    <BidderView
                        bidderHeadImg={bidderHeadImg}
                        bidderName={bidderName}
                        targetName={targetName}
                    />
                </View>

                {/* 尾部按钮 */}
                <View style={{ flexDirection: "row", flex: 1, backgroundColor: "white", justifyContent: 'center', }}>
                    {this.recordOpinionButton()}
                    {this.recordButton()}
                </View>
            </View>
        );
    }
```

## ES6 延展操作符（...）

#### 该运算符主要用于函数调用

```javascript
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers); // 42
```

#### 对象的扩展运算

- **拷贝对象**

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```javascript
let z = { a: 3, b: 4 };
let n = { ...z };
n; // { a: 3, b: 4 }
```

- **合并对象**

扩展运算符可以用于合并两个对象。

```javascript
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

#### 用于 props，要求参数名一致，此处用法其实是对 copy 对象的一种应用

```typescript
import React, { Component } from "react";
import { Image } from "react-native";

export default class Bananas extends Component {
  render() {
    let parameter = {
      uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
      title: "HelloWorld",
      message: "Nice to meet you",
    };
    return <ModalAlert {...parameter} />;
  }
}
```

---

参考资料：

[官方文档](https://reactnative.cn/docs/layout-props/#justifycontent)

[ES6 延展操作符（...）](https://www.jianshu.com/p/ae0a9ec1f8d6?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

[typeScriptg 中文文档](https://www.tslang.cn/docs/home.html)

[ReactNative 入门与进阶](https://www.imooc.com/video/14286)

[https://docs.nativebase.io ](<[https://docs.nativebase.io](https://docs.nativebase.io/)>)
