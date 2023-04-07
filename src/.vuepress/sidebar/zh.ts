import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "代码笔记",
      icon: "note",
      prefix: "posts/",
      // collapsible: true,
      children: [
        {
          text: "iOS",
          icon: "hk-apple",
          prefix: "iOS/",
          collapsible: true,
          children: ["swift/", "source/", "other/", "tool/", "system/", "ui/"],
        },
        {
          text: "跨平台开发",
          icon: "relation",
          prefix: "cross-platform/",
          collapsible: true,
          children: ["Flutter/", "ReactNative/"],
        },
        {
          text: "前端开发",
          icon: "code",
          prefix: "Web/",
          collapsible: true,
          children: ["Browser/", "JavaScript/", "CSS/", "node/", "Vue/"],
        },
        {
          text: "Linux",
          icon: "linux",
          prefix: "Linux/",
          collapsible: true,
          children: "structure",
        },
        {
          text: "Python",
          icon: "python",
          prefix: "Python/",
          collapsible: true,
          children: "structure",
        },
      ],
    },
    {
      text: "收藏",
      icon: "hk-shoucang1",
      prefix: "mark/",
      link: "mark/",
      children: "structure",
    },
    {
      text: "随笔",
      icon: "flower",
      prefix: "private/",
      children: "structure",
    },
    "intro",
  ],
  "/posts/Linux/": "structure",
  "/posts/Python/": "structure",
  "/posts/cross-platform/Flutter/": "structure",
  "/posts/cross-platform/ReactNative/": "structure",
  "/posts/iOS/": "structure",
  "/posts/Web/": "structure",
  "/mark/": "structure",
  "/blog":"structure",
});
