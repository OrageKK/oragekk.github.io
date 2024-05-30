import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { viteBundler } from '@vuepress/bundler-vite'
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
// import { oml2dPlugin } from "vuepress-plugin-oh-my-live2d";
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
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import metingPlugin from "vuepress-plugin-meting2";

const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  head: [["meta", { name: "referrer", content: "no-referrer-when-downgrade" }]],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Oragekk's Blog",
      description: "上冬十二的博客",
    },
  },
  alias: {
    "@MyLink": path.resolve(__dirname, "./components/Mylink.vue"),
    "@MyCoverLink": path.resolve(__dirname, "./components/MyCoverLink.vue"),
    "@Design": path.resolve(__dirname, "./data/design.ts"),
    "@Api": path.resolve(__dirname, "./data/api.ts"),
  },

  theme: theme,

  port: 9527,

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          "/bing": {
            target: "https://cn.bing.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/bing/, ""),
          },
        },
      }
    },
    // vuePluginOptions: {},
  }),
  plugins: [
    metingPlugin({
      metingOptions: {
        global: true,
        server: "tencent",
        api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        type: "playlist",
        mid: "851947617",
        aplayerOptions: {
          lrcDisplay: 'hide'
        }
      },
    }),
    // 一言插件
    hitokotoPlugin({}),
    // 鼠标特效插件
    popperPlugin({
      config: {
        shape: PopperShape.Star,
        size: 1.95,
        numParticles: 8,
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
    // 谷歌统计
    googleAnalyticsPlugin({
      // 配置项
      id: "G-R1WPVQFH8L",
      debug: true,
    }),
    // 搜索插件
    docsearchPlugin({
      appId: "PI9QTF572N",
      apiKey: "07e2432555d8ecdd3fb72978f0a05cdc",
      indexName: "oragekk",
      locales: {
        "/": {
          placeholder: "搜索内容",
          translations: {
            button: {
              buttonText: "搜索",
              buttonAriaLabel: "搜索",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
    // 看板娘插件
    // oml2dPlugin({
    //   models: [
    //     {
    //       scale: 0.04,
    //       path: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/live2D/sipeibojue_5/sipeibojue_5.model3.json",
    //       position: [0, 70],
    //       stageStyle: {
    //         height: 350
    //       }
    //     },
    //     {
    //       scale: 0.04,
    //       path: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/live2D/lafei_4/lafei_4.model3.json",
    //       position: [0, 80],
    //       stageStyle: {
    //         height: 360
    //       }
    //     },
    //     {
    //       scale: 0.1,
    //       path: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/live2D/z46_2/z46_2.model3.json",
    //       position: [0, 60],
    //       stageStyle: {
    //         height: 330
    //       }
    //     },
    //   ],
    //   tips: {
    //     idleTips: {
    //       wordTheDay:true
    //     },
    //   },
    // })
  ],
  // Enable it with pwa
  shouldPrefetch: false,
});
