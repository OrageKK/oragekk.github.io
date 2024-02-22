<script lang="ts">
import {
  usePageFrontmatter,
  usePageData,
  withBase,
} from "vuepress/client";
import {
  computed,
  onMounted,
  defineComponent,
  h,
  ref,
  nextTick,
  createApp,
  watchEffect,
  watch,
  provide,
} from "vue";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { SlideDownIcon } from "@theme-hope/modules/blog/components/icons/icons.js";
import "vuepress-theme-hope/modules/blog/styles/blog-hero.scss";
import SwitchBtn from "./SwitchBtn.vue";
import { BingApi } from "../api/bing";
import { ThemeHopePageFrontmatter } from "vuepress-theme-hope/shared/frontmatter";
import { isString } from "vuepress/shared";
export default defineComponent({
  name: "BlogHero",
  setup() {
    const defaultHeroBgImagePath = withBase("/assets/home_bg3.jpg");
    const pageData = usePageData();
    const frontmatter = usePageFrontmatter<ThemeHopePageFrontmatter>();
    const hero = ref();
    const heroImage = computed(() => frontmatter.value.heroImage || null);
    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen || false
    );
    const bgImage = computed(() =>
      bingData.value.url != null
        ? bingData.value.url
        : isString(frontmatter.value.bgImage)
        ? withBase(frontmatter.value.bgImage)
        : frontmatter.value.bgImage === false
        ? null
        : defaultHeroBgImagePath
    );
    // 背景相关
    const bingDatasRef = ref();
    const bingIndex = ref(0);
    const bingData = computed(() =>
      bingDatasRef.value ? bingDatasRef.value[bingIndex.value] : {}
    );
    const lDisabled = computed(() => (bingIndex.value == 0 ? true : false));
    const rDisabled = computed(() =>
      bingDatasRef.value && bingIndex.value == bingDatasRef.value.length - 1
        ? true
        : false
    );
    const leftClick = () => {
      if (lDisabled.value) {
        return;
      }
      bingIndex.value--;
      frontmatter.value.bgImage = withBase(bingData.value.url);
      let f = document.querySelector(".footer-wrapper") as HTMLElement;
      f && (f.style.backgroundImage = `url(${bingData.value.url})`);
    };
    const rightClick = () => {
      if (rDisabled.value) {
        return;
      }
      bingIndex.value++;
      frontmatter.value.bgImage = withBase(bingData.value.url);
      let f = document.querySelector(".footer-wrapper") as HTMLElement;
      f && (f.style.backgroundImage = `url(${bingData.value.url})`);
    };
    watch(
      () => bgImage.value,
      (newValue, oldValue) => {
        window.localStorage.setItem("bgImage", newValue);
      }
    );
    const getImage = () => {
      BingApi.request().then((res) => {
        if (res.status == 200) {
          for (const [index, image] of res.data.images.entries()) {
            image.url = `https://cn.bing.com/${image.url}`;
            var n = new Image();
            n.src = image.url;
            n.onload = () => {};
            if (index == 0) {
              let f = document.querySelector(".footer-wrapper") as HTMLElement;
              f && (f.style.backgroundImage = `url(${image.url})`);
              frontmatter.value.bgImage = withBase(image.url);
            }
          }
          bingDatasRef.value = res.data.images;
        }
      });
    };
    onMounted(() => {
      nextTick(() => {
        getImage();
      });
    });

    return () =>
      frontmatter.value.hero === false
        ? null
        : h(
            "div",
            {
              ref: hero,
              class: [
                "vp-blog-hero",
                {
                  fullscreen: isFullScreen.value,
                  "no-bg": !bgImage.value,
                },
              ],
            },
            [
              bgImage.value
                ? h("div", {
                    class: "vp-blog-mask",
                    style: [
                      {
                        background: `url(${bgImage.value}) center/cover no-repeat`,
                      },
                      frontmatter.value.bgImageStyle,
                    ],
                  })
                : null,
              h(DropTransition, { appear: true, delay: 0.04 }, () =>
                heroImage.value
                  ? h("img", {
                      class: "vp-blog-hero-image",
                      style: frontmatter.value.heroImageStyle,
                      src: withBase(heroImage.value),
                      alt: frontmatter.value.heroAlt || "hero image",
                    })
                  : null
              ),
              h(DropTransition, { appear: true, delay: 0.08 }, () =>
                frontmatter.value.heroText === null
                  ? null
                  : h(
                      "h1",
                      { class: "vp-blog-hero-title" },
                      frontmatter.value.heroText || pageData.value.title
                    )
              ),
              h(DropTransition, { appear: true, delay: 0.12 }, () =>
                frontmatter.value.tagline
                  ? h(
                      "div",
                      {
                        class: "vp-blog-hero-description",
                        id: "hitokoto",
                      },
                      [
                        h(
                          "div",
                          {
                            class: "word",
                          },
                          [
                            h("div", {
                              class: "left",
                              innerHTML: "『",
                            }),
                            h("span", {
                              id: "hitokoto_text",
                            }),
                            h("div", {
                              class: "right",
                              innerHTML: "』",
                            }),
                          ]
                        ),
                        h("div", {
                          class: "author",
                          id: "hitokoto_author",
                          style: { opacity: 0 },
                        }),
                      ]
                    )
                  : null
              ),
              bingData.value
                ? h(SwitchBtn, {
                    onLeftClick: leftClick,
                    onRightClick: rightClick,
                    bingData: bingData.value,
                    lDisabled: lDisabled.value,
                    rDisabled: rDisabled.value,
                  })
                : null,
              isFullScreen.value
                ? h(
                    "button",
                    {
                      class: "slide-down-button",
                      onClick: () => {
                        window.scrollTo({
                          top: hero.value.clientHeight,
                          behavior: "smooth",
                        });
                      },
                    },
                    [h(SlideDownIcon), h(SlideDownIcon)]
                  )
                : null,
            ]
          );
  },
});
</script>
<style lang="scss" scoped>
// 一言
#hitokoto {
  margin: 1.2rem auto 0;
  font-weight: 600;
  color: #fffffff2;
  opacity: 1;
  font-size: 1.5rem;
  display: block;
  .word {
    position: relative;
    padding: 1rem 2.5rem;
    text-align: center;
    .left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .right {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    #hitokoto_text {
      max-width: 80vw;
      position: relative;
      display: inline-block;
      font-family: PRshouxie, Georgia, "Times New Roman", Times, serif,
        sans-serif;
      font-size: 2.8rem;
      font-weight: 550;
      @media (max-width: hope-config.$tablet) {
        font-size: 2rem;
        font-weight: 550;
      }
    }
    #hitokoto_text:after {
      content: "|";
      font-size: 2rem;
      font-family: var(--font-family-fancy);
      animation: san 0.8s infinite;
    }
  }
  .author {
    font-weight: 500;
    margin-top: 1rem;
    float: right;
  }
}
#hitokoto_author {
  transform: translateY(-20px);
  transition: transform 0.3s ease-in-out 0.25s, opacity 1.2s ease-in-out 0.25s;
  font-family: Georgia, "Times New Roman", Times, serif, sans-serif;
  font-style: italic;
  font-size: 1.25rem;
  @media (max-width: hope-config.$mobile) {
    font-size: 1rem;
  }
}

