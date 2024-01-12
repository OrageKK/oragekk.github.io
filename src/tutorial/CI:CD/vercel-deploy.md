---
title: "Vercel deploy忽略指定分支"
icon: "launch"
description: "Vercel Ignored Build Step使用"
date: 2023-03-31
star: true
isOriginal: true
order: 2
category:
  - Vercel
tag:
  - Vercel
---
[[toc]]

一招教你解决Vercel deploy时总是任意分支都可以触发，如果你的项目有多个分支，可以指定某一个或几个有提交时触发deploy
<!-- more -->
## 1. 前言
:::tip 
这不是刚把博客部署从GitHub Pages转移到了Vercel上，稍微加快了一点国内的访问速度，然后发现了一个新问题~

原先是推送到`main`分之，通过Github Action 工作流进行部署到`gh-page` 分支上

转移到Vercel之后，工作流我并没有删掉，所以流程还是一样，就导致`main`提交了--->Action---->`gh-page`提交

会触发两次Vercel的部署，当然`gh-page`是存放静态页面的分支，buid肯定是失败的。下边来解决这个问题吧
:::

## 2. 步骤

如图所示，打开setting-Git-Ignored Build Step

启用“忽略构建步骤”字段。如果命令返回“0”，则将跳过构建。但是，如果返回代码“1”或更大，则将生成新的部署。

我是使用系统环境变量来做的，方式有很多，看自己方便吧，在Command处输入以下脚本表示只构建main分支

```bash
if [ "$VERCEL_GIT_COMMIT_REF" == "main" ]; then exit 1; else exit 0; fi
```

系统环境变量默认是曝光的，如果不生效，在Environment Variables 中勾选 

- [x] Automatically expose System Environment Variables

