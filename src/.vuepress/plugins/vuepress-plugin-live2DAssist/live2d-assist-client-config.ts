import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
// import { Options } from ".";
import { onMounted } from "vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to) => {
      // console.log("before navigation" + to.path);
      if (to.path == "/") {
        switchOml(true);
      } else {
        switchOml(false);
      }
    });
    router.afterEach((to) => {
      // console.log("after navigation" + to.path);
    });
  },
  setup() {
    onMounted(() => {
      setTimeout(() => {
        const path = usePageData().value.path;
        if (path == "/") {
          switchOml(true);
        } else {
          switchOml(false);
        }
      }, 1000);
    });
  },
  layouts: {},
  rootComponents: [],
});

function switchOml(show: boolean) {
  let oml = document.getElementById("oml-stage");
  if (show) {
    oml && (oml.style.display = "block");
  } else {
    oml && (oml.style.display = "none");
  }
}
