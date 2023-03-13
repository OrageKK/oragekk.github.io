---
title: "ReactNative State(状态)"
description: "ReactNative State(状态)"
date: 2019-11-12
order: 3
category:
  - 前端跨平台
tag:
  - 前端
  - React Native
---

> 接上篇 [ReactNative开发环境配置，ES6语法介绍](/posts/ReactNative/react2.html)

## ReactNative State(状态)

### 概念

通俗来讲，一个组件，或者一个视图，他们都是 Component，Component 用两个最重要的东西，一个`props`

一个`state`

我们使用两种数据来控制一个组件：`props`和`state`。`props`是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。(`props`就像一个类的初始化属性一样，只有在创建时可以赋值，并且组件内部不可修改，也就是`readonly`)

对于需要改变的数据，我们需要使用`state`。也可以把`state`理解为一个状态机，对于那些需要改变的数据可以使用`state`来更改，比如网络接口拿回来的数据，可以放在`state`里，当需要改变的时候只需要调用`setState`即可

### 使用

一般来说，你需要在 class 中声明一个`state`对象，然后在需要修改时调用`setState`方法。

假如我们有一个弹窗，想要控制弹窗是不是显示，需要一个`modalVisible`属性，当更改它的值时从而使界面 UI 产生相应的变化

```typescript
// 声明state对象
interface IState {
  modalVisible: boolean;
}

export default class ModalMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { modalVisible: false };
  }
}
```

另一种声明方式，声明在类内部，声明的同时，进行初始化

```typescript
state = {
  modalVisible: false,
};
```

使用`this.state.modalVisible`来控制组件是否显示

```typescript
render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(false)
                }}
            >

        );
}
```

更新组件状态使用

```typescript
this.setState({ modalVisible: true });
```

### 注意点

实际开发中，我们一般不会在定时器函数（setInterval、setTimeout 等）中来操作 state。典型的场景是在接收到服务器返回的新数据，或者在用户输入数据之后。你也可以使用一些“状态容器”比如[Redux](http://redux.js.org/index.html)来统一管理数据流。

每次调用`setState`时，BlinkApp 都会重新执行 render 方法重新渲染。

- render（）中 UI 的变化只有当绑定的 state 中的某个属性变化后，才会变化
- 一切界面变化都是`状态state变化`
- `state`的修改必须通过`setState()`方法
  - this.state.likes = 100; // 这样的`直接赋值修改无效！`
  - setState 是一个 merge 合并操作，只修改指定属性，不影响其他属性
  - setState 是`异步`操作，修改`不会马上生效`

我们可以看到`setState`内部的声明

```typescript
setState<K extends keyof S>(
            state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
            callback?: () => void
        ): void;
```

如果想要同步使用，我们可以使用第二个参数 callback?它是可选的

```typescript
this.setState({ modalVisible: true }, () => {
  // 这里是同步的
});
```

---

参考资料：

[官方文档](https://reactnative.cn/docs/layout-props/#justifycontent)

[ES6 延展操作符（...）](https://www.jianshu.com/p/ae0a9ec1f8d6?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

[typeScriptg 中文文档](https://www.tslang.cn/docs/home.html)

[ReactNative 入门与进阶](https://www.imooc.com/video/14286)

[https://docs.nativebase.io ](<[https://docs.nativebase.io](https://docs.nativebase.io/)>)
