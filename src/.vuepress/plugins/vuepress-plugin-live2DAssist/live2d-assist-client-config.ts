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
  // oml-levitated-btn
  
  if (show) {
    // oml && (oml.style.display = "block");
    // oml && (oml.remove())
    var oml = document.createElement("div")
  } else {
    // oml && (oml.style.display = "none");
    let oml = document.getElementById("oml-stage");
    oml && (oml.remove())
  }
}
