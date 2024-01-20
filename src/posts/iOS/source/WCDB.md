---
title: "WCDB漫谈"
date: 2018-01-18
icon: others
category:
  - iOS
tag:
  - iOS
  - 工具集
---

> 前言

> 移动端的数据库选型一直是一个难题，直到前段时间看到了 WeMobileDev(微信前端团队)放出了第三个开源组件-WCDB

> WCDB(WeChat DataBase)是微信官方的移动端数据库组件，致力于提供一个高效、易用、完整的移动端存储方案

## 微信团队怎么说

- 基于 SQLCipher

- WCDB-iOS/Mac

- WCDB-Android

- 数据库损坏修复工具 WDBRepair

### 背景

WCDB 的出现可以说解决了目前移动端数据库的几个难点

- 首先在选型上，**FMDB**的 SQL 拼接、难以防止的 SQL 注入；**CoreData**虽然可以方便 ORM，但学习成本高，稳定性堪忧，而且多线程鸡肋；另外基于 C 语言的**sqlite**我想用的人也应该不多；除了上述关系型数据库之外然后还有一些其他的 Key-Value 型数据库，如我用过的 Realm，对于 ObjC 开发者来说，上手倒是没什么难度，但缺点显而易见，需要继承，入侵性强，对于单继承的 OC 来说这并不理想，而且对于集合类型不完全支持，复杂查询也比较无力。
- **高效**

  - 多线程高并发：WCDB 支持多线程读与读、读与写并发执行，写与写串行执行。
  - 批量写操作性能测试：

    | 批量写 | ops/sec |
    | ------ | :-----: |
    | WCDB   | 458000  |
    | FMDB   | 161000  |

- **易用** WCDB 支持一句代码即可将数据取出并组合为 object

  - WINQ(WCDB 语言集成查询)：通过 WINQ，开发者无须为了拼接 SQL 的字符串而写一大坨胶水代码。

  - ORM(Object Relational Mapping)：WCDB 支持灵活、易用的 ORM。开发者可以很便捷地定义表、索引、约束，并进行增删改查操作。

  - 像这样

    ```objc
    [database getObjectsOfClass:WCTSampleConvenient.class

    		fromTable:tableName

    		where:WCTSampleConvenient.intValue>=10

    		limit:20];
    ```

- **完整**
  - 加密：WCDB 提供基于 SQLCipher 的数据库加密。
  - 损坏修复：WCDB 内建了 Repair Kit 用于修复损坏的数据库。
  - WCDB 提供接口直接获取 SQL 的执行耗时，可用于监控性能。
  - 反注入：WCDB 内建了对 SQL 注入的保护

## ORM

在 WCDB 内，ORM（Object Relational Mapping）是指

- 将一个 ObjC 的类，映射到数据库的表和索引；

- 将类的 property，映射到数据库表的字段；

这一过程。通过 ORM，可以达到直接通过 Object 进行数据库操作，省去拼装过程的目的。

WCDB 通过内建的宏实现 ORM 的功能。如下

