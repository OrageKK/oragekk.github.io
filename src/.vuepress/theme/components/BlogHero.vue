<template>
  <div></div>
</template>
<script>
import {
  usePageFrontmatter,
  usePageHeadTitle,
  withBase,
} from "@vuepress/client";
import {
  computed,
  onMounted,
  defineComponent,
  h,
  ref,
  toRefs,
  reactive,
} from "vue";
import DropTransition from "vuepress-theme-hope/components/transitions/DropTransition";
import { SlideDownIcon } from "vuepress-theme-hope/modules/blog/components/icons/icons.js";
import defaultHeroBgImagePath from "vuepress-theme-hope/modules/blog/assets/hero.jpg";
import "vuepress-theme-hope/modules/blog/styles/blog-hero.scss";
import SwitchBtn from "./SwitchBtn.vue";

import { BingApi } from "../api/bing";
export default defineComponent({
  name: "BlogHero",
  setup() {
    //这里定义一个结构体，用来保存项目信息
    // var Data = reactive({
    //   bingData: {},
    // });
    // onMounted(() => {
    //   BingApi.request().then((res) => {
    //     if (res.status == 200) {
    //       Data.bingData = res.data;
    //       // a = res.data.Data[0].Title
    //     }
    //   });
    // });
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter();
    const hero = ref();
    const heroImage = computed(() => frontmatter.value.heroImage || null);
    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen || false
    );
    const bgImage = computed(() =>
      frontmatter.value.bgImage
        ? withBase(frontmatter.value.bgImage + "?idx=1")
        : frontmatter.value.bgImage ?? defaultHeroBgImagePath
    );

    const leftClick = (url) => {
      let m = document.querySelector(".mask");
      m.style.background = `url(${url}) center/cover no-repeat`;
      console.log(m);
    };
    const rightClick = (url) => {
      let m = document.querySelector(".mask");
      m.style.background = `url(${url}) center/cover no-repeat`;
    };

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
                  ? h("p", {
                      class: "description",
                      innerHTML: frontmatter.value.tagline,
                    })
                  : null
              ),
              h(SwitchBtn, {
                onLeftClick: leftClick,
                onRightClick: rightClick,
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
