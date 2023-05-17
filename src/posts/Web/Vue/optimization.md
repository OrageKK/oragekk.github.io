---
title: "Vue常见优化手段"
icon: support
date: 2023-05-17
star: true
cover: 'https://w.wallhaven.cc/full/57/wallhaven-577og5.jpg'
category:
  - Vue
tag:
  - 优化
---

:::info

永远不要过早优化，优化也有相应的代价

- 开发时间变长
- 开发成本增加
- 代码难以阅读
- 增加维护成本

何时优化，因地制宜，是一门艺术，尽量把优化的思想带入写代码的过程中

:::

本文章的优化手段基于`vue2`

<!-- more -->

## 服务端渲染 SSR or 预渲染

客户端渲染：使用 JavaScript 框架进行页面渲染
服务端渲染：服务端将HTML文本组装好，并返回给浏览器，这个HTML文本被浏览器解析之后，不需要经过 JavaScript 脚本的执行，即可直接构建出希望的 DOM 树并展示到页面中，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

**优点：**

更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。对客户端渲染的页面来说，简直无能为力，因为返回的HTML是一个空壳，它需要执行 JavaScript 脚本之后才会渲染真正的页面。
用户将会更快速地看到完整渲染的页面

**缺点:**

为了实现服务端渲染，应用代码中需要兼容服务端和客户端两种运行情况
由于服务器增加了渲染HTML的需求，使得原本只需要输出静态资源文件的nodejs服务，新增了数据获取的IO和渲染HTML的CPU占用，
服务器渲染应用程序，需要处于 Node.js server 运行环境。

### 如何实现？

想要在服务器端渲染，我们需要做什么呢？那就是同构我们的项目，Vue.js 是构建客户端应用程序的框架，服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行

当运行在不同环境中时，我们的代码将不会完全相同，同构就是让一份代码，既可以在服务端中执行，也可以在客户端中执行，并且执行的效果都是一样的，都是完成这个html的组装，正确的显示页面。
对于同构应用来说，我们必须实现客户端与服务端的路由、模型组件、数据模型的共享。

### 服务器端渲染注意事项

为避免造成交叉请求状态污染，每个请求应该都是全新的、独立的应用程序实例。
由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用。
通用代码不可接受像 window 或 document，这种仅浏览器可用的全局变量
浏览器可能会更改的一些特殊的 HTML 结构，例如，浏览器会在

内部自动注入 ，然而，由于 Vue 生成的虚拟 DOM(virtual DOM) 不包含 ，所以会导致无法匹配。

## 使用key

对于通过循环生成的列表，应给每个列表项一个稳定且唯一的key，这有利于在列表变动时，尽量少的删除、新增、改动元素

## 使用冻结的对象

冻结的对象不会被响应化，如果对象很多，嵌套结构很深，遍历过程需要花费很多时间，如果对象不需要动态更改，可以使用冻结对象，如：商品列表等纯展示页面，并不会通过用户交互来更改

```js
var obj = {a:1,b:2}
// 冻结对象
Object.freeze(obj)
// 尝试更改
obj.a = 3
console.log(obj)
// 打印
{a:1,b:2}
// 验证
Object.isFrozen(obj)
// 结果
<.true
```

vue在处理过程中，如果发现对象是冻结对象，就不会去遍历对象，不会变成响应式



#### 下面是1000000个对象的加载过程

**vue**

