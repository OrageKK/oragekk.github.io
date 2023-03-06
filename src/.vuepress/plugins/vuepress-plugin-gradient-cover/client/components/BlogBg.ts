import { defineComponent, VNode,h } from "vue";
import "../style/cove.scss"
import "@vuepress/client/types"
export default defineComponent({
  name: "BlogBg",
  setup() {
    return (): VNode =>
      !__VUEPRESS_SSR__ ? h("div", { class: "page-bg" }) : h("");
  },
});

