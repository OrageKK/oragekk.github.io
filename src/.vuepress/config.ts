import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { ohmylive2dPlugin } from "vuepress-plugin-oh-my-live2d";
import { ribbonPlugin } from "./plugins/vuepress-plugin-ribbon";
import theme from "./theme.js";
import { live2DAssistPlugin } from "./plugins/vuepress-plugin-live2DAssist";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  head: [
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    // ["script", { src: "/special/love.js" }],
    ["script", { src: "/special/time.js" }],
  ],
  // 开发模式html模版
  templateDev: "src/.vuepress/templates/dev.html",
  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "Oragekk's Blog",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "Oragekk's Blog",
      description: "vuepress-theme-hope 的博客演示",
    },
  },
  
  theme,

  plugins: [
    // 看板娘辅助插件
    live2DAssistPlugin({
      a: "123",
    }),
    // 彩带插件
    ribbonPlugin({
      zIndex: 1,
      alpha: 0.8,
      size: 150,
    }),
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category as string,
          formatter: {
            "/": "Category: $content",
            "/zh/": "分类：$content",
          },
        },
        {
          getter: (page) => page.frontmatter.tag as string,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "标签：$content",
          },
        },
      ],
    }),
    // 看板娘插件
    ohmylive2dPlugin({
      // 在这里进行配置
      source: "/assets",
      models: [
        {
          scale: 0.3,
          path: "/lafei_4/lafei_4.model3.json",
        },
        {
          scale: 0.7,
          path: "/z46_2/z46_2.model3.json",
        },
        {
          scale: 0.3,
          path: "/sipeibojue_5/sipeibojue_5.model3.json",
        },
      ],
      tips: {
        style: {
          width: 150,
          height: 100,
          offsetX: 0,
          offsetY: 90,
        },
      },
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
