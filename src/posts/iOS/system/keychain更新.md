---
title: "iOS 10.3 keychain 重大更新"
date: 2017-03-14
category:
  - iOS
tag:
  - iOS
---

> 转载自微信公众号《Mrpeak 杂货铺》

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2076247-1b07e63d35825ce7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

iOS 10.3 还未正式发布，beta 版中一个关于 keychain 特性的小修改，就已经引起了广泛的关注。

改动如下

- 如果 App 被删除，之前存储于 keychain 中的数据也会一同被清除。
- 如果使用了 keychain group，只要当 group 所有相关的 App 被删除时，keychain 中的数据才会被删除。

这一改动，虽未经官方公布。但已在论坛帖子里得到了 Apple 员工的确认，原文如下：

> This is an intentional change in iOS 10.3 to protect user privacy. Information that can identify a user should not be left on the device after the app that created it has been removed.

> It has never been a part of the API contract that keychain items created by an app would survive when the app is removed. This has always been an implementation detail.

> If a keychain item is shared with other apps, it won’t be deleted until those other apps have been deleted as well.

心存侥幸的人可能会觉得这只是正常的 API 调整，会有新的存储机制做替补。在我看来，这种可能性极低。正如上面这段英文所述，Apple 这一改动是基于用户隐私的考虑，改动之后，开发者将没法再根据设备号来追踪设备的唯一性。结合最近 JSPatch 这类热更新机制被禁来看，Apple 近期似乎在用户隐私和安全方面有相当的规划和动作。

Apple 对于开发者的每次动作都有让人无法反驳的立场，用户隐私当然很重要。谈论其合理性其实并没有什么意义，因为这不会影响最终结果，我们只能拥抱变化，早作准备。

这次改动影响究竟有多大呢？没用到 keychain 特性还好，如有涉及，其影响可能比大部分人想象的要大，以下是我所能预知的一部分：

### 重装需登录

无法追踪设备，用户删掉一个 App，之后再重装就只能手动登录一次了。

很多 App 都有类似的功能，重装的时候不需要再次登录，比如 WhatsApp，知乎等，这对用户体验更好一些。这种用户场景下，App 的本意虽然不是追踪用户设备，但很不幸，开发者已经不能判断是否为同一设备的再次登录了。

### 基于设备的免费试用功能无法实现了

有不少 App 的试用功能都是基于账户或者基于设备的，基于设备的会更多一些，因为如果是基于账户，在同一个设备上更换账户还不算太麻烦，而用户更换设备的成本更高。但新版本 keychain 更改之后，用户如果删掉 App 重装，开发者无法判断试用功能是否已经试用过了。

这种基于设备的免费试用场景也不少，比如一些可以免费试用 7 天的 VPN App。

### 短信费用上升

这方面的影响就是直接和真金白银挂钩了。

现在不少基于熟人社交的 App 都是以用户的手机号为 ID 注册的，每次注册都要花费一条平台的短信费用。不少 App 为了节省费用，在用户删除重装之后登录的场景，都是直接从 keychain 读出以前的登录信息，绕过短信验证直接登进去的。iOS 10.3 之后，就无法再绕过了，必须在重装时再花一条短信的钱来验证用户。

不要小看了这一条短信的费用，对于财大气粗的大公司来说还好，但对于锱铢必较的创业团队来说，这些额外的开销就是一笔冤枉钱了。

### 总结

对于跟踪用户和设备，Apple 的管控越来越严，从最初的设备 ID，到 Mac 地址，到今天 keychain 的调整。每一次看似一个小的更改，影响面却很广。不知道大家是否有使用 keychain 来做持久化存储方案，是否会因为这次调整受到影响，如果不能跨越 App 的生命周期，真不知道 keychain 还有什么存在的意义，各位要早作准备了。
