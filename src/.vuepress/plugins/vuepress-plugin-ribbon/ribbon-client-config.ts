import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import { RibbonOptions } from ".";
import { onMounted } from "vue";
import script from "./ribbon";
declare const ribbonOptions: RibbonOptions;

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to, from) => {
      // console.log("before navigation" + to.path);
      if (to.path != from.path) {
        script.remove();
      }
    });
    router.afterEach((to, from) => {
      // console.log("after navigation" + to.path);
      if (to.path != from.path) {
        script.ribbon(
          "none",
          ribbonOptions.zIndex,
          ribbonOptions.alpha,
          ribbonOptions.size
        );
      }
      if (to.path != "/") {
        // 子页添加背景
        sUbPageAddBg()
      } else {
        bgRemove()
      }
    });
  },
  setup() {
    onMounted(() => {
      const path = usePageData().value.path;
      if (path == "/") {
        script.ribbon(
          "home",
          ribbonOptions.zIndex,
          ribbonOptions.alpha,
          ribbonOptions.size
        );
        bgRemove()
      } else {
        script.ribbon(
          "none",
          ribbonOptions.zIndex,
          ribbonOptions.alpha,
          ribbonOptions.size
        );
        sUbPageAddBg();
      }
    });
  },
  layouts: {},
  rootComponents: [],
});

function sUbPageAddBg() {
  if (document.querySelector(".page-bg")) {
    return;
  }
  var div = document.createElement("div");
  div.style.cssText =
    "position:fixed;top:0;left:0;z-index:1;width:100%;height:100%;pointer-events:none;background:var(--bg-color-blur)";
  div.className = "page-bg";
  document.getElementsByClassName("theme-container")[0].appendChild(div);
}

function bgRemove() {
  var el = document.querySelector(".page-bg");
  el && el.remove();
}