@keyframes san {
  0%,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
#BingSwitchWrapper {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  z-index: 5;
  display: flex;
  align-items: center;
  a {
    color: var(--theme-color);
    font-weight: 500;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  #bingLink {
    display: flex;
    align-items: center;
    background-color: #2226;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  .bingLink-icon {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    .mapPin {
      fill: #fff;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      left: 50%;
      position: absolute;
    }
    @media (max-width: hope-config.$mobile) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  #bingLink-text {
    font-family: "Segoe UI", Segoe, Tahoma, Arial, Verdana, sans-serif;
    text-align: left;
    box-sizing: border-box;
    min-height: 2.5rem;
    max-width: 14rem;
    color: #fff;
    padding: 0.625rem 0.625rem 0.625rem 0rem;
    font-size: 0.9rem;
    @media (max-width: hope-config.$mobile) {
      font-size: 0.75rem;
      min-height: 2rem;
    }
  }
  #left {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #222c;
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    @media (max-width: hope-config.$mobile) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  #left::after {
    transform: scale(0.25) translate(25%) rotate(45deg);
    border-radius: 0.375rem;
    border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
  }
  #left.disabled::after {
    border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
  }
  #right {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #222c;
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    @media (max-width: hope-config.$mobile) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  #right::after {
    transform: scale(0.25) translate(-25%) rotate(225deg);
    border-radius: 0.375rem;
    border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
  }
  #right.disabled::after {
    border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
  }
}
</style>
