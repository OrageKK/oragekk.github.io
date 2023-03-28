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
      text: "文章",
      icon: "note",
      prefix: "posts/",
      // collapsible: true,
      children: [
        {
          text: "iOS",
          icon: "hk-apple",
          link: "iOS/",
          prefix: "iOS/",
          children: ["swift/", "source/", "other/"],
        },
        {
          text: "跨平台开发",
          icon: "relation",
          link: "cross-platform/",
          prefix: "cross-platform/",
          children: ["Flutter/", "ReactNative/"],
        },
        {
          text: "前端开发",
          icon: "code",
          link: "Web/",
          prefix: "Web/",
          children: ["Vue/", "JavaScript/", "node/"],
        },
        {
          text: "Linux",
          icon: "linux",
          prefix: "Linux/",
          link: "Linux/",
          children: ["iterm2-pure"],
        },
        {
          text: "Python",
          icon: "python",
          prefix: "Python/",
          link: "Python/",
          children: ["submit-bing"],
        },
      ],
    },
    {
      text: "收藏",
      icon: "hk-shoucang1",
      prefix: "mark/",
      children: "structure",
    },
    {
      text: "生活",
      icon: "flower",
      prefix: "private/",
      children: "structure",
      collapsible: true,
    },
    "friend",
    "intro",
  ],
  "/posts/Linux/": [
    {
      text: "返回目录",
      icon: "return",
      link: "/demo/",
    },
    {
      text: "Linux",
      icon: "linux",
      link: "/posts/Linux/",
      children: "structure",
    },
  ],
  "/posts/Python/": [
    {
      text: "返回目录",
      icon: "return",
      link: "/demo/",
    },
    {
      text: "Python",
      icon: "python",
      link: "/posts/Python/",
      children: "structure",
    },
  ],
  "/posts/cross-platform/Flutter/": [
    {
      text: "返回目录",
      icon: "return",
      link: "/demo/",
    },
    {
      text: "Flutter",
      icon: "hk-flutter",
      link: "/posts/cross-platform/Flutter/",
      children: "structure",
    },
  ],
  "/posts/cross-platform/ReactNative/": [
    {
      text: "返回目录",
      icon: "return",
      link: "/demo/",
    },
    {
      text: "ReactNative",
      icon: "react",
      link: "/posts/cross-platform/ReactNative/",
      children: "structure",
    },
  ],
  "/posts/iOS/": [
    {
      text: "返回目录",
      icon: "return",
      link: "/demo/",
    },
    {
      text: "iOS",
      icon: "hk-apple",
      link: "/posts/iOS/",
      children: "structure",
    },
  ],
  "/posts/Web/": [
    {
      text: "返回目录",
      icon: "return",
      link: "/demo/",
    },
    {
      text: "前端开发",
      icon: "code",
      link: "/posts/Web/",
      children: "structure",
    },
  ],
  "/mark/": [
    {
      text: "收藏",
      icon: "hk-shoucang1",
      children: "structure",
    },
  ],
});