![Ma6EBF.png](https://s2.ax1x.com/2019/11/15/Ma6EBF.png)

![Ma6FXT.png](https://s2.ax1x.com/2019/11/15/Ma6FXT.png)

**PS**:但我不建议这么做，首先要避免在.h 文件中引用<WCDB/WCDB.h>,因为你一旦引用，就需要改变.m 文件为.mm 文件，因为 WCDB 是基于 objectiveC++；你可以使用 Category 特性将其隔离，在 category 中引用<WCDB/WCDB.h>，并遵守**WCTTableCoding**协议，使用**WCDB_PROPERTY**将声明绑定到数据库表的字段。然后在模型类中引用 category。达到不印象 Controller 和 View 的目的。这点官方 wiki 中也有提到，使用文件模板来创建。具体请见 Demo

对于一个已有的 ObjC 类，

- 引用 WCDB 框架头文件#import <WCDB/WCDB.h>，并定义类遵循 WCTTableCoding 协议

- **WCDB_PROPERTY**用于在头文件中声明绑定到数据库表的字段。

- **WCDB_IMPLEMENTATION**，用于在类文件中定义绑定到数据库表的类。同时，该宏内实现了 WCTTableCoding。因此，开发者无须添加更多的代码来完成 WCTTableCoding 的接口

- **WCDB_SYNTHESIZE**，用于在类文件中定义绑定到数据库表的字段。
- **WCDB_PRIMARY**用于定义主键
- **WCDB_PRIMARY_AUTO_INCREMENT** 用于定义自增主键
- **WCDB_INDEX**用于定义索引

- **WCDB_UNIQUE**用于定义唯一约束

- **WCDB_NOT_NULL**用于定义非空约束

## CRUD

得益于 ORM 的定义，WCDB 可以直接进行通过 object 进行增删改查（CRUD）操作。

- **增**

  ```objc
  //插入
    Person *man = [[Person alloc] init];
    man.isAutoIncrement = YES;
    man.name = @"Hello, WCDB!";
    man.age = 12;
    return  [database insertObject:man into:TABLE_WCDB_NAME];
  ```

- **删**

  ```objc
  return [database deleteObjectsFromTable:TABLE_WCDB_NAME where:Person.studentId == studentId];
  ```

- **改**

  ```objc
  Person *person = [[Person alloc] init];
    person.name = content;
    return [database updateRowsInTable:TABLE_WCDB_NAME onProperties:Person.name withObject:person where:Person.studentId == studentId];
  ```

- **查**

  ```objc
  NSArray<Person *> * person = [database getObjectsOfClass:Person.class fromTable:TABLE_WCDB_NAME orderBy:Person.localID.order()];
  ```

## Transaction

WCDB 内可通过两种方式执行 Transaction（事务），一是 runTransaction:接口

[![Ma6AnU.md.png](https://s2.ax1x.com/2019/11/15/Ma6AnU.md.png)](https://imgchr.com/i/Ma6AnU)

这种方式要求数据库操作在一个 BLOCK 内完成，简单易用。

另一种方式则是获取 WCTTransaction 对象

[![Ma6eAJ.md.png](https://s2.ax1x.com/2019/11/15/Ma6eAJ.md.png)](https://imgchr.com/i/Ma6eAJ)

WCTTransaction 对象可以在类或函数间传递，因此这种方式也更具灵活性。

## WINQ

WINQ（WCDB Integrated Query，音'wink'），即 WCDB 集成查询，是将自然查询的 SQL 集成到 WCDB 框架中的技术，基于 C++实现。

- 免去拼接 SQL 字符串、防注入
- 借助 IDE 代码提示和编译器语法检查
- 对于一个已绑定 ORM 的类，可以通过 className.propertyName 的方式，获得数据库内字段的映射
- WINQ 的接口包括但不限于：
  - 一元操作符：+、-、!等
  - 二元操作符：||、&&、+、-、\*、/、|、&、<<、>>、<、<=、==、!=、>、>=等
  - 范围比较：IN、BETWEEN 等
  - 字符串匹配：LIKE、GLOB、MATCH、REGEXP 等
  - 聚合函数：AVG、COUNT、MAX、MIN、SUM 等
  - ...

### 原理

- 初衷，适应 WCDB+ORM 解决 SQL 字符串的代码冗余和难以被编译器进行语法检查而造成的错误和时间浪费。SQL 字符串太容易被注入
- SQL 抽象
- 封装常用操作，覆盖 80%的使用场景
- 暴露底层接口，适配剩余 20%的特殊情况
- 定义常用操作
- 特殊场景所暴露的底层接口，应该以什么形式存在？
- SELECT、DISTINCT、ALL 等等大写字母是 keyword，属于 SQL 的保留字。
- result-column、``table-or-subquery、expr 等等小写字母是 token。token 可以再进一步地展开其构成的语法规则。
- 将固定的 keyword，封装为函数名，作为连接。
- 将可以展开的 token，封装为类，并在类内实现其不同的组合。
- 在语法规则中，WHERE、LIMIT 等都接受 expr 作为参数。因此，不管 SQL 多么复杂，StatementSelect 也只接受 Expr 的参数。而其组合的能力，则在 Expr 类内实现。

### 高级用法

**as 重定向**

基于 ORM 的支持，我们可以从数据库直接取出一个 Object。然而，有时候需要取出并非是某个字段，而是有一些组合。例如：

![img](http://mmbiz.qpic.cn/mmbiz_jpg/csvJ6rH9MctkzbxEw7JwfIhYBtueEWc1wT04kHF8su04FELDiaTjw6vmh0DmDibNqsQZZp61Dr1lAfPuyqYDgv2w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这段代码从数据库中取出了消息的最新的修改时间，并以此将此时间作为消息的创建时间，新建了一个 message。这种情况下，就可以使用 as 重定向。

as 重定向，它可以将一个查询结果重定向到某一个字段，如下：

![img](http://mmbiz.qpic.cn/mmbiz_jpg/csvJ6rH9MctkzbxEw7JwfIhYBtueEWc1ibXvcR7J18em4DydIzyQ2EVjcLCTcN9njspEph85UMnlGwzw9dSeZ3A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

通过 as(Message.createTime)的语法，将查询结果重新指向了 createTime。因此只需一行代码便可完成原来的任务。

**链式调用**

链式调用是指对象的接口返回一个对象，从而允许在单个语句中将调用链接在一起，而不需要变量来存储中间结果。

WCDB 对于增删改查操作，都提供了对应的类以实现链式调用

- WCTInsert
- WCTDelete
- WCTUpdate
- WCTSelect
- WCTRowSelect
- WCTMultiSelect

![img](http://mmbiz.qpic.cn/mmbiz_jpg/csvJ6rH9MctkzbxEw7JwfIhYBtueEWc172epk1WSTvV3A8toxkjs2h23NLn5PgrVunTVVnahR15R0aEdLia0oPQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

where、orderBy、limit 等接口的返回值均为 self，因此可以通过链式调用，更自然更灵活的写出对应的查询。

传统的接口方便快捷，可以直接获得操作结果；链式接口则更具灵活性，开发者可以获取数据库操作的耗时、错误信息；也可以通过遍历逐个生成 object。

![img](http://mmbiz.qpic.cn/mmbiz_jpg/csvJ6rH9MctkzbxEw7JwfIhYBtueEWc1LO9iaRVNx1YsIlZX6Xhy7ichve0CcsvBNibGaKaPgbZN9BvpticjBWVicqw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

WCDB 内同时支持这两种接口，优势互补，开发者可以根据需求，选择使用。

**多表查询**

SQLite 支持联表查询，在某些特定的场景下，可以起到优化性能、简化表结构的作用。

WCDB 同样提供了对应的接口，并在 ORM 的支持下，通过 WCTMultiSelect 的链式接口，可以同时从表中取出多个类的对象。

![img](http://mmbiz.qpic.cn/mmbiz_jpg/csvJ6rH9MctkzbxEw7JwfIhYBtueEWc1OAQQtZ36iaibr6Oric1XNA9E9ribfJefdjrHTjy0e62LS1XxHialzibWOeJw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**类字段绑定**

在 ORM 中，我们通过宏，将 ObjC 类的 property 绑定为数据库的一个字段。但并非所有 property 的类型都能绑定到字段。

WCDB 内置支持的类型有：

- const char\*的 C 字符串类型
- 包括但不限于 int、unsigned、long、unsigned long、long long、unsigned long long 等所有基于整型的 C 基本类型
- 包括但不限于 float、double、long double 等所有基于浮点型的 C 基本类型
- enum 及所有基于枚举型的 C 基本类型
- NSString、NSMutableString
- NSData、NSMutableData
- NSArray、NSMutableArray
- NSDictionary、NSMutableDictionary
- NSSet、NSMutableSet
- NSValue
- NSDate
- NSNumber
- NSURL

然而，内置支持得再多，也不可能完全覆盖开发者所有的需求。因此 WCDB 支持开发者自定义类字段绑定。

类只需实现 WCTColumnCoding 协议，即可支持绑定。

![img](http://mmbiz.qpic.cn/mmbiz_jpg/csvJ6rH9MctkzbxEw7JwfIhYBtueEWc1Nl0xSkc8HpEKr5ynDEEUver6lhNGBgtAAR9UicicqdsREmGnicOLfbniag/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- columnTypeForWCDB 接口定义类对应数据库中的类型
- unarchiveWithWCTValue:接口定义从数据库类型反序列化到类的转换方式
- archivedWCTValue 接口定义从类序列化到数据库类型的转换方式

## 数据库修复

- 官方的 Dump 恢复方案 - 遍历 sqlite_master 表，将未损坏的表和已损坏的前半部分读取出来将 dump 出来的 SQL 语句逐行执行，最终可以得到一个等效的新 DB
  功率约为 30%。 - 第一页就损坏后续无法读取
- 备份恢复方案
  - COPY
  - 在 DB 完好的时候执行.dump
  - Backup API： SQLite 自身提供的一套备份机制，按 Page 为单位复制到新 DB， 支持热备份。
  - 最终选择 Dump + 压缩，恢复成功率达到 72%
- 解析 B-tree 恢复方案（RepairKit）
  - 成功率约为 78%
- 不同方案的组合
  - RepairKit 尝试恢复最新数据
  - 备份恢复 遇到错误填补漏缺
  - Dump 最后的尝试

## For Android

- 基本功能
  - 基于 SQLCipher 的数据库加密
  - 使用连接池实现并发读写
  - 内建 Repair Kit 可用于修复损坏数据
  - 针对占用空间大小优化的数据库备份/恢复功能
  - 日志输出重定向以及性能跟踪接口
  - 内建用于全文搜索的 mmicu FTS3/4 分词器
- 接入与迁移

  - WCDB for Android 可通过 Maven 或 AAR 包引用，API 接口与 Android SDK 非常相近， 所以将已有的 App 迁移到 WCDB 是相当容易的。
  - [Android 接入与迁移](https://github.com/Tencent/wcdb/wiki/Android%E6%8E%A5%E5%85%A5%E4%B8%8E%E8%BF%81%E7%A7%BB)

- 数据库修复
  - [Android 数据库修复](https://github.com/Tencent/wcdb/wiki/Android%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BF%AE%E5%A4%8D)
- 从源码编译
  - 你可以使用预编译的依赖库（OpenSSL crypto 和 SQLCipher）来编译 WCDB for Android， 使用 Gradle 或 Android Studio 皆可。Android Studio 请导入 android 目录作为 Root Project。
  - 编译 WCDB 需要安装 Android NDK r11c 或以上，并在 android/local.properties 上配置好 SDK 与 NDK 路径。Android Studio 一般会帮你配置好。
  - 如果你需要自己编译 OpenSSL 等依赖项，你需要一个 Bash 环境（Windows 可以安装 Cygwin 或 MSys）、target 为本机的 C 编译器（如 GCC）、Perl 5 以及 Tcl。之后执行下面命令即可编译依赖项。

> 参考资料

> [Demo](https://github.com/OrageKK/WCDB_DEMO)

> [微信移动端数据库组件 WCDB 系列（一）-iOS 基础篇](https://mp.weixin.qq.com/s/1XxcrsR2HKam9ytNk8vmGw)

> [微信移动端数据库组件 WCDB 系列（二） — 数据库修复三板斧](https://mp.weixin.qq.com/s/Ln7kNOn3zx589ACmn5ESQA)

> [微信移动端数据库组件 WCDB 系列（三） — WINQ 原理篇](https://mp.weixin.qq.com/s/FY2Y9x1_8TcXHDgTRXcTDA)

> [微信移动数据库组件 WCDB（四） — Android 特性篇](https://mp.weixin.qq.com/s/NFnYEXSxAaHBqpi7WofSPQ)
