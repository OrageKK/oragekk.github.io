---
title: "通过UserAgent判断设备"
icon: mobile
date: 2017-02-07
category:
  - JavaScript
tag:
  - JavaScript
  - 前端开发
---

> 通过 js 判断 moblie 端和 pc 端进而加载不同的 css 或者 js

## 废话不多说，上代码

```js
<script type="text/javascript">
function browserRedirect() {
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
// document.writeln("您的浏览设备为：");
if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

// alert("手机浏览！");


} else {

// alert("PC浏览！");
document.write("<script type='text/javascript' size='150' alpha='0.8' zIndex='-10' src='../js/dist/ribbon.js'><\/script>");
document.write("<script type='text/javascript' color='0,188,212' opacity='0.7' zIndex='-2' count='99' src='http://cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js'><\/script>");
	}
}
browserRedirect();
</script>

```

### 需要注意的是字符转义和引号嵌套的问题
