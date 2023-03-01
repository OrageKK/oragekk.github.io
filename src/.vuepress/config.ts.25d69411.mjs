// src/.vuepress/config.ts
import { getDirname as getDirname2, path as path2 } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { ohmylive2dPlugin } from "vuepress-plugin-oh-my-live2d";
import {
  moefyCanvasPlugin,
  MoefyCanvasTheme
} from "@vuepress-denaro/vuepress-plugin-moefy-canvas";

// src/.vuepress/theme/index.ts
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
var __vite_injected_original_import_meta_url = "file:///mnt/c/Users/Administrator/Desktop/blog-source/src/.vuepress/theme/index.ts";
var __dirname = getDirname(__vite_injected_original_import_meta_url);
var localTheme = (options) => {
  return {
    name: "vuepress-theme-local",
    extends: hopeTheme(options),
    alias: {
      // 你可以在这里覆盖或新增别名
      // 比如这里我们将 vuepress-theme-hope 主页组件改为自己主题下的 components/HomePage.vue
      "@theme-hope/components/PageFooter": path.resolve(
        __dirname,
        "./components/PageFooter.vue"
      )
    }
  };
};

// src/.vuepress/navbar/en.ts
import { navbar } from "vuepress-theme-hope";
var enNavbar = navbar([
  "/",
  { text: "Demo", icon: "discover", link: "/demo/" },
  {
    text: "Posts",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "Apple",
        icon: "edit",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "edit", link: "1" },
          { text: "Apple2", icon: "edit", link: "2" },
          "3",
          "4"
        ]
      },
      {
        text: "Banana",
        icon: "edit",
        prefix: "banana/",
        children: [
          {
            text: "Banana 1",
            icon: "edit",
            link: "1"
          },
          {
            text: "Banana 2",
            icon: "edit",
            link: "2"
          },
          "3",
          "4"
        ]
      },
      { text: "Cherry", icon: "edit", link: "cherry" },
      { text: "Dragon Fruit", icon: "edit", link: "dragonfruit" },
      "tomato",
      "strawberry"
    ]
  },
  {
    text: "About",
    icon: "info",
    link: "about"
  }
]);

// src/.vuepress/navbar/zh.ts
import { navbar as navbar2 } from "vuepress-theme-hope";
var zhNavbar = navbar2([
  "/zh/",
  { text: "\u6F14\u793A", icon: "discover", link: "/zh/demo/" },
  {
    text: "\u535A\u6587",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "\u82F9\u679C",
        icon: "edit",
        prefix: "apple/",
        children: [
          { text: "\u82F9\u679C1", icon: "edit", link: "1" },
          { text: "\u82F9\u679C2", icon: "edit", link: "2" },
          "3",
          "4"
        ]
      },
      {
        text: "\u9999\u8549",
        icon: "edit",
        prefix: "banana/",
        children: [
          {
            text: "\u9999\u8549 1",
            icon: "edit",
            link: "1"
          },
          {
            text: "\u9999\u8549 2",
            icon: "edit",
            link: "2"
          },
          "3",
          "4"
        ]
      },
      { text: "\u6A31\u6843", icon: "edit", link: "cherry" },
      { text: "\u706B\u9F99\u679C", icon: "edit", link: "dragonfruit" },
      "tomato",
      "strawberry"
    ]
  },
  {
    text: "V2 \u6587\u6863",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/"
  }
]);

// src/.vuepress/sidebar/en.ts
import { sidebar } from "vuepress-theme-hope";
var enSidebar = sidebar({
  "/": [
    "",
    {
      icon: "discover",
      text: "Demo",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "Articles",
      icon: "note",
      prefix: "posts/",
      children: "structure"
    },
    "intro",
    "slides"
  ]
});

// src/.vuepress/sidebar/zh.ts
import { sidebar as sidebar2 } from "vuepress-theme-hope";
var zhSidebar = sidebar2({
  "/zh/": [
    "",
    {
      text: "\u5982\u4F55\u4F7F\u7528",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "\u6587\u7AE0",
      icon: "note",
      prefix: "posts/",
      children: "structure"
    },
    "intro",
    "slides"
  ]
});

