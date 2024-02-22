import { defineClientConfig } from "vuepress/client";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import { HitokotoOption } from "..";
import { HitokotoApi } from "./hitokoto-api";
declare const backgroundOptions: HitokotoOption;

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {
    let timer;
    onMounted(() => {
      // 或者 vue-router 实例
      const router = useRouter();
      let content = "";
      let author = "";
      let texts = content.split("");

      // 请求
      const request = (delay) => {
        var delayT = setTimeout(async () => {
          clearTimeout(delayT);
          const res = await HitokotoApi.request();
          if (res.status == 200) {
            content = res.data.hitokoto;
            author = res.data.from_who
              ? `——   「 ${res.data.from} • ${res.data.from_who} 」`
              : `——   「 ${res.data.from} 」`;
            texts = content.split("");
            loopShow();
            // console.log("请求了");
          }
        }, delay);
      };

      // 显示函数
      const loopShow = () => {
        clearInterval(timer);

        let span: HTMLSpanElement | null = document.getElementById(
          "hitokoto_text"
        ) as HTMLSpanElement;
        let div: HTMLDivElement | null = document.getElementById(
          "hitokoto_author"
        ) as HTMLDivElement;

        let index = 0;
        let del = false;
        let pauseNum = 0;
        let pauseMax = 20;

        timer = setInterval(() => {
          const txt = texts[index];
          if (pauseNum == 0) {
          } else {
            pauseNum--;

            if (span && span.innerText.length == 0 && pauseNum == 0) {
              clearInterval(timer);
              request(0);
            }
            return;
          }
          if (del) {
            span && (span.innerText = span.innerText.slice(0, index));
            if (index < 4) {
              div && (div.style.opacity = "0");
              div && (div.style.transform = "translateY(-20px)");
            }
          } else {
            span && (span.innerText += txt);
            div && (div.style.opacity = "1");
            div && (div.style.transform = "translateY(0px)");
            div && (div.innerText = author);
          }
          if (del) {
            index--;
          } else {
            index++;
          }
          if (index >= texts.length) {
            del = true;
            index == texts.length;
            pauseNum = pauseMax;
          }
          if (index < 0) {
            del = false;
            index = 0;
            pauseNum = pauseMax;
          }
        }, 200);
      };

      request(2000);

      router.beforeEach((to, from) => {
        if (to.path == "/") {
          nextTick(() => {
            request(2000);
          });
        }
      });
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });
  },
  rootComponents: [],
});
