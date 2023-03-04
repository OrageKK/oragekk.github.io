import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import { GradientCoverOptions } from ".";
import { onMounted } from "vue";
import BlogBg from "./components/BlogBg.vue"
declare const ribbonOptions: GradientCoverOptions;

export default defineClientConfig({
  rootComponents: [BlogBg],
});