// src/.vuepress/theme.ts
var theme_default = localTheme({
  hostname: "https://oragekk.github.io",
  author: {
    name: "Oragekk",
    url: "https://orgaekk.me"
  },
  iconAssets: "iconfont",
  logo: "/logo.svg",
  repo: "OrageKK/oragekk.github.io",
  docsDir: "docs",
  blog: {
    medias: {
      Baidu: "https://example.com",
      BiliBili: "https://example.com",
      Bitbucket: "https://example.com",
      Dingding: "https://example.com",
      Discord: "https://example.com",
      Dribbble: "https://example.com",
      Email: "https://example.com",
      Evernote: "https://example.com",
      Facebook: "https://example.com",
      Flipboard: "https://example.com",
      Gitee: "https://example.com",
      GitHub: "https://example.com",
      Gitlab: "https://example.com",
      Gmail: "https://example.com",
      Instagram: "https://example.com",
      Lark: "https://example.com",
      Lines: "https://example.com",
      Linkedin: "https://example.com",
      Pinterest: "https://example.com",
      Pocket: "https://example.com",
      QQ: "https://example.com",
      Qzone: "https://example.com",
      Reddit: "https://example.com",
      Rss: "https://example.com",
      Steam: "https://example.com",
      Twitter: "https://example.com",
      Wechat: "https://example.com",
      Weibo: "https://example.com",
      Whatsapp: "https://example.com",
      Youtube: "https://example.com",
      Zhihu: "https://example.com",
      MrHope: [
        "https://mrhope.site",
        '<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient gradientTransform="matrix(.2478 .78133 -2.54797 .63622 910.35 281.58)" gradientUnits="userSpaceOnUse" id="a" x1="37.827" x2="159.988" y1="272.916" y2="274.63"><stop offset=".75" stop-color="#e33939"/><stop offset=".998" stop-color="#fff"/></linearGradient><linearGradient gradientTransform="matrix(.13814 .80797 2.55599 -.6032 34.087 494.369)" gradientUnits="userSpaceOnUse" id="b" x1="37.827" x2="159.988" y1="272.916" y2="274.63"><stop offset=".815" stop-color="#e33939"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><path d="M135.637 588.067c-48.891-201.334 74.605-404.162 275.837-453.028 201.233-48.866 403.998 74.734 452.889 276.068 48.892 201.335-74.606 404.162-275.838 453.029-201.233 48.866-403.997-74.734-452.888-276.069Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M596.076 197.044c-3.342-56.09 56.897-77.831 89.017-51.361m-410.65 128.819c-22.753-51.377-86.256-43.07-102.659-4.816" fill="none" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/><path d="M833.568 288.02c.05 18.046-12.584 30.699-21.346 32.211-8.762 1.512-17.031-1.099-18.584-1.341 0 0-61.363-6.103-105.627 6.921-44.265 13.026-87.04 47.387-94.637 51.892-6.627 3.928-29.112 7.697-44.462-12.938-15.351-20.636.024-41.526.024-41.526s12.685-18.279 40.771-35.123c28.088-16.844 24.624-13.226 52.326-25.696 15.247-6.865 43.319-14.186 67.429-17.069 25.193-3.011 46.348-1.384 57.673.769 22.165 4.212 28.632 5.93 39.169 9.229 12.451 3.898 27.214 14.516 27.264 32.671Z" fill="#fff" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M558.351 345.632c-3.458-14.237 5.214-28.566 19.367-32.003 14.154-3.437 28.43 5.32 31.887 19.557 3.458 14.238-5.212 28.567-19.367 32.004-14.152 3.437-28.43-5.319-31.887-19.558Z" fill="#6d5e56" fill-rule="evenodd" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.268"/><path d="M220.249 483.416c46.81-11.689 91.323-.467 99.42 25.064 8.098 25.532-23.286 55.706-70.097 67.393-46.811 11.689-91.323.467-99.42-25.064-8.097-25.532 23.286-55.706 70.097-67.393Z" fill="url(#a)" fill-rule="evenodd" opacity=".261"/><path d="M739.9 357.226c-46.959 11.082-81.367 41.469-76.853 67.871 4.514 26.402 46.241 38.821 93.198 27.738 46.958-11.081 81.366-41.467 76.853-67.869-4.514-26.403-46.241-38.821-93.198-27.74Z" fill="url(#b)" fill-rule="evenodd" opacity=".261"/><path d="M400.934 398.917c-.599 18.034-13.681 30.218-22.494 31.409-8.812 1.192-16.982-1.716-18.526-2.014 0 0-61.109-8.334-105.819 3.07-44.709 11.404-88.696 44.181-96.452 48.406-6.763 3.683-29.372 6.632-43.972-14.546-14.6-21.18 1.519-41.494 1.519-41.494s13.335-17.803 42.013-33.612c28.677-15.809 25.085-12.319 53.222-23.772 15.484-6.304 43.803-12.598 68.005-14.6 25.288-2.093 46.373.305 57.616 2.867 22 5.016 28.401 6.968 38.813 10.649 12.304 4.348 26.677 15.496 26.075 33.637Z" fill="#fff" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M129.05 445.546c-3.458-14.239 5.213-28.566 19.367-32.003 14.153-3.437 28.429 5.318 31.887 19.557 3.458 14.238-5.213 28.566-19.367 32.003-14.153 3.437-28.43-5.318-31.887-19.557Z" fill="#6d5e56" fill-rule="evenodd" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.268"/><path d="M424.381 696.386s64.427 13.646 101.996 5.757C640.653 678.146 690.8 521.894 690.8 521.894" fill="none" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/><path d="M796.04 666.774s-10.734-44.165-41.405-11.348c-9.681 10.359-10.438 40.604-28.217 81.89-15.942 37.02-39.564 60.728-42.938 76.063-3.374 15.335.451 35.992 26.352 41.537 25.902 5.545 41.967-23.381 41.967-23.381l44.241-164.761Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M793.337 664.734c-37.075 160.045-51.73 163.145-40.343 184.845 11.387 21.701 51.417 33.716 71.876-7.313 6.734-13.505-1.31-43.317-1.511-78.077-.307-53.06 16.865-86.111 10.403-98.1-15.332-28.452-39.377-5.875-40.425-1.355Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/></svg>'
      ]
    },
    name: "\u4E0A\u51AC\u5341\u4E8C"
  },
  locales: {
    "/": {
      // navbar
      navbar: enNavbar,
      // sidebar
      sidebar: enSidebar,
      footer: "Default footer",
      displayFooter: false,
      blog: {
        description: "A FrontEnd programmer",
        intro: "/intro.html"
      },
      metaLocales: {
        editLink: "Edit this page on GitHub"
      }
    },
    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,
      // sidebar
      sidebar: zhSidebar,
      footer: "\u9ED8\u8BA4\u9875\u811A",
      displayFooter: false,
      blog: {
        description: "\u4E00\u4E2A\u524D\u7AEF\u5F00\u53D1\u8005",
        intro: "/about.html"
      },
      // page meta
      metaLocales: {
        editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
      }
    }
  },
  // 加密
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"]
    }
  },
  plugins: {
    blog: true,
    comment: {
      provider: "Waline",
      serverURL: "waline-5swxos1th-oragekk.vercel.app",
      // your server url
      reaction: true
    },
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"]
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"]
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true
    }
    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
});

