import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import { BackgroundOptions, RibbonOptions, VuepressPluginBgType } from ".";
import { onMounted } from "vue";
import script from "./ribbon";

declare const backgroundOptions: BackgroundOptions;
// declare const ribbonOptions: RibbonOptions;

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to, from) => {});
    router.afterEach((to, from) => {
      // console.log("after navigation" + to.path);
    });
  },
  setup() {
    onMounted(() => {
      switch (backgroundOptions.type) {
        case 0:
          script.figure();
          break;
        case 1:
          script.ribbon(
            backgroundOptions.ribbonOption?.zIndex,
            backgroundOptions.ribbonOption?.alpha,
            backgroundOptions.ribbonOption?.size
          );
          break;
        default:
          break;
      }
    });
  },
  layouts: {},
  rootComponents: [],
});
