---
title: "终端究极美化iTerm2+Pure"
icon: "hk-zsh"
subtitle: "Pure"
date: 2023-03-24 16:40:37
star: true
category:
  - Linux
tag:
  - terminal
  - Linux
---


:::tip
之前介绍了ZSH的安装和使用，这次把最终成果介绍一下，就是ZSH + iTerm2 + Pure 

前置工作：安装ZSH，请参照之前的文章👉[zsh安装](./zsh.html)
:::

<!-- more -->
## 目录

[[toc]]

## 先看效果图

![界面](https://s3.bmp.ovh/imgs/2023/03/24/140a5562a8b9e334.png)

![命令提示](https://s3.bmp.ovh/imgs/2023/03/24/810d0c1d2a4d7069.png)

![流输出](https://s3.bmp.ovh/imgs/2023/03/24/052c26b51ecde528.png)

## 安装pure
👉[官方文档](https://github.com/sindresorhus/pure)

可以使用 npm 或手动安装。需要 Git 2.15.2+ 和 ZSH 5.2+。已知旧版本的 ZSH 可以工作，但不推荐使用。
::: code-tabs
@tab npm
```bash
npm install --global pure-prompt
```

@tab Homebrew
```bash
brew install pure
```

@tab 手动
```bash
# 在某处克隆此 repo。在这里我们将使用 $HOME/.zsh/pure
mkdir -p "$HOME/.zsh"
git clone https://github.com/sindresorhus/pure.git "$HOME/.zsh/pure"
```
:::

如果是手动安装的，将克隆的 repo 的路径添加到 $HOME/.zshrc 中的 $fpath 。

```bash
# .zshrc
fpath+=($HOME/.zsh/pure)
```
将以下内容复制到 `.zshrc`文件中

```bash
autoload -U promptinit; promptinit
prompt pure
```

在 .zshrc 中设置 ZSH_THEME="" 以禁用 oh-my-zsh 主题。

到这里就基本完成了，如果要基于pure做详细定制，请参考文档

## iTerm2
👉戳这里下载 [官方下载地址](https://iterm2.com/downloads.html)

效果图我自用的配置文件在这里 👉 [链接](https://pan.baidu.com/s/1cG-gSwoPouYXeZ-P2pjmAg)  密码:74aq

### 1.主题配置
访问iTerm2主题网站👉[iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)

可以下载zip包并解压到本地，进入解压缩的文件目录，找到schemes文件夹，里边全是主题配置，可以对照github上的效果图来选择

![导入](https://s3.bmp.ovh/imgs/2023/03/24/2eee92812c17fc48.png)

### 2. 标签页配色

标签配色默认为黑色，不能与操作页面保持统一

![默认](https://s3.bmp.ovh/imgs/2023/03/24/9995b0382a76bba8.png)

打开iTerm2，打开Preferences配置界面，Appearence -> General，将 Theme 改为 Minimal

![](https://s3.bmp.ovh/imgs/2023/03/24/411e917c7fb3d2b9.png)

### 3. 设置 Status bar

iTerm2 提供了不少的 Status bar，开启后我们可以在终端的最上方非常方便的实时查看本机的一些信息。

![](https://s3.bmp.ovh/imgs/2023/03/24/d93a133dcd5fe00c.png)

打开iTerm2，打开Preferences配置界面，Profiles -> session-> 勾选 Status bar enable-> configure Status bar，选择自己想要的展示内容即可。向下托动放入Active Components 中即可,我这里只选了CPU、内存、网络

![](https://s3.bmp.ovh/imgs/2023/03/24/918522902136668f.png)

### 4. 光标选择
iterm提供了三种光标可供选择：_、|、[]。

打开iTerm2，打开Preferences配置界面，Profiles -> text-> cursor，选择自己想要的光标即可。

### 5.配置SSH快速连接
```bash
#首先在/Users目录下按照如下命令创建sh脚本
cd /Users/

#创建iterm文件夹
mkdir iterm
 
#进入iterm文件夹
cd iterm

#创建myserver.sh文件
touch myserver.sh

#编辑myserver.sh文件
vi myserver.sh
```

如果出现没有权限，就命令前面加上sudo

键盘输入i编辑文件，插入以下内容：

```bash
#!/usr/bin/expect
set timeout 30
spawn ssh -p [lindex $argv 0] [lindex $argv 1]@[lindex $argv 2]
expect {
        "(yes/no)?"
        {send "yes\n";exp_continue}
        "password:"
        {send "[lindex $argv 3]\n"}
}
interact
```
myserver.sh文件中变量解释：
```bash
[lindex $argv 0]：端口号
[lindex $argv 1]：服务器用户名
[lindex $argv 2]：服务器IP地址
[lindex $argv 3]：服务器密码
```
插入完成后键盘esc 然后输入:wq退出，接下来给文件赋权

chmod 777 myserver.sh
打开iTerm2，打开Preferences配置界面，Profiles -> general，左下角点击+号，新建profile，参考下面图片在对应位置输入内容即可。

![](https://s3.bmp.ovh/imgs/2023/03/24/349fdd06e7bc428d.png)

Name:根据需求输入，通常选择标识性较强的内容便于区分，例如服务器的IP地址

Command：这里选择login Shell

Send text at start ：填写格式形如A B C D E这样，每一个部分之间用空格隔开，根据自己实际情况填写,下面是对每一部分内容的解释

:::info
A 代表咱们上面写的本机保存sh脚本的路径：/Users/iterm/myserver.sh

B 代表服务器端口号一般远程连接端口为：22

C 代表服务器用户名一般为：root

D 代表服务器IP：公网IP填写

E 代表服务器密码：根据自己实际的服务器密码填写
设置好之后打开iTerm2，点击profiles，点击前面自己新增的连接远程服务器的profile的名字

首次连接需要输入一次服务器密码，之后再连接就免密码登陆了
:::


## 结语
当然这里只介绍一部分，还有很多高级玩法，需要用到的时候自己去研究一下了