![setting-Git-Ignored Build Step](https://s3.bmp.ovh/imgs/2023/03/31/5ae4ba35bd181dcf.png)

## 3. 使用脚本

要在“忽略构建步骤”中运行 bash 脚本，您需要在该字段中设置以下内容：请注意该文件应该存在于您的存储库中。 bash 脚本示例： bash script.shbash 脚本的示例：`bash script.sh`

**注意** 您也可以使用 Node 脚本（例如 ）。`node ignore-step.js`

```bash
#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;


else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
```



一个示例 Ignored Build Step 脚本，其中只允许部署对生产环境所做的提交。应将环境变量“VERCEL_ENV”添加到您的项目中。

通过使用此命令，Vercel 将仅在“VERCEL_ENV”的值为“production”时构建部署。该变量已添加到环境变量 UI，使其可用于项目。

## 4. [使用环境变量](#_7-系统环境变量一览表)

您可以直接在 Ignored Build Step 字段中创建引用系统环境变量的命令：

```bash
if [ "$VERCEL_ENV" == "production" ]; then exit 1; else exit 0; fi
```



一个示例 Ignored Build Step 命令，其中只允许部署对生产环境所做的提交。

下面是一个示例脚本，它将有条件地构建某些分支：

```bash
#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"


if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
```



一个示例 Ignored Build Step 命令，其中只允许部署从分支“main”和“staging”进行的提交。

## 5. 使用文件夹和工作区

在继续之前，请记住 Ignored Build Step 在您选择的“根目录”的同一文件夹中运行。因此，您可能需要稍微调整一下以适应您的需要。要构建仅考虑特定文件夹的新部署，您可以使用以下命令

```bash
git diff HEAD^ HEAD --quiet ./packages/frontend/
```



“忽略构建步骤”命令的示例。如果将更改提交给“./packages/frontend/”，该命令将产生一个非空响应，从而允许构建继续进行。
通过使用此命令，Vercel 将仅在目录内进行更改时构建部署。如果该文件夹是您选择的“根目录”，则可以使用：`packages/frontend/``./packages/frontend/`

```bash
git diff HEAD^ HEAD --quiet .
```



“忽略的生成步骤”命令的示例。如果将更改提交到 “.”，则该命令将生成非空响应，从而允许继续生成。

您还可以访问部署中的其他文件夹以检查更改。如果您在构建前端时选择了“根目录”，并且您的应用程序必须仅在进行更改时部署，您可以使用： `packages/web` `../../packages/docs`

```bash
git diff HEAD^ HEAD --quiet ../../packages/docs
```



“忽略的生成步骤”命令的示例。如果将更改提交到“../../packages/docs“，该命令将产生一个非空响应，允许构建继续。

## 6. 在本地调试命令

要在本地调试忽略的构建步骤命令，首先使用可以复制 Vercel 上可用设置的文件夹非常重要。为此，您可以应用以下步骤：

1. 使用 将存储库克隆到另一个文件夹。`git clone --depth=10 (...)`
2. 在终端中运行命令或脚本。
3. 您可以使用 检查最后一个命令返回的退出代码。`echo $?`

## 7. 系统环境变量一览表

| 名字                             | 描述                                                         |
| :------------------------------- | :----------------------------------------------------------- |
| `VERCEL`                         | 指示应用已在 Vercel 上部署和运行的指示器。 例：。`1`         |
| `CI`                             | 指示代码在[持续集成](https://en.wikipedia.org/wiki/Continuous_integration)环境中运行的指示器。 例：。 **注意：** 此变量仅在[构建步骤](https://vercel.com/docs/concepts/deployments/configure-a-build)期间公开。`1` |
| `VERCEL_ENV`                     | 部署和运行应用[的环境](https://vercel.com/docs/concepts/projects/environment-variables#environments)。该值可以是 、 或 。`production``preview``development` |
| `VERCEL_URL`                     | [生成的部署 URL](https://vercel.com/docs/concepts/deployments/generated-urls) 的域名。例：。该值不包括协议方案。`*.vercel.app``https://` |
| `VERCEL_REGION`                  | 运行应用的[区域的](https://vercel.com/docs/concepts/edge-network/regions) ID。 例：。 **注意：** 此变量仅在[无服务器函数](https://vercel.com/docs/concepts/functions)的运行时公开。`cdg1` |
| `VERCEL_GIT_PROVIDER`            | 从中触发部署的 Git 提供程序。 例：。`github`                 |
| `VERCEL_GIT_REPO_SLUG`           | 从中触发部署的源存储库。 例：。`my-site`                     |
| `VERCEL_GIT_REPO_OWNER`          | 拥有从中触发部署的存储库的帐户。 例：。`acme`                |
| `VERCEL_GIT_REPO_ID`             | 从中触发部署的存储库的 ID。 例：。`117716146`                |
| ==`VERCEL_GIT_COMMIT_REF`==      | 触发部署的提交的 git 分支。 例：。`improve-about-page`       |
| `VERCEL_GIT_COMMIT_SHA`          | 触发部署的提交的 git [SHA](https://help.github.com/articles/github-glossary/#commit)。 例：。`fa1eade47b73733d6312d5abfad33ce9e4068081` |
| `VERCEL_GIT_COMMIT_MESSAGE`      | 附加到触发部署的提交的消息。 例：。`Update about page`       |
| `VERCEL_GIT_COMMIT_AUTHOR_LOGIN` | 附加到部署项目的提交作者的用户名。 例：。`johndoe`           |
| `VERCEL_GIT_COMMIT_AUTHOR_NAME`  | 附加到部署项目的提交的作者的名称。 例：。`John Doe`          |
| `VERCEL_GIT_PREVIOUS_SHA`        | 项目和分支的上次成功部署的 git [SHA](https://help.github.com/articles/github-glossary/#commit)。 例：。 **注意：** 仅当提供了[忽略的生成步骤](https://vercel.com/docs/concepts/projects/overview#ignored-build-step)时，才会公开此变量。`fa1eade47b73733d6312d5abfad33ce9e4068080` |
| `VERCEL_GIT_PULL_REQUEST_ID`     | 触发部署的拉取请求 ID。如果在发出拉取请求之前在分支上创建了部署，则此值将为空字符串。 例：。`23` |