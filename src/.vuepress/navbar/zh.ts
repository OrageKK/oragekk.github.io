import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "演示", icon: "discover", link: "/demo/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "苹果",
        icon: "edit",
        prefix: "apple/",
        children: [
          { text: "苹果1", icon: "edit", link: "1" },
          { text: "苹果2", icon: "edit", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "edit",
        prefix: "banana/",
        children: [
          {
            text: "香蕉 1",
            icon: "add",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "edit",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "edit", link: "cherry" },
      { text: "火龙果", icon: "edit", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "留言板",
    icon: "mark",
    link: "/visitorsbook",
  },
  {
    text: "关于",
    icon: "info",
    link: "/about",
  },
]);
