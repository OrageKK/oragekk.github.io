import { localTheme } from "./theme/index";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default localTheme({
  hotReload: false,
  hostname: "https://oragekk.me",
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  fullscreen: true,
  author: {
    name: "Oragekk",
    url: "https://orgaekk.me",
  },

  iconAssets: [
    // 默认：
    "//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css",
    // 自己的
    "//at.alicdn.com/t/c/font_3941380_fpvodt87x3.css",
  ],

  logo: "/logo.svg",

  repo: "OrageKK/oragekk.github.io",

  docsDir: "docs",

  blog: {
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: "mailto:oragekk@163.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/OrageKK",
      // Gitlab: "https://example.com",
      Gmail: "mailto:oragekk@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      Rss: "./rss.xml",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      简书: [
        "https://www.jianshu.com/u/752cf0a6b9b4",
        '<svg t="1678792184087" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2599" width="26" height="26"><path d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z" fill="#E6686A" p-id="2600"></path><path d="M275.264 488.32h59.52v311.264h-59.52V488.32z m33.536-94.528c14.944 27.648 24.64 55.328 29.088 82.976h64.832c-8.96-35.36-20.128-63.04-33.536-82.976H308.8zM436.8 314.528h71.584V275.328h-129.696c1.504-3.104 3.744-8.448 6.72-16.16 1.472-6.112 2.976-10.72 4.48-13.824H322.752c-10.432 41.504-34.24 72.288-71.52 92.224v39.2c49.152-12.288 84.192-33.024 105.056-62.24h22.4c7.424 19.968 11.904 39.2 13.408 57.632h62.592a292.992 292.992 0 0 0-17.92-57.632z m-29.056 124.512h269.472v253.664c1.504 23.04-8.928 33.792-31.296 32.256H608.96v46.112h53.664c52.16 1.536 77.504-22.304 76-71.488V392.96h-330.88v46.112z" fill="#FFFFFF" p-id="2601"></path><path d="M617.92 480.544h-219.136v232.896h152.064c47.68 1.536 70.08-21.536 67.072-69.152v-163.744z m-158.72 41.504h98.336v53.024H459.2v-53.024z m69.28 149.888h-69.312v-57.664h98.368v27.68c1.504 21.536-8.192 31.52-29.056 29.984zM620.16 273.024a18.24 18.24 0 0 1 2.24-6.944l6.72-20.736h-67.072c-10.464 43.04-33.536 75.328-69.344 96.832v36.896c46.208-12.32 81.28-33.792 105.088-64.576h31.328c7.456 20 11.904 39.232 13.44 57.664h60.32c-1.472-15.36-7.456-34.56-17.92-57.664h78.304V273.024H620.16z" fill="#FFFFFF" p-id="2602"></path></svg>',
      ],
    },
    name: "上冬十二",
  },
  locales: {
    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "默认页脚",

      displayFooter: false,

      blog: {
        description: "到最后，竟庆幸于夕阳仍留在身上",
        intro: "/about.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
  // navbarAutoHide: "always",
  // 加密
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: true,
    git: true,
    feed: {
      rss: true,
    },
    comment: {
      provider: "Waline",
      serverURL: "https://talk.oragekk.me/", // your server url
      reaction: true,
      requiredMeta:['nick'],
      wordLimit:300,
      emoji:[
        "https://unpkg.com/@waline/emojis@1.1.0/tieba",
        "https://unpkg.com/@waline/emojis@1.1.0/weibo",
        "https://emoji.shojo.cn/bili/src/tv_小电视_动图",
        "https://emoji.shojo.cn/bili/src/罗小黑战记",
        "https://emoji.shojo.cn/bili/src/剑网3·侠肝义胆沈剑心",
        "https://emoji.shojo.cn/bili/src/装扮小姐姐梦幻冬季",
        "https://emoji.shojo.cn/bili/src/装扮小姐姐·秋日午后",
        "https://emoji.shojo.cn/bili/src/天涯明月刀真武",
      ],
      locales:{
        "/":{
          placeholder:"欢迎留言~ _(≧∇≦」∠)_ (填写常用邮箱即可快速收到回复通知~)"
        }
      }
    },
    prismjs: false,
    copyright: {
      author: "Oragekk",
      license: "CC BY-NC-SA 4.0",
      global: true,
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
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
