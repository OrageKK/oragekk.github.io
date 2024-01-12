---
title: Git SSH 密钥配置
icon: safe
date: 2024-01-11
category:
  - Git
tag:
  - ssh_key
---

## 在 GitLab 中配置 SSH 密钥

### 生成 SSH 密钥对

如果您还没有 SSH 密钥对，请首先生成一对密钥。在终端中执行以下命令：

```sh
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
```

这将生成一个 RSA 类型的密钥对，并将私钥保存在 `~/.ssh/id_rsa`，公钥保存在 `~/.ssh/id_rsa.pub`。

### 复制公钥内容

打开公钥文件 **~/.ssh/id_rsa.pub**，将其中的内容复制到剪贴板。您可以使用以下命令来完成：

**macOS:**
```sh
pbcopy < ~/.ssh/id_rsa.pub
```
**GNU/Linux (requires the xclip package):**
```sh
xclip -sel clip < ~/.ssh/id_rsa.pub
```
**Windows Command Line:**
```sh
type %userprofile%\.ssh\id_rsa.pub | clip
```
**Git Bash on Windows / Windows PowerShell:**
```sh
cat ~/.ssh/id_rsa.pub | clip
```

### 将您的SSH密钥添加到GitLab。

1. 登录到 GitLab

2. 打开您的 GitLab 帐户，在右上角点击个人头像，选择设置

3. 在左侧导航到 SSH 密钥设置

4. 在 "SSH Keys" 页面，粘贴之前复制的公钥内容到 "Key" 字段中，并为该密钥添加一个可识别的标题（如 "My SSH Key"）。然后点击 "Add Key" 按钮。

### 验证 SSH 密钥

GitLab 将验证并添加您提供的 SSH 密钥。如果一切顺利，您将在页面上看到成功的消息。

### 测试 SSH 连接

为了确保 SSH 密钥配置正确，您可以在终端中执行以下命令进行测试：

```bash
ssh -T git@gitlab.com
```

如果配置正确，您将看到与 GitLab 相关的欢迎消息。
现在，您已经成功在 GitLab 中配置了 SSH 密钥。这将允许您通过 SSH 协议进行与 GitLab 之间的安全通信，例如进行代码的克隆、推送和拉取操作。

:::important
我们建议您使用ssh密钥而非用户名密码登录

因为有些情况比如更换git客户端、或者某些自动化脚本，是无法使用用户名密码登录的

对于macOS用户，我强烈建议您添加以下命令到zsh的配置文件 `~/.zprofile`中
```sh
ssh-add --apple-use-keychain ~/.ssh/id_rsa &> /dev/null
```
该命令的作用是将指定的 SSH 私钥文件 id_rsa 添加到 Apple Keychain 中，并将输出静默地丢弃，以确保在终端上不会显示任何输出信息。这通常用于在登录时自动加载 SSH 密钥，并将其保存在钥匙串中，以便在需要时无需再次手动输入密码或密钥口令。
:::