---
title: "一个 waline 评论系统bug引发的思考"
icon: hk-waline
date: 2024-05-23
star: true
headerDepth: 3
cover: "https://w.wallhaven.cc/full/6d/wallhaven-6d7xmx.jpg?x-oss-process=image/resize,limit_0,m_fill,w_1366,h_768/quality,Q_92/format,webp"
category:
  - Vue
tag:
  - Vue响应式
---

[[toc]]

:::tip
前言： Waline 评论系统这个 bug 有几个月了，现象就是回复完其他人的评论后，评论内容会保留在顶部输入框中，而且不会自动清空。具体见 👉[GitHub issuse #2173](https://github.com/walinejs/waline/issues/2371)

许久未见修复，正好我有空，就看看这个问题，接下来跟我一起分析一下这个问题
:::

## 1. 定位问题

问题现象上边已经描述过了，我们先来定位一下问题。

### 1.1. 关键
关键在于【不会清空】，即使刷新浏览器，也不会清空，由此可知必然保存在 localStorage 中，打开开发者工具，看看保存在 localStorage 中的数据结构。发现如下图所示

![localStorage](https://s3.bmp.ovh/imgs/2024/05/23/54fa93eb4563daea.png)

然后有了**key**就好办了

### 1.2. 源码
在 Waline 评论系统源码中，我们全局搜索 `WALINE_COMMENT_BOX_EDITOR` 结果如下

   ```ts{18,19}
   // walinejs/packages/client/src/composables/inputs.ts
   import type { RemovableRef } from '@vueuse/core';
   import { useStorage } from '@vueuse/core';

   export interface UserMeta {
       nick: string;
       mail: string;
       link: string;
   }

   export const useUserMeta = (): RemovableRef<UserMeta> =>
   useStorage<UserMeta>('WALINE_USER_META', {
       nick: '',
       mail: '',
       link: '',
   });

   export const useEditor = (): RemovableRef<string> =>
   useStorage<string>('WALINE_COMMENT_BOX_EDITOR', '');
   ```

   继续查找调用，找到`CommentBox.vue`关键组件，该组件将*textarea*评论框**v-model**与`useEditor`函数绑定，该函数返回一个`RemovableRef`，该类型为`<string>`。

   ```ts
   const editor = useEditor();
   ```

   ```vue
   <textarea
     id="wl-edit"
     ref="editorRef"
     v-model="editor"
     class="wl-editor"
     :placeholder="replyUser ? `@${replyUser}` : locale.placeholder"
     @keydown="onKeyDown"
     @drop="onDrop"
     @paste="onPaste"
   />
   ```

## 2. 调试

### 2.1. 准备工作

1.  已锁定问题文件为`CommentBox.vue`,接下来开始 debug，因为准备提 PR，所以先 fork 一份

2.  按照[waline-贡献指南](https://waline.js.org/advanced/contribution.html)进行准备

3.  先执行`pnpm i & pnpm build`,本地调试依赖`@waline/api` 需要前置 build

4.  使用 `pnpm client:dev` 启动 `@waline/client` 本地开发,由于 waline 是 Client/Server 架构，在调试 client 时，你需要设置 SERVERURL 为调试服务器（可以直接使用 vercel 的服务器），或同时启动下面的 server 开发服务器并使用默认的 `localhost:9090`。

5.  使用 `pnpm server:dev` 启动 `@waline/server` 本地开发,配置必要的本地环境变量至 `example/.env`。（这里我配置了 `leancloud` 的环境变量，一直在报错）

### 2.2. 关键函数 `CommentBox.vue`的`submitComment`和`watch`

```ts{33}
 const submitComment = async (): Promise<void> => {

     // 此处...省略若干

     try {
         if (recaptchaV3Key)
         comment.recaptchaV3 =
             await useReCaptcha(recaptchaV3Key).execute('social');

         if (turnstileKey)
         comment.turnstile = await useTurnstile(turnstileKey).execute('social');

         const options = {
         serverURL,
         lang,
         token: userInfo.value?.token,
         comment,
         };

         const response = await (props.edit
         ? updateComment({
             objectId: props.edit.objectId,
             ...options,
         })
         : addComment(options));

         isSubmitting.value = false;

         if (response.errmsg) return alert(response.errmsg);

         emit('submit', response.data!);

         editor.value = '';

         previewText.value = '';

         if (props.replyId) emit('cancelReply');
         if (props.edit?.objectId) emit('cancelEdit');
     } catch (err: unknown) {
         isSubmitting.value = false;

         alert((err as TypeError).message);
     }
 };
```

接下来看 watch

```ts{17}
watch(
  () => editor.value,
  (value) => {
    const { highlighter, texRenderer } = config.value;
    content.value = value;
    previewText.value = parseMarkdown(value, {
      emojiMap: emoji.value.map,
      highlighter,
      texRenderer,
    });
    wordNumber.value = getWordNumber(value);

    if (value) autosize(editorRef.value!);
    else autosize.destroy(editorRef.value!);
  },
  {
    immediate: true,
  }
);
```

### 2.3. 断点测试，整体流程如下

1.  监听`editor.value`，并将**editor**和**textarea**绑定,用户输入的值自动保存在**localStorage**中

2.  点击提交按钮，将**textarea**中的值发送给后端，收到回调后将**editor**清空,如果抛出异常则不清空

3.  正常提交评论无异常，在`submitComment`函数中的`editor.value = '';`将**localStorage**存储的内容清空

4.  回复他人评论时，前置流程提交和步骤 3 一致，然后触发了`watch`,此时`watch`监听到的**value**为未被清空的值，既之前用户输入的内容

5.  `submitComment`中的`editor.value = '';`和`watch`都打上了断点，先赋值为空，后触发`watch`，而此时`watch`的 value 为被清空之前的值，即用户输入的内容

### 2.4. 分析

问题已经定位到代码级别，接下来只需要找到 watch 被触发的原因即可，初步猜测可能原因：

`submitComment`是异步函数，其内部赋空值后，`editor.value=''`没有及时更新，导致`watch`触发取到旧值

遂添加 watch 的 bebug 函数加以验证

1. `onTrack` 将在响应属性或引用作为依赖项被跟踪时被调用。相当于 get
2. `onTrigger` 将在侦听器回调被依赖项的变更触发时被调用。相当于 set

```ts
watch(
  () => editor.value,
  (value) => {
    const { highlighter, texRenderer } = config.value;
    content.value = value;
    previewText.value = parseMarkdown(value, {
      emojiMap: emoji.value.map,
      highlighter,
      texRenderer,
    });
    wordNumber.value = getWordNumber(value);

    if (value) autosize(editorRef.value!);
    else autosize.destroy(editorRef.value!);
  },
  {
    immediate: true,
    onTrack(e) {
      // 当 editor.value 被追踪为依赖时触发
      debugger;
    },
    onTrigger(e) {
      // 当 editor.value 被更改时触发
      debugger;
    },
  }
);
```

结果为：

1. `editor.value=''`时，`onTrigger`触发，newValue 为`''`
2. 紧接着触发`onTrack`value 为旧值

调整回调的触发时机试试看：

- [Post Watchers](https://cn.vuejs.org/guide/essentials/watchers.html#post-watchers)

  如果想在侦听器回调中能访问被 Vue 更新**之后**的所属组件的 DOM，你需要指明 `flush: 'post'` 选项：

- [同步侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#sync-watchers)

  它会在 Vue 进行任何更新之前触发：

  > [!warning]
  > 同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。

结果是没有作用，但在更改为 sync 后，发现了一件有趣的事情，因为 sync 不会进行批处理的特性，所以触发了两次`onTrack`,我们来看一下两次的堆栈信息

![第一次](https://s3.bmp.ovh/imgs/2024/05/23/f4ffa6bb556812cc.png)

![第二次](https://s3.bmp.ovh/imgs/2024/05/23/33bc634ac459ec19.png)

很明显第一次触发是`editor.value=''`时触发的，第二次触发异步的，在`submitComment`还未执行完成时就触发了，点击堆栈信息定位到了**291**行，很明显早于`editor.value=''`的**297**行。所以取到的是旧的值，虽然断点是`editor.value=''`先执行，但`submitComment`是异步的，watch 取到的是旧值，那接下来就需要看 ==`watch`是被什么触发了==

由于源码中的`watch`是写在`onMounted`中的，断点确定二次走到`watch`中时，是触发了`onMounted`，那触发`onMounted`是组件重新加载了，查找后得知，整体逻辑是，评论区域，代码结构如下：

- 组件为`WalineComment.vue`,其中包含了评论列表组件 item`CommentCard.vue`和顶部默认输入框`CommentBox.vue`
- 针对文章发布评论使用的是顶部的`CommentBox.vue`组件
- 针对评论回复时，使用的是`CommentCard.vue`-`CommentBox.vue`

- 回复完成后`CommentCard.vue`-`CommentBox.vue`销毁，顶部的`CommentBox.vue`组件重新渲染

==顶部的`CommentBox.vue`组件重新渲染会触发 watch，此时取值是旧值，== 经查看，`submitComment`中的`editor.value=''`执行完后， `localStorage` 中的值并未立即修改，所以重新渲染的顶部`CommentBox.vue`组件在初始化时取到的值仍为`localStorage`中的旧值。

## 3. 验证

上边已经基本确定问题出在这句上

```ts
editor.value = "";
```

```ts
const editor = useEditor();
```

而在 [1.2](#_1-2-源码) 中可以看到`useEditor()`是`@vueuse/core`的导出函数,怀疑其内部实现有一些异步操作，导致的没有立即更新`localStorage`

```ts
// 更换`editor.value`为
localStorage.setItem('WALINE_COMMENT_BOX_EDITOR', '');
// 或
await nextTick()
```
### 3.1. 至此问题解决

:::info
**nextTick()**

等待下一次 DOM 更新刷新的工具方法。
- 类型

```ts
function nextTick(callback?: () => void): Promise<void>
```
- 详细信息

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

**nextTick()** 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。
:::


## 4. 思考
在[vueusejs](https://www.vueusejs.com/core/useStorage/#usage)的文档中，其实`useStorage`应该是一个同步操作，它还有一个`useStorageAsync`的API，支持异步的响应式Storage，按理说里边不应该包含太多异步的或者延时性的代码，我也找到源码浅浅看了一下，目前还没找到问题在哪里，按照替换`localStorage.setItem('WALINE_COMMENT_BOX_EDITOR', '');`可行来看，问题就在`useStorage`身上无疑，后续有时间，会继续探索一下，给官方的PR[#2524](https://github.com/walinejs/waline/pull/2524)也已经提了


