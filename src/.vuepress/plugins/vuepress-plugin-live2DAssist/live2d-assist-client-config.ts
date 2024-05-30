import { defineClientConfig } from "vuepress/client";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to) => { });
    router.afterEach((to) => { });
  },
  setup() {
    onMounted(() => {
      // 获取 vue-router 实例
      const router = useRouter();
      router.beforeEach((to) => {
        if (to.path == "/") {
          switchOml(true);
        } else {
          switchOml(false);
        }
      });
      // 获取当前路由实例
      const route = useRoute();
      const cpath = route.path;
      setTimeout(() => {
        if (cpath == "/") {
          switchOml(true);
        } else {
          switchOml(false);
        }
      }, 1000);
    });
  },
  rootComponents: [],
});

function switchOml(show: boolean) {
  if (window.screen.availWidth < 719) {
    //移动端
    let omlb = document.getElementById("oml2d-levitated-btn");
    omlb && (omlb.style.display = "none");
    return;
  }

  let oml = document.getElementById("oml2d-stage");
  let omlt = document.getElementById("oml2d-tips");
  let menu = document.getElementById("oml2d-menu");
  let statusBar = document.getElementById("oml2d-statusBar");

  if (show) {
    oml && (oml.style.visibility = "visible");
    omlt && (omlt.style.display = "block");
    menu && (menu.style.display = "block");
    statusBar && (statusBar.style.display = "block");
  } else {
    oml && (oml.style.visibility = "hidden");
    omlt && (omlt.style.display = "none");
    menu && (menu.style.display = "none");
    statusBar && (statusBar.style.display = "none");
  }

}