![](https://s3.bmp.ovh/imgs/2023/05/17/225d8b0bb0b07ab1.png)

**冻结对象**

![](https://s3.bmp.ovh/imgs/2023/05/17/3c863e0c03a3a382.png)

可见vue把对象深度遍历成为响应式，对于大量结构复杂的数据来说，是很耗时间的

## 使用函数式组件

函数式组件，设置`functional:true`，函数式组件没有`data`，这以为它无状态（没有==响应式数据==）

，也没用实例（没有`this`上下文），所以组件树中不存在函数式组件，一个函数式组件就像这样

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

> 注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 `props` 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 `props` 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。
>
> 当使用函数式组件时，该引用将会是 HTMLElement，因为他们是无状态的也是无实例的。

在 2.5.0 及以上版本中，如果你使用了[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)，那么基于模板的函数式组件可以这样声明：

```vue
<template functional>
</template>
```

组件需要的一切都是通过 `context` 参数传递，它是一个包括如下字段的对象：

- `props`：提供所有 prop 的对象
- `children`：VNode 子节点的数组
- `slots`：一个函数，返回了包含所有插槽的对象
- `scopedSlots`：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- `data`：传递给组件的整个[数据对象](https://v2.cn.vuejs.org/v2/guide/render-function.html#深入数据对象)，作为 `createElement` 的第二个参数传入组件
- `parent`：对父组件的引用
- `listeners`：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 `data.on` 的一个别名。
- `injections`：(2.3.0+) 如果使用了 [`inject`](https://v2.cn.vuejs.org/v2/api/#provide-inject) 选项，则该对象包含了应当被注入的 property。

在添加 `functional: true` 之后，需要更新我们的锚点标题组件的渲染函数，为其增加 `context` 参数，并将 `this.$slots.default` 更新为 `context.children`，然后将 `this.level` 更新为 `context.props.level`。

因为函数式组件只是函数，所以渲染开销(**时间**和**内存**)也低很多。

在作为包装组件时它们也同样非常有用。比如，当你需要做这些时：

- 程序化地在多个组件中选择一个来代为渲染；
- 在将 `children`、`props`、`data` 传递给子组件之前操作它们。

下面是一个 `smart-list` 组件的例子，它能根据传入 prop 的值来代为渲染更具体的组件：

```js
var EmptyList = { /* ... */ }
var TableList = { /* ... */ }
var OrderedList = { /* ... */ }
var UnorderedList = { /* ... */ }

Vue.component('smart-list', {
  functional: true,
  props: {
    items: {
      type: Array,
      required: true
    },
    isOrdered: Boolean
  },
  render: function (createElement, context) {
    function appropriateListComponent () {
      var items = context.props.items

      if (items.length === 0)           return EmptyList
      if (typeof items[0] === 'object') return TableList
      if (context.props.isOrdered)      return OrderedList

      return UnorderedList
    }

    return createElement(
      appropriateListComponent(),
      context.data,
      context.children
    )
  }
})
```

## 使用计算属性

如果模版中某个数据会使用多次，并且该数据是通过计算得到的，使用计算属性以缓存它们

## 非实时绑定的表单项

当使用`v-model`绑定一个表单项时，当用户改变表单项的状态时，也会随之改变数据，从而导致vue发生重新渲染（`rerender`），这会带来一些性能的开销。

我们可以通过使用`lazy`或不使用`v-model`的方式解决该问题，但要注意，这样可能会导致在某一个时间段内数据和表单项的值是不一致的。

vue设计思想是关注的是数据而不是界面，代码的可维护性和可阅读性也很重要，js执行线程和浏览器渲染线程是互斥的，所以运行动画时执行jS线程动画会卡顿

如双向绑定的文本框输入的内容改变，输入abcd，会进行4次重新渲染，可以使用`v-model.lazy`,监听`@change`，不使用监听的是`@input`

## 保持对象引用稳定

在绝大部分情况下，`vue`出发`rerender`的时机是其依赖的数据发生**变化**

若数据没有发生变化，哪怕给数据重新赋值了，`vue`也不会做出任何处理的

下面是vue判断数据**没有变化**的源码

```js
function hasChanged(x,y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1/y
  }else {
    return x === x || y === y
  }
}
```

因此，如果需要，只要能保证组件的依赖数据不发生变化，组件就不会重新渲染

对于原始数据类型，保持其值不变即可

对于对象类型，保持其引用不变即可

## 使用v-show替代v-if

对于频繁切换显示状态的元素，使用v-show可以保证虚拟的dom树的稳定，避免频繁的新增和删除元素，特别是对于那些内部包含大量dom元素的节点，这一点及其重要

## 使用延迟装载defer

首页白屏时间主要受到两个因素的影响：

- 打包体积过大

  巨型包需要消耗大量的传输时间，导致JS传输完成前页面只有一个`<div>`，没有可显示的内容

- 需要立即渲染的内容太多

JS传输完成后，浏览器开始执行JS构造页面

但可能一开始要渲染的组件太多，不仅JS的事件很长，而且执行完后浏览器要渲染的元素过多，从而导致页面白屏loading过久

一个可行的办法就是延迟装载组件，让组件按照指定的先后顺序依次一个一个渲染出来

:::tip

延迟装载是一个思路，本质上就是利用`requestAnimationFrame`事件分批渲染内容，它的具体实现多种多样

:::

告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的[回调函数](https://so.csdn.net/so/search?q=回调函数&spm=1001.2101.3001.7020)更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

`callback`： 下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入[DOMHighResTimeStamp](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)参数，该参数与[performance.now()](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)的返回值相同，它表示`requestAnimationFrame()` 开始去执行回调函数的时刻。

思路：浏览器渲染1s渲染60次，第一次渲染一部分，第二次一部分，隔开渲染,分批绘制

```js
// defer.js
export default function(maxFrameCount) {
  return {
    data(){
      return{
        // 浏览器每重绘一次，计数
        frameCount:0,
      };
    },
    mounted() {
      const refreshFrameCount = () => {
        requestAnimationFrame(() => {
        	this.frameCount++;
          if(this.frameCount < maxFrameCount) {
            refreshFrameCount();
          }
        });
      };
      refreshFrameCount();
    },
    methods: {
      defer(showInFrameCount) {
        // 用于v-if 的判断条件，渲染次数大于showInFrameCount后继续下一次渲染
        return this.frameCount >= showInFrameCount
      },
    },
  };
}
```



```vue
<template>
  <div class="container">
    <!--vue3.0 v-if 优先级高 vue2.x v-for优先级高-->
    <div class="block" v-for="n in 20" v-if="defer(n)">
      <heavy-comp></heavy-comp>
    </div>
  </div>
</template>
<script>
import defer from "./mixin/defer";
export default {
  mixins: [defer(300)],
  components: { HeavyComp },
};
</script>

```



## 使用keep-alive

用于缓存内部组件实例，里面有include和exclude属性，max设置最大缓存数，超过后，自动删除最久没用的。

受到keep-alive影响，其内部的组件都具有两个生命周期，`activated`和`deactivated` ,分别再组件激活和失活时触发，第一次`activated`是在`mounted`之后。

一般用在需要多个页面频繁操作的场景（导航条）

## 长列表优化

一般用在app端下拉的时候，或者列表很长的时候，通过一个固定大小的渲染池来解决。通过滚动条等一些操作，减少页面渲染市场，有现成的库，vue-virtual-scroller

https://github.com/Akryum/vue-virtual-scroller

通过v-once创建低开销的静态组件，渲染一次后就缓存起来了，除非你非常留意渲染速度，不然最好不要用，因为有的开发者不知道这个属性或者看漏了，然后花费好几个小时来找为什么模板无法正确更新。

## 打包体积优化

- Webpack 对图片进行压缩
- 静态资源的优化使用对象存储加CDN
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

## 基础优化

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈
