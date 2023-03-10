---
title: "使用n命令管理node版本"
icon: shell
date: 2020-04-03
star: true
category:
  - Linux
tag:
  - Node
---

> 鉴于使用 ReactNative 时，会需要不同的 node 版本，提供一种版本切换方式

## 使用 n command 来进行 node 版本管理

### 概念

n Node version manager 提供了一个更简单的 CLI，用于在 Node 版本之间进行安装和切换。它仅在 Linux 或 Mac 操作系统上受到支持。

### 安装

如果你已经安装某个版本的 Node 和 npm ，则可以用 npm install -g n 来安装 n，就像安装其他 NPM 包一样。

如果你还没有安装 Node 或 npm，可以用 GitHub 中的 bash 脚本安装 n。这是它的样子：

```shell
curl -L https://git.io/n-install | bash
=== n successfully installed.
  The active Node.js version is: v10.16.0

  Run `n -h` for help.
  To update n later, run `n-update`.
  To uninstall, run `n-uninstall`.

  IMPORTANT: OPEN A NEW TERMINAL TAB/WINDOW or run `. /home/brian/.bashrc`
             before using n and Node.js.
===
~$ . /home/brian/.bashrc
~$ n
node/10.16.0
```

通过从 GitHub 下载并运行 n-install 脚本来安装 n。n 默认安装了一个版本的 Node。

### 安装版本 10.17.0

如果需要指定版本号，可以这样安装

```shell
sudo n 10.17.0
```

### 安装最新版本

安装最新版本使用如下命令

```shell
sudo n latest
```

### 切换版本

```shell
n
```

显示如下

```shell
Last login: Fri Apr  3 16:56:05 on ttys004

# huangkun @ huagnkundeMacBook-Pro in ~ [16:58:24]
$ n
  ο node/10.17.0
    node/13.12.0

Use up/down arrow keys to select a version, return key to install, d to delete, q to quit


```

可以使用上下方向键来选择版本，并回车。如果不想选择可以按`q`退出

## 直接使用 Node 二进制文件

n 提供了直接调用特定 Node 二进制文件的功能，而无需显式切换到该版本的 Node。 NVM 则没有类似的功能。

```shell
# huangkun @ huagnkundeMacBook-Pro in ~ [17:01:32]
$ node -v
v10.17.0
# huangkun @ huagnkundeMacBook-Pro in ~ [17:01:39]
$ n use 13.12.0 index.js
Node version: v13.12.0
```

请注意，n use 命令所请求的 Node 版本需要由 n 安装。

在某些情况下，这个功能非常有用。例如，有一个构建服务器，用于构建需要不同 Node 版本的程序。可以用 n use 命令触发每个构建，并能够指定该程序所需的 Node 版本。

## 差异化

NVM for Windows 和 n 有许多常见功能，也有一些独特的功能，这些功能会影响你使用每个工具的方式和位置。以下是一些主要差异的摘要：

|              **能力**              |          **NVM for Windows**           |       **n**        |
| :--------------------------------: | :------------------------------------: | :----------------: |
|                安装                |       Windows 安装程序或独立安装       | Bash 脚本或 npm 包 |
|            操作系统支持            | Windows（适用于 Linux/Mac 的不同实现） |   仅限 Linux/Mac   |
|   列出要安装的 Node 的可用版本？   |                  Yes                   |         No         |
|      列出已安装的 Node 版本？      |                  Yes                   |        Yes         |
| 在不同的 Node 版本之间安装和切换？ |                  Yes                   |        Yes         |
|     直接访问 Node 二进制文件？     |                   No                   |        Yes         |
|   选择要安装的架构（x86，x64）？   |                  Yes                   |        Yes         |

如果你使用 Linux/Mac 那么我很推荐你使用 n，因为它安装方便，并且 API 简单。我还是用过 homebrew 安装两个办版本，使用`brew link --overwrite --force node`命令来更改版本，很不方便，并且容错率很低

或者你可以在 Windows 上选择 NVM for Windows，同时在 Linux 构建服务器上选择 n

无论怎样，这两种工具都能很好地满足能够动态切换 Node 版本的需求。

> 就是这么简单了