// src/.vuepress/config.ts
var __vite_injected_original_import_meta_url2 = "file:///mnt/c/Users/Administrator/Desktop/blog-source/src/.vuepress/config.ts";
var __dirname2 = getDirname2(__vite_injected_original_import_meta_url2);
var config_default = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  head: [
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    // ["script", { src: path.resolve(__dirname, "./public/special/love.js") }],
    ["script", { src: path2.resolve(__dirname2, "./public/special/time.js") }]
    // ["script", { src: path.resolve(__dirname, "./public/special/popper.ts") }],
  ],
  // 开发模式html模版
  templateDev: "src/.vuepress/templates/dev.html",
  locales: {
    "/": {
      lang: "en-US",
      title: "Oragekk's Blog",
      description: "A blog demo for vuepress-theme-hope"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Oragekk's Blog",
      description: "vuepress-theme-hope \u7684\u535A\u5BA2\u6F14\u793A"
    }
  },
  theme: theme_default,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
            "/zh/": "\u5206\u7C7B\uFF1A$content"
          }
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "\u6807\u7B7E\uFF1A$content"
          }
        }
      ]
    }),
    // 看板娘插件
    ohmylive2dPlugin({
      // 在这里进行配置
      source: "/assets",
      models: [
        {
          scale: 0.3,
          path: "/lafei_4/lafei_4.model3.json"
        },
        {
          scale: 0.7,
          path: "/z46_2/z46_2.model3.json"
        },
        {
          scale: 0.3,
          path: "/sipeibojue_5/sipeibojue_5.model3.json"
        }
      ],
      tips: {
        style: {
          width: 150,
          height: 100,
          offsetX: 0,
          offsetY: 90
        }
      }
    }),
    // canvas 插件
    moefyCanvasPlugin({
      theme: MoefyCanvasTheme.popper,
      themeConfig: {},
      canvasOptions: {}
    })
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS9pbmRleC50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci9lbi50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci96aC50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIvZW4udHMiLCAic3JjLy52dWVwcmVzcy9zaWRlYmFyL3poLnRzIiwgInNyYy8udnVlcHJlc3MvdGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvYmxvZy1zb3VyY2Uvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9ibG9nLXNvdXJjZS9zcmMvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGdldERpcm5hbWUsIHBhdGggfSBmcm9tIFwiQHZ1ZXByZXNzL3V0aWxzXCI7XHJcbmltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcclxuaW1wb3J0IHsgc2VhcmNoUHJvUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1zZWFyY2gtcHJvXCI7XHJcbmltcG9ydCB7IG9obXlsaXZlMmRQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLW9oLW15LWxpdmUyZFwiO1xyXG5pbXBvcnQge1xyXG4gIG1vZWZ5Q2FudmFzUGx1Z2luLFxyXG4gIE1vZWZ5Q2FudmFzVGhlbWUsXHJcbn0gZnJvbSAnQHZ1ZXByZXNzLWRlbmFyby92dWVwcmVzcy1wbHVnaW4tbW9lZnktY2FudmFzJ1xyXG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcclxuY29uc3QgX19kaXJuYW1lID0gZ2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XHJcbiAgYmFzZTogXCIvXCIsXHJcbiAgbGFuZzogXCJ6aC1DTlwiLFxyXG4gIGhlYWQ6IFtcclxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInJlZmVycmVyXCIsIGNvbnRlbnQ6IFwibm8tcmVmZXJyZXItd2hlbi1kb3duZ3JhZGVcIiB9XSxcclxuICAgIC8vIFtcInNjcmlwdFwiLCB7IHNyYzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3B1YmxpYy9zcGVjaWFsL2xvdmUuanNcIikgfV0sXHJcbiAgICBbXCJzY3JpcHRcIiwgeyBzcmM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9wdWJsaWMvc3BlY2lhbC90aW1lLmpzXCIpIH1dLFxyXG4gICAgLy8gW1wic2NyaXB0XCIsIHsgc3JjOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vcHVibGljL3NwZWNpYWwvcG9wcGVyLnRzXCIpIH1dLFxyXG4gIF0sXHJcbiAgLy8gXHU1RjAwXHU1M0QxXHU2QTIxXHU1RjBGaHRtbFx1NkEyMVx1NzI0OFxyXG4gIHRlbXBsYXRlRGV2OiBcInNyYy8udnVlcHJlc3MvdGVtcGxhdGVzL2Rldi5odG1sXCIsXHJcbiAgbG9jYWxlczoge1xyXG4gICAgXCIvXCI6IHtcclxuICAgICAgbGFuZzogXCJlbi1VU1wiLFxyXG4gICAgICB0aXRsZTogXCJPcmFnZWtrJ3MgQmxvZ1wiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJBIGJsb2cgZGVtbyBmb3IgdnVlcHJlc3MtdGhlbWUtaG9wZVwiLFxyXG4gICAgfSxcclxuICAgIFwiL3poL1wiOiB7XHJcbiAgICAgIGxhbmc6IFwiemgtQ05cIixcclxuICAgICAgdGl0bGU6IFwiT3JhZ2VraydzIEJsb2dcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwidnVlcHJlc3MtdGhlbWUtaG9wZSBcdTc2ODRcdTUzNUFcdTVCQTJcdTZGMTRcdTc5M0FcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgdGhlbWUsXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHNlYXJjaFByb1BsdWdpbih7XHJcbiAgICAgIC8vIFx1N0QyMlx1NUYxNVx1NTE2OFx1OTBFOFx1NTE4NVx1NUJCOVxyXG4gICAgICBpbmRleENvbnRlbnQ6IHRydWUsXHJcbiAgICAgIC8vIFx1NEUzQVx1NTIwNlx1N0M3Qlx1NTQ4Q1x1NjgwN1x1N0I3RVx1NkRGQlx1NTJBMFx1N0QyMlx1NUYxNVxyXG4gICAgICBjdXN0b21GaWVsZHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBnZXR0ZXI6IChwYWdlKSA9PiBwYWdlLmZyb250bWF0dGVyLmNhdGVnb3J5IGFzIHN0cmluZyxcclxuICAgICAgICAgIGZvcm1hdHRlcjoge1xyXG4gICAgICAgICAgICBcIi9cIjogXCJDYXRlZ29yeTogJGNvbnRlbnRcIixcclxuICAgICAgICAgICAgXCIvemgvXCI6IFwiXHU1MjA2XHU3QzdCXHVGRjFBJGNvbnRlbnRcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBnZXR0ZXI6IChwYWdlKSA9PiBwYWdlLmZyb250bWF0dGVyLnRhZyBhcyBzdHJpbmcsXHJcbiAgICAgICAgICBmb3JtYXR0ZXI6IHtcclxuICAgICAgICAgICAgXCIvXCI6IFwiVGFnOiAkY29udGVudFwiLFxyXG4gICAgICAgICAgICBcIi96aC9cIjogXCJcdTY4MDdcdTdCN0VcdUZGMUEkY29udGVudFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICAvLyBcdTc3MEJcdTY3N0ZcdTVBMThcdTYzRDJcdTRFRjZcclxuICAgIG9obXlsaXZlMmRQbHVnaW4oe1xyXG4gICAgICAvLyBcdTU3MjhcdThGRDlcdTkxQ0NcdThGREJcdTg4NENcdTkxNERcdTdGNkVcclxuICAgICAgc291cmNlOiBcIi9hc3NldHNcIixcclxuICAgICAgbW9kZWxzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2NhbGU6IDAuMyxcclxuICAgICAgICAgIHBhdGg6IFwiL2xhZmVpXzQvbGFmZWlfNC5tb2RlbDMuanNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2NhbGU6IDAuNyxcclxuICAgICAgICAgIHBhdGg6IFwiL3o0Nl8yL3o0Nl8yLm1vZGVsMy5qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzY2FsZTogMC4zLFxyXG4gICAgICAgICAgcGF0aDogXCIvc2lwZWlib2p1ZV81L3NpcGVpYm9qdWVfNS5tb2RlbDMuanNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHRpcHM6IHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgIGhlaWdodDogMTAwLFxyXG4gICAgICAgICAgb2Zmc2V0WDogMCxcclxuICAgICAgICAgIG9mZnNldFk6IDkwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIC8vIGNhbnZhcyBcdTYzRDJcdTRFRjZcclxuICAgIG1vZWZ5Q2FudmFzUGx1Z2luKHtcclxuICAgICAgdGhlbWU6IE1vZWZ5Q2FudmFzVGhlbWUucG9wcGVyLFxyXG4gICAgICB0aGVtZUNvbmZpZzoge30sXHJcbiAgICAgIGNhbnZhc09wdGlvbnM6IHt9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuXHJcbiAgLy8gRW5hYmxlIGl0IHdpdGggcHdhXHJcbiAgLy8gc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvdGhlbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvYmxvZy1zb3VyY2Uvc3JjLy52dWVwcmVzcy90aGVtZS9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvdGhlbWUvaW5kZXgudHNcIjsvLyAudnVlcHJlc3MvdGhlbWUvaW5kZXgudHNcbmltcG9ydCB7IGdldERpcm5hbWUsIHBhdGggfSBmcm9tIFwiQHZ1ZXByZXNzL3V0aWxzXCI7XG5pbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuaW1wb3J0IHR5cGUgeyBUaGVtZU9wdGlvbnMgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuaW1wb3J0IHR5cGUgeyBUaGVtZSB9IGZyb20gXCJAdnVlcHJlc3MvY29yZVwiO1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCk7XG5cbmV4cG9ydCBjb25zdCBsb2NhbFRoZW1lID0gKG9wdGlvbnM6IFRoZW1lT3B0aW9ucyk6IFRoZW1lID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcInZ1ZXByZXNzLXRoZW1lLWxvY2FsXCIsXG5cbiAgICBleHRlbmRzOiBob3BlVGhlbWUob3B0aW9ucyksXG5cbiAgICBhbGlhczoge1xuICAgICAgLy8gXHU0RjYwXHU1M0VGXHU0RUU1XHU1NzI4XHU4RkQ5XHU5MUNDXHU4OTg2XHU3NkQ2XHU2MjE2XHU2NUIwXHU1ODlFXHU1MjJCXHU1NDBEXG4gICAgICAvLyBcdTZCRDRcdTU5ODJcdThGRDlcdTkxQ0NcdTYyMTFcdTRFRUNcdTVDMDYgdnVlcHJlc3MtdGhlbWUtaG9wZSBcdTRFM0JcdTk4NzVcdTdFQzRcdTRFRjZcdTY1MzlcdTRFM0FcdTgxRUFcdTVERjFcdTRFM0JcdTk4OThcdTRFMEJcdTc2ODQgY29tcG9uZW50cy9Ib21lUGFnZS52dWVcbiAgICAgIFwiQHRoZW1lLWhvcGUvY29tcG9uZW50cy9QYWdlRm9vdGVyXCI6IHBhdGgucmVzb2x2ZShcbiAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICBcIi4vY29tcG9uZW50cy9QYWdlRm9vdGVyLnZ1ZVwiXG4gICAgICApLFxuICAgIH0sXG4gIH07XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvbmF2YmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvbmF2YmFyL2VuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvYmxvZy1zb3VyY2Uvc3JjLy52dWVwcmVzcy9uYXZiYXIvZW4udHNcIjtpbXBvcnQgeyBuYXZiYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgY29uc3QgZW5OYXZiYXIgPSBuYXZiYXIoW1xuICBcIi9cIixcbiAgeyB0ZXh0OiBcIkRlbW9cIiwgaWNvbjogXCJkaXNjb3ZlclwiLCBsaW5rOiBcIi9kZW1vL1wiIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlBvc3RzXCIsXG4gICAgaWNvbjogXCJlZGl0XCIsXG4gICAgcHJlZml4OiBcIi9wb3N0cy9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkFwcGxlXCIsXG4gICAgICAgIGljb246IFwiZWRpdFwiLFxuICAgICAgICBwcmVmaXg6IFwiYXBwbGUvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIkFwcGxlMVwiLCBpY29uOiBcImVkaXRcIiwgbGluazogXCIxXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQXBwbGUyXCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcIjJcIiB9LFxuICAgICAgICAgIFwiM1wiLFxuICAgICAgICAgIFwiNFwiLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJCYW5hbmFcIixcbiAgICAgICAgaWNvbjogXCJlZGl0XCIsXG4gICAgICAgIHByZWZpeDogXCJiYW5hbmEvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJCYW5hbmEgMVwiLFxuICAgICAgICAgICAgaWNvbjogXCJlZGl0XCIsXG4gICAgICAgICAgICBsaW5rOiBcIjFcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQmFuYW5hIDJcIixcbiAgICAgICAgICAgIGljb246IFwiZWRpdFwiLFxuICAgICAgICAgICAgbGluazogXCIyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIjNcIixcbiAgICAgICAgICBcIjRcIixcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7IHRleHQ6IFwiQ2hlcnJ5XCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcImNoZXJyeVwiIH0sXG4gICAgICB7IHRleHQ6IFwiRHJhZ29uIEZydWl0XCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcImRyYWdvbmZydWl0XCIgfSxcbiAgICAgIFwidG9tYXRvXCIsXG4gICAgICBcInN0cmF3YmVycnlcIixcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJBYm91dFwiLFxuICAgIGljb246IFwiaW5mb1wiLFxuICAgIGxpbms6IFwiYWJvdXRcIixcbiAgfSxcbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvbmF2YmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvbmF2YmFyL3poLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvYmxvZy1zb3VyY2Uvc3JjLy52dWVwcmVzcy9uYXZiYXIvemgudHNcIjtpbXBvcnQgeyBuYXZiYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgY29uc3QgemhOYXZiYXIgPSBuYXZiYXIoW1xuICBcIi96aC9cIixcbiAgeyB0ZXh0OiBcIlx1NkYxNFx1NzkzQVwiLCBpY29uOiBcImRpc2NvdmVyXCIsIGxpbms6IFwiL3poL2RlbW8vXCIgfSxcbiAge1xuICAgIHRleHQ6IFwiXHU1MzVBXHU2NTg3XCIsXG4gICAgaWNvbjogXCJlZGl0XCIsXG4gICAgcHJlZml4OiBcIi96aC9wb3N0cy9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1ODJGOVx1Njc5Q1wiLFxuICAgICAgICBpY29uOiBcImVkaXRcIixcbiAgICAgICAgcHJlZml4OiBcImFwcGxlL1wiLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHsgdGV4dDogXCJcdTgyRjlcdTY3OUMxXCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcIjFcIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJcdTgyRjlcdTY3OUMyXCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcIjJcIiB9LFxuICAgICAgICAgIFwiM1wiLFxuICAgICAgICAgIFwiNFwiLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdTk5OTlcdTg1NDlcIixcbiAgICAgICAgaWNvbjogXCJlZGl0XCIsXG4gICAgICAgIHByZWZpeDogXCJiYW5hbmEvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTk5OTlcdTg1NDkgMVwiLFxuICAgICAgICAgICAgaWNvbjogXCJlZGl0XCIsXG4gICAgICAgICAgICBsaW5rOiBcIjFcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU5OTk5XHU4NTQ5IDJcIixcbiAgICAgICAgICAgIGljb246IFwiZWRpdFwiLFxuICAgICAgICAgICAgbGluazogXCIyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIjNcIixcbiAgICAgICAgICBcIjRcIixcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7IHRleHQ6IFwiXHU2QTMxXHU2ODQzXCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcImNoZXJyeVwiIH0sXG4gICAgICB7IHRleHQ6IFwiXHU3MDZCXHU5Rjk5XHU2NzlDXCIsIGljb246IFwiZWRpdFwiLCBsaW5rOiBcImRyYWdvbmZydWl0XCIgfSxcbiAgICAgIFwidG9tYXRvXCIsXG4gICAgICBcInN0cmF3YmVycnlcIixcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJWMiBcdTY1ODdcdTY4NjNcIixcbiAgICBpY29uOiBcIm5vdGVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vdGhlbWUtaG9wZS52dWVqcy5wcmVzcy96aC9cIixcbiAgfSxcbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3Mvc2lkZWJhclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9jL1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9ibG9nLXNvdXJjZS9zcmMvLnZ1ZXByZXNzL3NpZGViYXIvZW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9ibG9nLXNvdXJjZS9zcmMvLnZ1ZXByZXNzL3NpZGViYXIvZW4udHNcIjtpbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGNvbnN0IGVuU2lkZWJhciA9IHNpZGViYXIoe1xuICBcIi9cIjogW1xuICAgIFwiXCIsXG4gICAge1xuICAgICAgaWNvbjogXCJkaXNjb3ZlclwiLFxuICAgICAgdGV4dDogXCJEZW1vXCIsXG4gICAgICBwcmVmaXg6IFwiZGVtby9cIixcbiAgICAgIGxpbms6IFwiZGVtby9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJBcnRpY2xlc1wiLFxuICAgICAgaWNvbjogXCJub3RlXCIsXG4gICAgICBwcmVmaXg6IFwicG9zdHMvXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIFwiaW50cm9cIixcbiAgICBcInNsaWRlc1wiLFxuICBdLFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvYmxvZy1zb3VyY2Uvc3JjLy52dWVwcmVzcy9zaWRlYmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3Mvc2lkZWJhci96aC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3Mvc2lkZWJhci96aC50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgY29uc3QgemhTaWRlYmFyID0gc2lkZWJhcih7XG4gIFwiL3poL1wiOiBbXG4gICAgXCJcIixcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NTk4Mlx1NEY1NVx1NEY3Rlx1NzUyOFwiLFxuICAgICAgaWNvbjogXCJjcmVhdGl2ZVwiLFxuICAgICAgcHJlZml4OiBcImRlbW8vXCIsXG4gICAgICBsaW5rOiBcImRlbW8vXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2NTg3XHU3QUUwXCIsXG4gICAgICBpY29uOiBcIm5vdGVcIixcbiAgICAgIHByZWZpeDogXCJwb3N0cy9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAgXCJpbnRyb1wiLFxuICAgIFwic2xpZGVzXCIsXG4gIF0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21udC9jL1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9ibG9nLXNvdXJjZS9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL2Jsb2ctc291cmNlL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9ibG9nLXNvdXJjZS9zcmMvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7aW1wb3J0IHsgbG9jYWxUaGVtZSB9IGZyb20gXCIuL3RoZW1lL2luZGV4XCI7XG5pbXBvcnQgeyBlbk5hdmJhciwgemhOYXZiYXIgfSBmcm9tIFwiLi9uYXZiYXIvaW5kZXguanNcIjtcbmltcG9ydCB7IGVuU2lkZWJhciwgemhTaWRlYmFyIH0gZnJvbSBcIi4vc2lkZWJhci9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBsb2NhbFRoZW1lKHtcbiAgaG9zdG5hbWU6IFwiaHR0cHM6Ly9vcmFnZWtrLmdpdGh1Yi5pb1wiLFxuXG4gIGF1dGhvcjoge1xuICAgIG5hbWU6IFwiT3JhZ2Vra1wiLFxuICAgIHVybDogXCJodHRwczovL29yZ2Fla2subWVcIixcbiAgfSxcblxuICBpY29uQXNzZXRzOiBcImljb25mb250XCIsXG5cbiAgbG9nbzogXCIvbG9nby5zdmdcIixcblxuICByZXBvOiBcIk9yYWdlS0svb3JhZ2Vray5naXRodWIuaW9cIixcblxuICBkb2NzRGlyOiBcImRvY3NcIixcblxuICBibG9nOiB7XG4gICAgbWVkaWFzOiB7XG4gICAgICBCYWlkdTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBCaWxpQmlsaTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBCaXRidWNrZXQ6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgRGluZ2Rpbmc6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgRGlzY29yZDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBEcmliYmJsZTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBFbWFpbDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBFdmVybm90ZTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBGYWNlYm9vazogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBGbGlwYm9hcmQ6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgR2l0ZWU6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgR2l0SHViOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcbiAgICAgIEdpdGxhYjogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBHbWFpbDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBJbnN0YWdyYW06IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgTGFyazogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBMaW5lczogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBMaW5rZWRpbjogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBQaW50ZXJlc3Q6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgUG9ja2V0OiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcbiAgICAgIFFROiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcbiAgICAgIFF6b25lOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcbiAgICAgIFJlZGRpdDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBSc3M6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgU3RlYW06IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgVHdpdHRlcjogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBXZWNoYXQ6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgV2VpYm86IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgV2hhdHNhcHA6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgWW91dHViZTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBaaGlodTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICBNckhvcGU6IFtcbiAgICAgICAgXCJodHRwczovL21yaG9wZS5zaXRlXCIsXG4gICAgICAgICc8c3ZnIHZpZXdCb3g9XCIwIDAgMTAwMCAxMDAwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT1cIm1hdHJpeCguMjQ3OCAuNzgxMzMgLTIuNTQ3OTcgLjYzNjIyIDkxMC4zNSAyODEuNTgpXCIgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgaWQ9XCJhXCIgeDE9XCIzNy44MjdcIiB4Mj1cIjE1OS45ODhcIiB5MT1cIjI3Mi45MTZcIiB5Mj1cIjI3NC42M1wiPjxzdG9wIG9mZnNldD1cIi43NVwiIHN0b3AtY29sb3I9XCIjZTMzOTM5XCIvPjxzdG9wIG9mZnNldD1cIi45OThcIiBzdG9wLWNvbG9yPVwiI2ZmZlwiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT1cIm1hdHJpeCguMTM4MTQgLjgwNzk3IDIuNTU1OTkgLS42MDMyIDM0LjA4NyA0OTQuMzY5KVwiIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiIGlkPVwiYlwiIHgxPVwiMzcuODI3XCIgeDI9XCIxNTkuOTg4XCIgeTE9XCIyNzIuOTE2XCIgeTI9XCIyNzQuNjNcIj48c3RvcCBvZmZzZXQ9XCIuODE1XCIgc3RvcC1jb2xvcj1cIiNlMzM5MzlcIi8+PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3AtY29sb3I9XCIjZmZmXCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9XCJNMTM1LjYzNyA1ODguMDY3Yy00OC44OTEtMjAxLjMzNCA3NC42MDUtNDA0LjE2MiAyNzUuODM3LTQ1My4wMjggMjAxLjIzMy00OC44NjYgNDAzLjk5OCA3NC43MzQgNDUyLjg4OSAyNzYuMDY4IDQ4Ljg5MiAyMDEuMzM1LTc0LjYwNiA0MDQuMTYyLTI3NS44MzggNDUzLjAyOS0yMDEuMjMzIDQ4Ljg2Ni00MDMuOTk3LTc0LjczNC00NTIuODg4LTI3Ni4wNjlaXCIgZmlsbD1cIiNmZGU2OGFcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlPVwiI2QwODgxOVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjEwXCIvPjxwYXRoIGQ9XCJNNTk2LjA3NiAxOTcuMDQ0Yy0zLjM0Mi01Ni4wOSA1Ni44OTctNzcuODMxIDg5LjAxNy01MS4zNjFtLTQxMC42NSAxMjguODE5Yy0yMi43NTMtNTEuMzc3LTg2LjI1Ni00My4wNy0xMDIuNjU5LTQuODE2XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjNmQ1ZTU2XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMTFcIi8+PHBhdGggZD1cIk04MzMuNTY4IDI4OC4wMmMuMDUgMTguMDQ2LTEyLjU4NCAzMC42OTktMjEuMzQ2IDMyLjIxMS04Ljc2MiAxLjUxMi0xNy4wMzEtMS4wOTktMTguNTg0LTEuMzQxIDAgMC02MS4zNjMtNi4xMDMtMTA1LjYyNyA2LjkyMS00NC4yNjUgMTMuMDI2LTg3LjA0IDQ3LjM4Ny05NC42MzcgNTEuODkyLTYuNjI3IDMuOTI4LTI5LjExMiA3LjY5Ny00NC40NjItMTIuOTM4LTE1LjM1MS0yMC42MzYuMDI0LTQxLjUyNi4wMjQtNDEuNTI2czEyLjY4NS0xOC4yNzkgNDAuNzcxLTM1LjEyM2MyOC4wODgtMTYuODQ0IDI0LjYyNC0xMy4yMjYgNTIuMzI2LTI1LjY5NiAxNS4yNDctNi44NjUgNDMuMzE5LTE0LjE4NiA2Ny40MjktMTcuMDY5IDI1LjE5My0zLjAxMSA0Ni4zNDgtMS4zODQgNTcuNjczLjc2OSAyMi4xNjUgNC4yMTIgMjguNjMyIDUuOTMgMzkuMTY5IDkuMjI5IDEyLjQ1MSAzLjg5OCAyNy4yMTQgMTQuNTE2IDI3LjI2NCAzMi42NzFaXCIgZmlsbD1cIiNmZmZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlPVwiI2QwODgxOVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjhcIi8+PHBhdGggZD1cIk01NTguMzUxIDM0NS42MzJjLTMuNDU4LTE0LjIzNyA1LjIxNC0yOC41NjYgMTkuMzY3LTMyLjAwMyAxNC4xNTQtMy40MzcgMjguNDMgNS4zMiAzMS44ODcgMTkuNTU3IDMuNDU4IDE0LjIzOC01LjIxMiAyOC41NjctMTkuMzY3IDMyLjAwNC0xNC4xNTIgMy40MzctMjguNDMtNS4zMTktMzEuODg3LTE5LjU1OFpcIiBmaWxsPVwiIzZkNWU1NlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2U9XCIjNmQ1ZTU2XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiNi4yNjhcIi8+PHBhdGggZD1cIk0yMjAuMjQ5IDQ4My40MTZjNDYuODEtMTEuNjg5IDkxLjMyMy0uNDY3IDk5LjQyIDI1LjA2NCA4LjA5OCAyNS41MzItMjMuMjg2IDU1LjcwNi03MC4wOTcgNjcuMzkzLTQ2LjgxMSAxMS42ODktOTEuMzIzLjQ2Ny05OS40Mi0yNS4wNjQtOC4wOTctMjUuNTMyIDIzLjI4Ni01NS43MDYgNzAuMDk3LTY3LjM5M1pcIiBmaWxsPVwidXJsKCNhKVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBvcGFjaXR5PVwiLjI2MVwiLz48cGF0aCBkPVwiTTczOS45IDM1Ny4yMjZjLTQ2Ljk1OSAxMS4wODItODEuMzY3IDQxLjQ2OS03Ni44NTMgNjcuODcxIDQuNTE0IDI2LjQwMiA0Ni4yNDEgMzguODIxIDkzLjE5OCAyNy43MzggNDYuOTU4LTExLjA4MSA4MS4zNjYtNDEuNDY3IDc2Ljg1My02Ny44NjktNC41MTQtMjYuNDAzLTQ2LjI0MS0zOC44MjEtOTMuMTk4LTI3Ljc0WlwiIGZpbGw9XCJ1cmwoI2IpXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIG9wYWNpdHk9XCIuMjYxXCIvPjxwYXRoIGQ9XCJNNDAwLjkzNCAzOTguOTE3Yy0uNTk5IDE4LjAzNC0xMy42ODEgMzAuMjE4LTIyLjQ5NCAzMS40MDktOC44MTIgMS4xOTItMTYuOTgyLTEuNzE2LTE4LjUyNi0yLjAxNCAwIDAtNjEuMTA5LTguMzM0LTEwNS44MTkgMy4wNy00NC43MDkgMTEuNDA0LTg4LjY5NiA0NC4xODEtOTYuNDUyIDQ4LjQwNi02Ljc2MyAzLjY4My0yOS4zNzIgNi42MzItNDMuOTcyLTE0LjU0Ni0xNC42LTIxLjE4IDEuNTE5LTQxLjQ5NCAxLjUxOS00MS40OTRzMTMuMzM1LTE3LjgwMyA0Mi4wMTMtMzMuNjEyYzI4LjY3Ny0xNS44MDkgMjUuMDg1LTEyLjMxOSA1My4yMjItMjMuNzcyIDE1LjQ4NC02LjMwNCA0My44MDMtMTIuNTk4IDY4LjAwNS0xNC42IDI1LjI4OC0yLjA5MyA0Ni4zNzMuMzA1IDU3LjYxNiAyLjg2NyAyMiA1LjAxNiAyOC40MDEgNi45NjggMzguODEzIDEwLjY0OSAxMi4zMDQgNC4zNDggMjYuNjc3IDE1LjQ5NiAyNi4wNzUgMzMuNjM3WlwiIGZpbGw9XCIjZmZmXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZT1cIiNkMDg4MTlcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCI4XCIvPjxwYXRoIGQ9XCJNMTI5LjA1IDQ0NS41NDZjLTMuNDU4LTE0LjIzOSA1LjIxMy0yOC41NjYgMTkuMzY3LTMyLjAwMyAxNC4xNTMtMy40MzcgMjguNDI5IDUuMzE4IDMxLjg4NyAxOS41NTcgMy40NTggMTQuMjM4LTUuMjEzIDI4LjU2Ni0xOS4zNjcgMzIuMDAzLTE0LjE1MyAzLjQzNy0yOC40My01LjMxOC0zMS44ODctMTkuNTU3WlwiIGZpbGw9XCIjNmQ1ZTU2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZT1cIiM2ZDVlNTZcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCI2LjI2OFwiLz48cGF0aCBkPVwiTTQyNC4zODEgNjk2LjM4NnM2NC40MjcgMTMuNjQ2IDEwMS45OTYgNS43NTdDNjQwLjY1MyA2NzguMTQ2IDY5MC44IDUyMS44OTQgNjkwLjggNTIxLjg5NFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiI2QwODgxOVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjExXCIvPjxwYXRoIGQ9XCJNNzk2LjA0IDY2Ni43NzRzLTEwLjczNC00NC4xNjUtNDEuNDA1LTExLjM0OGMtOS42ODEgMTAuMzU5LTEwLjQzOCA0MC42MDQtMjguMjE3IDgxLjg5LTE1Ljk0MiAzNy4wMi0zOS41NjQgNjAuNzI4LTQyLjkzOCA3Ni4wNjMtMy4zNzQgMTUuMzM1LjQ1MSAzNS45OTIgMjYuMzUyIDQxLjUzNyAyNS45MDIgNS41NDUgNDEuOTY3LTIzLjM4MSA0MS45NjctMjMuMzgxbDQ0LjI0MS0xNjQuNzYxWlwiIGZpbGw9XCIjZmRlNjhhXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZT1cIiNkMDg4MTlcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIxMFwiLz48cGF0aCBkPVwiTTc5My4zMzcgNjY0LjczNGMtMzcuMDc1IDE2MC4wNDUtNTEuNzMgMTYzLjE0NS00MC4zNDMgMTg0Ljg0NSAxMS4zODcgMjEuNzAxIDUxLjQxNyAzMy43MTYgNzEuODc2LTcuMzEzIDYuNzM0LTEzLjUwNS0xLjMxLTQzLjMxNy0xLjUxMS03OC4wNzctLjMwNy01My4wNiAxNi44NjUtODYuMTExIDEwLjQwMy05OC4xLTE1LjMzMi0yOC40NTItMzkuMzc3LTUuODc1LTQwLjQyNS0xLjM1NVpcIiBmaWxsPVwiI2ZkZTY4YVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2U9XCIjZDA4ODE5XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMTBcIi8+PC9zdmc+JyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBuYW1lOlwiXHU0RTBBXHU1MUFDXHU1MzQxXHU0RThDXCJcbiAgfSxcbiAgbG9jYWxlczoge1xuICAgIFwiL1wiOiB7XG4gICAgICAvLyBuYXZiYXJcbiAgICAgIG5hdmJhcjogZW5OYXZiYXIsXG5cbiAgICAgIC8vIHNpZGViYXJcbiAgICAgIHNpZGViYXI6IGVuU2lkZWJhcixcblxuICAgICAgZm9vdGVyOiBcIkRlZmF1bHQgZm9vdGVyXCIsXG5cbiAgICAgIGRpc3BsYXlGb290ZXI6IGZhbHNlLFxuXG4gICAgICBibG9nOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkEgRnJvbnRFbmQgcHJvZ3JhbW1lclwiLFxuICAgICAgICBpbnRybzogXCIvaW50cm8uaHRtbFwiLFxuICAgICAgfSxcblxuICAgICAgbWV0YUxvY2FsZXM6IHtcbiAgICAgICAgZWRpdExpbms6IFwiRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViXCIsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGluZXNlIGxvY2FsZSBjb25maWdcbiAgICAgKi9cbiAgICBcIi96aC9cIjoge1xuICAgICAgLy8gbmF2YmFyXG4gICAgICBuYXZiYXI6IHpoTmF2YmFyLFxuXG4gICAgICAvLyBzaWRlYmFyXG4gICAgICBzaWRlYmFyOiB6aFNpZGViYXIsXG5cbiAgICAgIGZvb3RlcjogXCJcdTlFRDhcdThCQTRcdTk4NzVcdTgxMUFcIixcblxuICAgICAgZGlzcGxheUZvb3RlcjogZmFsc2UsXG5cbiAgICAgIGJsb2c6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXHU0RTAwXHU0RTJBXHU1MjREXHU3QUVGXHU1RjAwXHU1M0QxXHU4MDA1XCIsXG4gICAgICAgIGludHJvOiBcIi9hYm91dC5odG1sXCIsXG4gICAgICB9LFxuXG4gICAgICAvLyBwYWdlIG1ldGFcbiAgICAgIG1ldGFMb2NhbGVzOiB7XG4gICAgICAgIGVkaXRMaW5rOiBcIlx1NTcyOCBHaXRIdWIgXHU0RTBBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1XCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgLy8gXHU1MkEwXHU1QkM2XG4gIGVuY3J5cHQ6IHtcbiAgICBjb25maWc6IHtcbiAgICAgIFwiL2RlbW8vZW5jcnlwdC5odG1sXCI6IFtcIjEyMzRcIl0sXG4gICAgICBcIi96aC9kZW1vL2VuY3J5cHQuaHRtbFwiOiBbXCIxMjM0XCJdLFxuICAgIH0sXG4gIH0sXG5cbiAgcGx1Z2luczoge1xuICAgIGJsb2c6IHRydWUsXG4gICAgY29tbWVudDoge1xuICAgICAgcHJvdmlkZXI6IFwiV2FsaW5lXCIsXG4gICAgICBzZXJ2ZXJVUkw6IFwid2FsaW5lLTVzd3hvczF0aC1vcmFnZWtrLnZlcmNlbC5hcHBcIiwgLy8geW91ciBzZXJ2ZXIgdXJsXG4gICAgICByZWFjdGlvbjogdHJ1ZVxuICAgIH0sXG4gICAgLy8gYWxsIGZlYXR1cmVzIGFyZSBlbmFibGVkIGZvciBkZW1vLCBvbmx5IHByZXNlcnZlIGZlYXR1cmVzIHlvdSBuZWVkIGhlcmVcbiAgICBtZEVuaGFuY2U6IHtcbiAgICAgIGFsaWduOiB0cnVlLFxuICAgICAgYXR0cnM6IHRydWUsXG4gICAgICBjaGFydDogdHJ1ZSxcbiAgICAgIGNvZGV0YWJzOiB0cnVlLFxuICAgICAgY29udGFpbmVyOiB0cnVlLFxuICAgICAgZGVtbzogdHJ1ZSxcbiAgICAgIGVjaGFydHM6IHRydWUsXG4gICAgICBmaWd1cmU6IHRydWUsXG4gICAgICBmbG93Y2hhcnQ6IHRydWUsXG4gICAgICBnZm06IHRydWUsXG4gICAgICBpbWdMYXp5bG9hZDogdHJ1ZSxcbiAgICAgIGltZ1NpemU6IHRydWUsXG4gICAgICBpbmNsdWRlOiB0cnVlLFxuICAgICAga2F0ZXg6IHRydWUsXG4gICAgICBtYXJrOiB0cnVlLFxuICAgICAgbWVybWFpZDogdHJ1ZSxcbiAgICAgIHBsYXlncm91bmQ6IHtcbiAgICAgICAgcHJlc2V0czogW1widHNcIiwgXCJ2dWVcIl0sXG4gICAgICB9LFxuICAgICAgcHJlc2VudGF0aW9uOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcImhpZ2hsaWdodFwiLCBcIm1hdGhcIiwgXCJzZWFyY2hcIiwgXCJub3Rlc1wiLCBcInpvb21cIl0sXG4gICAgICB9LFxuICAgICAgc3R5bGl6ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGlwXCIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzdWI6IHRydWUsXG4gICAgICBzdXA6IHRydWUsXG4gICAgICB0YWJzOiB0cnVlLFxuICAgICAgdlByZTogdHJ1ZSxcbiAgICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXG4gICAgfSxcblxuICAgIC8vIHVuY29tbWVudCB0aGVzZSBpZiB5b3Ugd2FudCBhIFBXQVxuICAgIC8vIHB3YToge1xuICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAvLyAgIGNhY2hlSFRNTDogdHJ1ZSxcbiAgICAvLyAgIGNhY2hlUGljOiB0cnVlLFxuICAgIC8vICAgYXBwZW5kQmFzZTogdHJ1ZSxcbiAgICAvLyAgIGFwcGxlOiB7XG4gICAgLy8gICAgIGljb246IFwiL2Fzc2V0cy9pY29uL2FwcGxlLWljb24tMTUyLnBuZ1wiLFxuICAgIC8vICAgICBzdGF0dXNCYXJDb2xvcjogXCJibGFja1wiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1zVGlsZToge1xuICAgIC8vICAgICBpbWFnZTogXCIvYXNzZXRzL2ljb24vbXMtaWNvbi0xNDQucG5nXCIsXG4gICAgLy8gICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtYW5pZmVzdDoge1xuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIHNob3J0Y3V0czogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgc2hvcnRfbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICB1cmw6IFwiL2RlbW8vXCIsXG4gICAgLy8gICAgICAgICBpY29uczogW1xuICAgIC8vICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9ndWlkZS1tYXNrYWJsZS5wbmdcIixcbiAgICAvLyAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBdLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFYsU0FBUyxjQUFBQSxhQUFZLFFBQUFDLGFBQVk7QUFDN1gsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyx3QkFBd0I7QUFDakM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLE9BQ0s7OztBQ05QLFNBQVMsWUFBWSxZQUFZO0FBQ2pDLFNBQVMsaUJBQWlCO0FBRjRNLElBQU0sMkNBQTJDO0FBTXZSLElBQU0sWUFBWSxXQUFX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TUFDUCxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLEtBQUs7QUFBQTtBQUFBLE1BRUgsUUFBUTtBQUFBO0FBQUEsTUFHUixTQUFTO0FBQUEsTUFFVCxRQUFRO0FBQUEsTUFFUixlQUFlO0FBQUEsTUFFZixNQUFNO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsTUFDVDtBQUFBLE1BRUEsYUFBYTtBQUFBLFFBQ1gsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLQSxRQUFRO0FBQUE7QUFBQSxNQUVOLFFBQVE7QUFBQTtBQUFBLE1BR1IsU0FBUztBQUFBLE1BRVQsUUFBUTtBQUFBLE1BRVIsZUFBZTtBQUFBLE1BRWYsTUFBTTtBQUFBLFFBQ0osYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLE1BQ1Q7QUFBQTtBQUFBLE1BR0EsYUFBYTtBQUFBLFFBQ1gsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEs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UUFDQTtBQUFBLFVBQ0UsUUFBUSxDQUFDLFNBQVMsS0FBSyxZQUFZO0FBQUEsVUFDbkMsV0FBVztBQUFBLFlBQ1QsS0FBSztBQUFBLFlBQ0wsUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFFRCxpQkFBaUI7QUFBQTtBQUFBLE1BRWYsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLFFBQ047QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU07QUFBQSxRQUNKLE9BQU87QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFFRCxrQkFBa0I7QUFBQSxNQUNoQixPQUFPLGlCQUFpQjtBQUFBLE1BQ3hCLGFBQWEsQ0FBQztBQUFBLE1BQ2QsZUFBZSxDQUFDO0FBQUEsSUFDbEIsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBSUYsQ0FBQzsiLAogICJuYW1lcyI6IFsiZ2V0RGlybmFtZSIsICJwYXRoIiwgIm5hdmJhciIsICJuYXZiYXIiLCAic2lkZWJhciIsICJzaWRlYmFyIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwiLCAiX19kaXJuYW1lIiwgImdldERpcm5hbWUiLCAicGF0aCJdCn0K
