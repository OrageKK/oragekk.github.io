import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { ohmylive2dPlugin } from "vuepress-plugin-oh-my-live2d";
import {
  canvasPlugin,
  CanvasPluginType,
} from "./plugins/vuepress-plugin-canvas";
import { live2DAssistPlugin } from "./plugins/vuepress-plugin-live2DAssist";
import { gradientCoverPlugin } from "./plugins/vuepress-plugin-gradient-cover";
import theme from "./theme.js";
import { popperPlugin } from "./plugins/vuepress-plugin-popper";
import { PopperShape } from "@moefy-canvas/theme-popper";
import { hitokotoPlugin } from "./plugins/vuepress-plugin-hitokoto";
import { shikiPlugin } from "@vuepress/plugin-shiki";

const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  head: [
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    ["script", { src: "/script/time.js" }],
  ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Oragekk's Blog",
      description: "vuepress-theme-hope 的博客演示",
    },
  },
  alias: {
    "@MyLink": path.resolve(__dirname, "./components/Mylink.vue"),
  },

  theme,

  plugins: [
    // 代码高亮
    shikiPlugin({
      theme:"one-dark-pro"
    }),
    // 一言插件
    hitokotoPlugin({}),
    // 鼠标特效插件
    popperPlugin({
      config: {
        shape: PopperShape.Star,
        size: 1.95,
        numParticles: 10,
      },
    }),
    // 看板娘辅助插件
    live2DAssistPlugin({
      subPageHidden: true,
    }),
    // 背景插件
    canvasPlugin({
      type: CanvasPluginType.Figure,
      ribbonOption: {
        zIndex: 1,
        alpha: 0.8,
        size: 90,
      },
    }),
    // 遮罩插件
    gradientCoverPlugin({}),
    // 搜索插件
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
