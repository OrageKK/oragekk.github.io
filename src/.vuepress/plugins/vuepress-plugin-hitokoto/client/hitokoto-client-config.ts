import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { HitokotoOption } from "..";
import { HitokotoApi } from "./hitokoto-api";
declare const backgroundOptions: HitokotoOption;

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {
    var timer;
    onMounted(() => {
      // 或者 vue-router 实例
      const router = useRouter();
      const crouter = useRoute();
      var content = "";
      var author = "";
      var span: HTMLSpanElement | null = document.getElementById(
        "hitokoto_text"
      ) as HTMLSpanElement;
      var div: HTMLDivElement | null = document.getElementById(
        "hitokoto_author"
      ) as HTMLDivElement;

      var index = 0;
      var texts = content.split("");
      function request(delay) {
        var delayT = setTimeout(async () => {
          clearTimeout(delayT);
          const res = await HitokotoApi.request();
          if (res.status == 200) {
            content = res.data.hitokoto;
            author = res.data.from_who
              ? `——   「 ${res.data.from} • ${res.data.from_who} 」`
              : `——   「 ${res.data.from} 」`;
            texts = content.split("");
            index = 0;
            show();
            // console.table("请求了");
          }
        }, delay);
      }
      if (crouter.path == "/") {
        // 主页方可请求
        request(2000);
      }
      // 显示函数
      function show() {
        timer = setInterval(() => {
          if (index == texts.length - 1) {
            clearInterval(timer);
            var delayT = setTimeout(() => {
              clean();
              clearTimeout(delayT);
            }, 5000);
            return;
          }
          // console.log("在重复显示");
          div && (div.style.opacity = "1");
          div && (div.style.transform = "translateY(0px)");
          div && (div.innerText = author);
          span && (span.innerText = span.innerText + texts[index]);
          index++;
        }, 200);
      }
      // 删除函数
      function clean() {
        timer = setInterval(() => {
          if (span && span.innerText.length == 0) {
            div && (div.style.opacity = "0");
            div && (div.style.transform = "translateY(-20px)");
            clearInterval(timer);
            request(4500);
            return;
          }
          texts.pop();
          span && (span.innerText = texts.join(""));
          // console.log("在重复清除");
        }, 200);
      }
      router.beforeEach((to,from) => {
        if (to.path == "/" && to.path == from.path) {
          return;
        } 
        clearInterval(timer);
      });
      router.afterEach((to, from) => {
        if (to.path == "/") {
          if (to.path == from.path) {
            // console.log("主页翻页");
            return;
          }
          // console.log("主页");
          getElement();
          request(1000);
        } else {
          // console.log("子页");
          clearInterval(timer);
        }
      });
      // 切换页面后重新获取html元素
      function getElement() {
        span = document.getElementById("hitokoto_text") as HTMLSpanElement;
        div = document.getElementById("hitokoto_author") as HTMLDivElement;
      }
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });
  },
  layouts: {},
  rootComponents: [],
});
