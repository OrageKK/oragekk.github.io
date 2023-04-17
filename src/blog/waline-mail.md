---
shortTitle: "Waline 之邮件通知配置"
date: 2023-03-29
icon: waline
star: true
category:
  - Blog
tag:
  - Blog
---

# 评论插件 Waline 之邮件通知配置

:::: info ✨
陆续优化中……这次到了评论的邮件通知，由于 waline 带后端，可以开启评论通知，我是部署在 Vercel 上的，配置一下就可以了，模版要感谢[小波同学](https://blog.ganxb2.com/)

前置注意点

1.邮件要注意每日发信限制，短时密集评论会导致直接被封，禁止发信

2.最好不要使用自己平常使用的邮箱，使用一个单独的邮箱来操作

3.有服务器的同学，自己部署SMTP服务可以不受限制
::::

老规矩先放效果图:

![show](https://s3.bmp.ovh/imgs/2023/03/29/8958076dc393c8df.png)

## 1. waline 官方邮件通知环境变量说明[^1]

### 1.1 waline 邮件通知必填环境变量
`SMTP_SERVICE: SMTP` 邮件发送服务提供商。例如 163 在受支持的运营商列表可以直接填写 163

:::tip

你可以在 [这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) 查看所有支持的运营商。

如果你的运营商不受支持，你必须填写 `SMTP_HOST 和 SMTP_PORT`。

- `SMTP_HOST`: SMTP 服务器地址，一般可以在邮箱的设置中找到。

- `SMTP_PORT`: SMTP 服务器端口，一般可以在邮箱的设置中找到。

:::

`SMTP_USER`: SMTP 邮件发送服务的用户名，一般为登录邮箱【切记要完整填写xxx@xxx.xx】。

`SMTP_PASS`: SMTP 邮件发送服务的密码，一般为邮箱登录密码，部分邮箱(例如 163)是单独的 SMTP 密码。 [^2]

`SMTP_SECURE`: 是否使用 SSL 连接 SMTP。

`SITE_NAME`: 网站名称，用于在消息中显示。

`SITE_URL`: 网站地址，用于在消息中显示。

`AUTHOR_EMAIL`: 博主邮箱，用来接收新评论通知。如果是博主发布的评论则不进行提醒通知。

::: tip 注意

其中`SITE_NAME`如果有类似 `xxxx's Blog` 这种的网站名称，在 Vercel 中配置的时候，可以使用`xxxx Blog` 格式
因为`'`单引号会在模版中被转义为`&#39;s`

:::

### 1.2 waline 邮件通知选填环境变量

`SENDER_NAME`: 自定义发送邮件的发件人

`SENDER_EMAIL`: 自定义发送邮件的发件地址

::: tip 注意

其中`SENDER_NAME`和`SENDER_EMAIL` 要成对出现

:::


### 1.3 waline 邮件通知模版环境变量

`MAIL_SUBJECT`: 自定义评论回复邮件标题

`MAIL_TEMPLATE`: 自定义评论回复邮件内容

`MAIL_SUBJECT_ADMIN`: 自定义新评论通知邮件标题

`MAIL_TEMPLATE_ADMIN`: 自定义新评论通知邮件内容

### 1.4 waline邮件通知模版index.js服务端配置参数
 - `mailSubject` 类型: string

    评论回复邮件标题自定义，等同于环境变量 `MAIL_SUBJECT`。

- `mailTemplate` 类型: string

    评论回复邮件内容自定义，等同于环境变量 `MAIL_TEMPLATE`。
    
- `mailSubjectAdmin` 类型: string

    新评论通知邮件标题自定义，等同于环境变量 `MAIL_SUBJECT_ADMIN`。

- `mailTemplateAdmin` 类型: string

    新评论通知邮件内容自定义，等同于环境变量 `MAIL_TEMPLATE_ADMIN`。

::: tip
自此以下配置都是关于邮件模版的，1.3和1.4二选一配置即可，1.1是必填配置，自行填写即可。
:::

## 2.根据部署方式选择合适的邮件模版修改方法

### 2.1 vercel 

 - 环境变量[^3]
 - 私有walie仓库index.js文件【推荐】

### 2.2 独立部署

 - 修改服务端入口文件index.js

::: warning 注意

如果你使用模板，请额外注意你需要自行保存这些配置，因为它们会在拉取官方最新模板时被覆盖。

建议将官方最新模板上传到自己的仓库，并进行修改。

:::

## 3.开始配置

### 3.1 设置完毕1.1中Vercel配置必须的环境变量

![1.1](https://s3.bmp.ovh/imgs/2023/03/29/ab416544129053c3.png)

### 3.2 继续使用环境变量设置模版

`MAIL_SUBJECT_ADMIN`
```js
{{site.name | safe}} 上有新评论了
```
`MAIL_TEMPLATE_ADMIN`
```html
<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}"target="_blank">{{site.name}}</a>上的文章有了新的评论</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p><strong>{{self.nick}}</strong> 回复说：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p style="text-align:center;position: relative;z-index: 99;">您可以点击<a style="text-decoration:none;color:#cf5c83" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">
			<p class="bottomhr" style="font-size:12px;text-align:center;color:#999">上冬十二(oragekk)博客竭诚为您服务！</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>
```
`MAIL_SUBJECT`
```js
{{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复

```

`MAIL_TEMPLATE`
```html
<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;z-index:-100;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}">『{{site.name | safe}}』</a>上的留言有新回复啦！</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p>😊Hi，{{parent.nick}}，您曾在文章上发表评论：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{parent.comment | safe}}</div>
			<p><strong>{{self.nick}}</strong> 给您的回复如下：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p>您可以点击<a style="text-decoration:none; color:#cf5c83" href="{{site.postUrl}}" target="_blank"> 查看回复的完整內容 </a>，欢迎再次光临<a style="text-decoration:none; color:#cf5c83" href="{{site.url}}" target="_blank"> {{site.name}} </a>。<hr />
			<p style="font-size:14px;color:#b7adad;text-align:center;position: relative;z-index: 99;">本邮件为系统自动发送，请勿直接回复邮件哦，可到博文内容回复。<br />{{site.url}}</p>
			</p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">
			<p class="bottomhr" style="font-size:12px;text-align:center;color:#999">上冬十二(oragekk)博客竭诚为您服务！</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>
```

### 3.3 使用服务端入口文件index.js变量设置模版

文件初始内容为:
```js
const Application = require('@waline/vercel');

module.exports = Application({
    async postSave(comment) {
        // do what ever you want after save comment
    },
});
```

:::danger 注意!!!
在我查阅资料的过程中，发现很多教程中填写index.js的方式都是错误的，如下:
```js
const Application = require('@waline/vercel');

module.exports = Application({
    async postSave(comment) {
        // do what ever you want after save comment
        mailSubjectAdmin: '{{site.name | safe}} 上有新评论了',
        ……
    },
});
```
这就是导致很多人index.js配置不成功的原因，把模版配置写在了postSave这个钩子函数里边,在Vercel部署的过程中就会直接报错，语法不正确
:::

正确使用姿势:
```js
const Application = require('@waline/vercel');

module.exports = Application({
    async postSave(comment) {
        // do what ever you want after save comment
    },
    mailSubjectAdmin: '{{site.name | safe}} 上有新评论了',
    mailTemplateAdmin: `<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}"target="_blank">{{site.name}}</a>上的文章有了新的评论</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p><strong>{{self.nick}}</strong> 回复说：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p style="text-align:center;position: relative;z-index: 99;">您可以点击<a style="text-decoration:none;color:#cf5c83" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">
			<p class="bottomhr" style="font-size:12px;text-align:center;color:#999">上冬十二(oragekk)博客竭诚为您服务！</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>`,
    mailSubject: '{{parent.nick}}，您在『{{site.name}}』上发表的评论收到了来自 {{self.nick}} 的回复',
    mailTemplate: `<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;z-index:-100;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}">『{{site.name | safe}}』</a>上的留言有新回复啦！</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p>😊Hi，{{parent.nick}}，您曾在文章上发表评论：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{parent.comment | safe}}</div>
			<p><strong>{{self.nick}}</strong> 给您的回复如下：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p>您可以点击<a style="text-decoration:none; color:#cf5c83" href="{{site.postUrl}}" target="_blank"> 查看回复的完整內容 </a>，欢迎再次光临<a style="text-decoration:none; color:#cf5c83" href="{{site.url}}" target="_blank"> {{site.name}} </a>。<hr />
			<p style="font-size:14px;color:#b7adad;text-align:center;position: relative;z-index: 99;">本邮件为系统自动发送，请勿直接回复邮件哦，可到博文内容回复。<br />{{site.url}}</p>
			</p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">
			<p class="bottomhr" style="font-size:12px;text-align:center;color:#999">上冬十二(oragekk)博客竭诚为您服务！</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>`
});
```

### 4. 结语
至此，大功告成，所有的注意点我都写在上边了

此模版来自SaraKale[^4]，经[小波同学](https://blog.ganxb2.com/)修改美化
其他模版同理，可以去SaraKale这里看看

[^1]: https://waline.js.org/guide/features/notification.html
[^2]: 如 163 的 SMTP 授权码只生成一次，要复制存下来，如果丢失，后续不会再显示，只能重新生成
[^3]: Vercel 的环境变量大小限制为 4KB ，所以如果您的模板很长，请使用代码配置，
[^4]:[waline 邮件通知模板样式一览](https://www.sarakale.top/blog/posts/537344b2.html)
