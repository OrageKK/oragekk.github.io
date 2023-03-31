import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "导航", icon: "discover", link: "/demo/" },
  {
    text: "笔记分类",
    icon: "edit",
    prefix: "/posts/",
    children: [
      { text: "iOS笔记", icon: "hk-apple", link: "iOS/" },
      { text: "前端笔记", icon: "code", link: "Web/" },
      { text: "Linux", icon: "linux", link: "Linux/" },
      { text: "Python", icon: "python", link: "Python/" },
      { text: "React", icon: "react", link: "cross-platform/ReactNative/" },
      { text: "Flutter", icon: "hk-flutter", link: "cross-platform/Flutter/" },
    ],
  },
  {
    text: "收藏",
    icon: "hk-shoucang1",
    link: "/mark",
  },
  {
    text: "留言板",
    icon: "mark",
    link: "/visitorsbook",
  },
  {
    text: "友链",
    icon: "link",
    link: "/friend",
  },
  {
    text: "关于",
    icon: "info",
    link: "/about",
  },
]);
