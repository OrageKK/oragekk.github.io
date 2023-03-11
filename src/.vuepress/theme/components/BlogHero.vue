<template>
  <div></div>
</template>
<script>
import {
  usePageFrontmatter,
  usePageHeadTitle,
  withBase,
} from "@vuepress/client";
import { computed, onMounted, defineComponent, h, ref } from "vue";
import DropTransition from "vuepress-theme-hope/components/transitions/DropTransition";
import { SlideDownIcon } from "vuepress-theme-hope/modules/blog/components/icons/icons.js";
import defaultHeroBgImagePath from "vuepress-theme-hope/modules/blog/assets/hero.jpg";
import "vuepress-theme-hope/modules/blog/styles/blog-hero.scss";
import SwitchBtn from "./SwitchBtn.vue";
import { BingApi } from "../api/bing";
export default defineComponent({
  name: "BlogHero",
  setup() {
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter();
    const hero = ref();
    const heroImage = computed(() => frontmatter.value.heroImage || null);
    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen || false
    );
    const bgImage = computed(() =>
      frontmatter.value.bgImage
        ? withBase(frontmatter.value.bgImage)
        : frontmatter.value.bgImage ?? defaultHeroBgImagePath
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
      frontmatter.value.bgImage = withBase(bingData.value.Url);
      let f = document.querySelector(".footer-wrapper");
      f && (f.style.backgroundImage = `url(${bingData.value.Url})`);
    };
    const rightClick = () => {
      if (rDisabled.value) {
        return;
      }
      bingIndex.value++;
      frontmatter.value.bgImage = withBase(bingData.value.Url);
      let f = document.querySelector(".footer-wrapper");
      f && (f.style.backgroundImage = `url(${bingData.value.Url})`);
    };
    const getImage = () => {
      BingApi.request().then((res) => {
        if (res.status == 200) {
          bingDatasRef.value = res.data.Data;
          for (const [index, infos] of res.data.Data.entries()) {
            var n = new Image();
            n.src = infos.Url;
            n.onload = () => {};
            if (index == 0) {
              let f = document.querySelector(".footer-wrapper");
              f && (f.style.backgroundImage = `url(${infos.Url})`);
              // frontmatter.value.bgImage = withBase(infos.Url);
            }
          }
        }
      });
    };
    onMounted(() => {
      nextTick(() => {
        getImage()
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
                "blog-hero",
                {
                  fullscreen: isFullScreen.value,
                  "no-bg": !bgImage.value,
                },
              ],
            },
            [
              bgImage.value
                ? h("div", {
                    class: "mask",
                    style: {
                      background: `url(${bgImage.value}) center/cover no-repeat`,
                      ...frontmatter.value.bgImageStyle,
                    },
                  })
                : null,
              h(DropTransition, { appear: true, delay: 0.04 }, () =>
                heroImage.value
                  ? h("img", {
                      class: "hero-image",
                      style: frontmatter.value.heroImageStyle,
                      src: withBase(heroImage.value),
                      alt: frontmatter.value.heroAlt || "hero image",
                    })
                  : null
              ),
              h(DropTransition, { appear: true, delay: 0.08 }, () =>
                frontmatter.value.heroText === false
                  ? null
                  : h("h1", frontmatter.value.heroText || title.value)
              ),
              h(DropTransition, { appear: true, delay: 0.12 }, () =>
                frontmatter.value.tagline
                  ? h(
                      "p",
                      {
                        class: "description",
                        id: "hitokoto",
                      },
                      [
                        h(
                          "div",
                          {
                            class: "word",
                          },
                          [
                            h(
                              "div",
                              {
                                class: "left",
                              },
                              "『"
                            ),
                            h("span", {
                              id: "hitokoto_text",
                              // innerHTML:frontmatter.value.tagline,
                            }),
                            h(
                              "div",
                              {
                                class: "right",
                              },
                              "』"
                            ),
                          ]
                        ),
                        h("div", {
                          class: "author",
                          id: "hitokoto_author",
                          style: { opacity: 0 },
                          innerHTML: "123333",
                        }),
                      ]
                    )
                  : null
              ),
              h(SwitchBtn, {
                onLeftClick: leftClick,
                onRightClick: rightClick,
                bingData: bingData.value,
                lDisabled: lDisabled.value,
                rDisabled: rDisabled.value,
              }),
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
<style lang="scss">
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
</style>
