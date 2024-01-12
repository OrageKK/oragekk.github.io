---
title: "Jenkins 远程触发构建踩坑记"
description: "CSRF crumbk,Jenkins,"
icon: "shell"
date: 2024-01-12
isOriginal: true
order: 1
category:
  - 工具教程
tag:
  - Jenkins
---

:::tip
如果想在代码 Push 后，或者 Merge request 后，自动部署，可以采用多种方案，以下介绍两种

不知道如何配置的同学，可以参考一下
:::

## 1. 通过 Jenkins 提供的【触发远程构建】

### 1.1. 勾选【触发远程构建】并填入 token

![勾选远程构建开关](https://s3.bmp.ovh/imgs/2024/01/12/45009f0747ed807a.png)

### 1.2. 配置 API token

1. 打开 Jenkins 控制台。

2. 在顶部导航栏中，点击您的用户名，然后选择 "Configure" 选项。

3. 在配置页面中，向下滚动，找到 "API Token" 部分。

4. 如果您之前没有生成过 API Token，则点击 "Add new Token" 或 "Generate Token" 按钮。

5. 在生成或更改 Token 的过程中，您可能需要提供您的 Jenkins 用户密码进行身份验证。

6. 生成或更改成功后，您将看到新生成的 Token 值。请将其复制并妥善保存，因为在以后的访问中，您将无法再查看该 Token 的值。

### 1.3. 如何调用 Url

Jenkins 提供了便捷的远程触发功能，但是需要配置一个 token，然后在 push 后，通过 post 请求，调用 Jenkins 的 url 即可触发构建

调用 url 可以使用 python 脚本，或者 curl 命令，一般配合 git 提交，使用 curl 命令居多

下面以 GitLab CI/CD 为例进行举例

GitLab CI/CD 是一个简洁好用的的持续集成/持续交付的框架。通过为你的项目配置一个或者多个 GitLab Runner，然后撰写一个 .gitlab-ci.yml，你就可以很方便地利用 GitLab CI/CD 来为你的项目引入持续集成/交付的功能。比较类似之前介绍过的[GitHubAction](../github/github-action.html)

GitLab CI/CD 是通过 GitLab Runner 来执行的

GitLab CI/CD 将按照 Stage 定义的顺序来执行，任何一个 Stage 失败，整个 CI/CD 将失败

每一个 Stage 可以被若干个 Job 关联。Stage 在执行的时候，关联到这个 Stage 的所有 Job 都将被执行，不过不同的 Job 可能是并行执行的。

每个 Job 在执行的时候，会先按照缓存策略加载缓存数据，然后按照顺序依次运行 before_script、script 和 after_script 中配置的脚本，运行完毕以后，会将生成的数据保存到缓存中。

### 1.4. 编写.gitlab-ci.yml

```yaml
stages:
  - deploy

deploy_to_hyjk_open-x:
  stage: deploy
  only:
    - master
  script:
    - ./deploy.sh
```

大意是当 master 分支 deploy 时执行 ./deploy.sh 脚本
这里 script 调用了一个 shell 脚本，因为在 yml 文件中写脚本比较麻烦，个人比较习惯在 sh 文件中写脚本，然后在 yml 文件中调用这个脚本即可

### 1.5.  `deploy.sh`

由于新版本的 Jenkins 安全机制，每次调用 API 前都需要先调用获取获取 CSRF crumb 值的接口

下面脚本演示了，如何先获取 crumb 的值，并在之后触发远程构建 API 的时候，携带这个值

```sh
#!/bin/bash

# Jenkins 服务器信息
JENKINS_URL="http://192.168.155.57:8080/"
JENKINS_USERNAME="admin"
JENKINS_API_TOKEN="11abf441f4db6e341ae65b660f74de6e02"

# 获取 CSRF crumb 值
CRUMB=$(curl -s -u "$JENKINS_USERNAME:$JENKINS_API_TOKEN" "$JENKINS_URL/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")

# 提取 crumb 值
CRUMB_VALUE=$(echo "$CRUMB" | awk -F':' '{print $2}')

# 执行 Jenkins 远程构建
curl -X POST "$JENKINS_URL/job/projectName/build?token=xZ7Y3n9A" \
  --user "$JENKINS_USERNAME:$JENKINS_API_TOKEN" \
  --header "Jenkins-Crumb: $CRUMB_VALUE"
```

## 2. 通过 GitLab 的 **webhook** 触发远程构建

使用 gitlab 的 **webhook** 配合 Jenkins 实现自动化部署。
Jenkins 需要安装 GitLab Plugin 插件，然后配置 **webhook** 即可。

### 2.1. 勾选插件选项

![勾选插件选项](https://s3.bmp.ovh/imgs/2024/01/12/fe222283253f58a1.png)

### 2.2. 选择配置

插件有很多配置项，这里我们常用的就是过滤分支，可以选择，有以下选项

- **Include**
- **Exclude**
- **正则表达式**
- **tag**

![设置token](https://s3.bmp.ovh/imgs/2024/01/12/893d0e7b5ca4e1b9.png)

### 2.3. 将生成的 url 和 token 填入 GitLab 中

可以选择触发的 events
![填入GitLab](https://s3.bmp.ovh/imgs/2024/01/12/525dcea85ba7ae20.png)

### 2.4. 查看运行结果

![查看运行结果](https://s3.bmp.ovh/imgs/2024/01/12/b5afe5d3321e17da.png)
