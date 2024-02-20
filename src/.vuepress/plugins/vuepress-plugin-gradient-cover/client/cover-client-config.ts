import { defineClientConfig } from "vuepress/client";
import { GradientCoverOptions } from "..";
import { onMounted } from "vue";
import BlogBg from "../client/components/BlogBg"
declare const ribbonOptions: GradientCoverOptions;

export default defineClientConfig({
  rootComponents: [BlogBg],
});
