---
title: "更优雅强大的终端ZSH"
icon: "hk-zsh"
subtitle: "Linux"
date: 2019-07-24
star: true
category:
  - Linux
tag:
  - terminal
  - Linux
---

> MacOS 自带的 bash 作为几乎所有 Linux 发行版的默认终端，正常使用时没什么问题的
>
> 这里介绍一个更强大的终端神器

## 目录

[[toc]]

## 背景介绍

在 unix 内核的操作系统中,当然现在衍生出好多分支,linux ,OS X 都算.

shell 就算和上面这些系统内核指令打交道的一座桥梁,我们通过键盘输入一种自己容易记忆识别的符号标识(shell 命令)

然后 shell 解析这种命令再反馈给内核去执行一系列操作.

zsh 和 shell 有什么关系呢?

其实 zsh 也是一种 shell ,但是并不是我们系统默认的 shell ,unix 衍生系统的默认 shell 都是 bash。

查看已安装 shell
查看 Mac 上已有的 shell,一共有 6 种

---

`cat /etc/shells`

```bash
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

## 安装 **oh my zsh**
::: code-tabs
@tab crul
使用 `crul` 安装：

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
@tab wget
使用 `wget` 安装：

```shell
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```
:::

安装成功：

```shell
Cloning Oh My Zsh...
Cloning into '/root/.oh-my-zsh'...
remote: Counting objects: 712, done.
remote: Compressing objects: 100% (584/584), done.
remote: Total 712 (delta 15), reused 522 (delta 4), pack-reused 0
Receiving objects: 100% (712/712), 443.58 KiB | 27.00 KiB/s, done.
Resolving deltas: 100% (15/15), done.
Checking connectivity... done.
Looking for an existing zsh config...
Using the Oh My Zsh template file and adding it to ~/.zshrc
Copying your current PATH and adding it to the end of ~/.zshrc for you.
Time to change your default shell to zsh!
        __                                     __
 ____  / /_     ____ ___  __  __   ____  _____/ /_
/ __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / /
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/
                       /____/                       ....is now installed!

Please look over the ~/.zshrc file to select plugins, themes, and options.
p.s. Follow us at https://twitter.com/ohmyzsh.
p.p.s. Get stickers and t-shirts at http://shop.planetargon.com.
```

安装完成以后，默认`Shell`的`~/.bashrc`文件默认不再加载了，替代的是`~/.zlogin`和`~/.zshrc`。所以如果你在`~/.bashrc`里配置了某些设置，需要把她们复制到`~/.zshrc`中。

在`~/.zshrc` 中添加以下行

`source ~/.bash_profile`

#### 切换终端为 zsh

`chsh -s /bin/zsh`

#### oh my zsh 目录结构

进入`~/.oh-my-zsh`目录后，看看该目录的结构

```sh
~ ls ~/.oh-my-zsh
CONTRIBUTING.md cache           log             templates
LICENSE.txt     custom          oh-my-zsh.sh    themes
README.md       lib             plugins         tools
```

- lib 提供了核心功能的脚本库
- tools 提供安装、升级等功能的快捷工具
- plugins 自带插件的存在放位置
- templates 自带模板的存在放位置
- themes 自带主题文件的存在放位置
- custom 个性化配置目录，自安装的插件和主题可放这里

### 配置

`zsh` 的配置主要集中在`~/.zshrc`里，用 `vim` 或你喜欢的其他编辑器打开`.zshrc`。

可以在此处定义自己的环境变量和别名，当然，`oh my zsh` 在安装时已经自动读取当前的环境变量并进行了设置，你可以继续追加其他环境变量。

#### 别名设置：

`zsh`不仅可以设置通用别名，还能针对文件类型设置对应的打开程序，比如：

- `alias -s html=vi`，意思就是你在命令行输入 `hello.html`，`zsh`会为你自动打开`vim`并读取`hello.html`；
- `alias -s gz='tar -xzvf'`，表示自动解压后缀为`gz`的压缩包。

``` sh
alias cls='clear'
alias ll='ls -l'
alias la='ls -a'
alias vi='vim'
alias javac="javac -J-Dfile.encoding=utf8"
alias grep="grep --color=auto"
alias -s html=vi   # 在命令行直接输入后缀为 html 的文件名，会在 vim 中打开
alias -s rb=vi     # 在命令行直接输入 ruby 文件，会在 vim 中打开
alias -s py=vi       # 在命令行直接输入 python 文件，会用 vim 中打开，以下类似
alias -s js=vi
alias -s c=vi
alias -s java=vi
alias -s txt=vi
alias -s gz='tar -xzvf'
alias -s tgz='tar -xzvf'
alias -s zip='unzip'
alias -s bz2='tar -xjvf'
```

【其他】

- [github zsh 主题参考](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)
- [自定义 zsh 提示符](http://blog.sina.com.cn/s/blog_71539d240101fh8s.html)

#### 主题设置：

`oh my zsh` 提供了数十种主题，相关文件在`~/.oh-my-zsh/themes`目录下，你可以自己选择，也可以自己编写主题。

在`.zshrc`里找到`ZSH_THEME`，就可以设置主题了，默认主题是：`ZSH_THEME=”robbyrussell”`

`ZSH_THEME="random"`，主题设置为随机，这样我们每打开一个窗口，都会随机在默认主题中选择一个。

#### 插件设置：

`oh my zsh`项目提供了完善的插件体系，相关的文件在`~/.oh-my-zsh/plugins`目录下，默认提供了 100 多种，大家可以根据自己的实际学习和工作环境采用，想了解每个插件的功能，只要打开相关目录下的 `zsh` 文件看一下就知道了。插件也是在`.zshrc`里配置，找到`plugins`关键字，你就可以加载自己的插件了，系统默认加载`git`，你可以在后面追加内容，如下：

```sh
plugins=(git zsh-autosuggestions autojump zsh-syntax-highlighting)
```

##### 安装 `zsh-autosuggestions`

autosuggestions 它是 Oh-myszh 的一个插件，作用基本上是根据历史输入指令的记录即时的提示，能够很大的提高效率

```sh
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

添加至 `plugins`

##### 安装 `zsh-syntax-highlighting`

代码高亮插件可以让终端颜色更加绚丽

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

添加至 `plugins`

`plugins=(zsh-autosuggestions git zsh-syntax-highlighting)`

## 效果图

[![MarNhq.md.png](https://s2.ax1x.com/2019/11/15/MarNhq.md.png)](https://imgchr.com/i/MarNhq)

### 卸载 oh my zsh

直接在终端中，运行`uninstall_oh_my_zsh`既可以卸载。
