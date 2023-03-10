---
title: "深入理解swift中闭包的捕捉语义"
icon: hk-swift
date: 2017-10-19
category:
  - Swift
tag:
  - iOS
  - Swift
---

> 参考链接：[losures Capture Semantics, Part 1: Catch them all!](https://link.juejin.im/?target=https%3A%2F%2Fgold.xitu.io%2Fentry%2F5796308479bc440066443c8e)

## 概述

原文中先定义一个 Pokemon 类

```swift
class Pokemon: CustomDebugStringConvertible {
  let name: String
  init(name: String) {
    self.name = name
  }
  var debugDescription: String { return "\(name)>" }
  deinit { print("\(self) escaped!") }
}
```

延时执行的闭包

```swift
func delay(seconds: Int, closure: ()->()) {
  let time = DispatchTime.now() + .seconds(seconds)
  DispatchQueue.main.after(when: time) {
    print("🕑")
    closure()
  }
}
```

## 默认捕捉语法

在 swift 中默认的捕捉语法是:**被捕获的变量在闭包被执行的时候才被定值**[1](https://link.juejin.im/?target=http%3A%2F%2Falisoftware.github.io%2Fswift%2Fclosures%2F2016%2F07%2F25%2Fclosure-capture-1%2F%23fn%3Ablock-modifier)
. 我们能说它捕获到了这个变量的*引用*(或者  *指针*)。

```swift
func demo1() {
  let pokemon = Pokemon(name: "Mewtwo")
  print("before closure: \(pokemon)")
  delay(1) {
    print("inside closure: \(pokemon)")
  }
  print("bye")
}
```

这个闭包会在 demo1() 方法函数执行完成后 1 秒后被执行，并且我们已退出了方法函数的作用域… 当然 Pokemon 仍然是存在的，当这个代码块在下一个 1 秒后再次被执行的时候！

```swift
before closure: <Pokemon Mewtwo>
bye
🕑
inside closure: <Pokemon Mewtwo>
<Pokemon Mewtwo> escaped!
```

在这个例子中，当这个闭包被 GCD 执行后，这个闭包自行释放，就是 Pokemon 内部的 init 方法执行的时候。
此处 Swift 自动捕获到这个 pokemon 变量，当 demo1 方法执行完成并且释放掉的时候，1s 之后闭包被执行的时候还是捕获到了 pokemon

## 被捕获到的变量都被执行的时候定值

```swift
var name = "John"

let test1 = {
    print(name)
}

name = "Aby"

test1()
```

此处在创建了 test1 闭包之后，我们改变了 name 的值，打印结果是 Aby。说明此处 Swift 捕获到的是 name 这个变量的引用(指针)

原文中的例子使用了方法，并做了延时，大意在说明，函数被释放之后的延时闭包中，闭包依然捕获了变量的新值，而不是旧值，说明此处它捕获的是变量的引用，而非变量本身的值

这个在值类型中也可行例如 Int

## 修改变量的值

如果捕获的值是一个  var 并不是一个  let，你还是可以修改这个值  **在闭包内部**[2](https://link.juejin.im/?target=http%3A%2F%2Falisoftware.github.io%2Fswift%2Fclosures%2F2016%2F07%2F25%2Fclosure-capture-1%2F%23fn%3Aobjc_block_modify)

```swift
var name = "John"

let test1 = {
    name = "Jack"
    print(name)
}

name = "Aby"

test1()
```

此处打印结果为 Jack，再一次印证，闭包内捕获的是变量 name 的引用，因为它可以被改变，而不是一个静态的拷贝

## 捕获一个作为静态 copy 的变量

```swift
var str = "Hello, playground"
let show1 = { [strcopy = str] in
// 在闭包一开始创建的时候捕获变量的值，
// []内的为捕获列表，一开始捕获值，而非引用。
// 捕获的为原始变量的副本->常量，并且只能在闭包内访问

    print("这是str-----\(str)\n这是strcopy-----\(strcopy)")
}

str = "hello"

show1()
```

```swift
这是str-----hello
这是strcopy-----Hello, playground
```

如果你想要在闭包**创建**的时候捕获变量的值，而不是仅仅当闭包执行的时候去获取它的定值，你能使用一个**捕获列表**。
**捕获列表**可以被编码在方括号的中间，在闭包开括号的右边（并且在闭包的参数 / 或者有返回值之前）[3](https://link.juejin.im/?target=http%3A%2F%2Falisoftware.github.io%2Fswift%2Fclosures%2F2016%2F07%2F25%2Fclosure-capture-1%2F%23fn%3Ain-keyword)
。
为了在闭包创建的时候，捕获变量的值（而不是这个变量本身的引用），你可以使用  [形参 = 实参]

你也可以这样写，不过我觉得不够清晰

```swift
var str = "Hello, playground"
let show1 = { [str] in
    print(str)
}
```

这里的捕获列表大概相当于文中的如下代码

```swift
func demo6_equivalent() {
  var pokemon = Pokemon(name: "Pikachu")
  print("before closure: \(pokemon)")
  // here we create an intermediate variable to hold the instance
  // pointed by the variable at that point in the code:
  let pokemonCopy = pokemon
  delay(1) {
    print("inside closure: \(pokemonCopy)")
  }
  pokemon = Pokemon(name: "Mewtwo")
  print("after closure: \(pokemon)")
}
```

这就好像，如果我们创建一个中间变量去指向同一个 pokemon，并且捕获这个变量
事实上，使用这个捕获列表和上面的代码一样… 除了这个 pokemonCopy 的中间变量是闭包的局部变量，并且将只能在闭包内被访问。

## 总结

- Swift 闭包捕获了一个对外部变量需要在闭包内部使用的一个引用。
- 那个引用在闭包**被执行**的时候获得定值。
- 作为对这个变量的引用的捕捉（并且不是这个变量自身），你能从闭包内部修改这个变量的值（当然，如果这个变量被声明为 var 并且不是 let）
- 相反，你能告诉 Swfit 在闭包创建的时候对这个变量定值 并且把这个值保存在本地的一个静态变量中，而不是捕获变量本身。你可以通过使用捕获列表(中括号)，在括号内表达。

注意：因为捕获列表是一个列表你还可以放多个参数，用逗号隔开，像数组一样

> 最后感谢原文作者
