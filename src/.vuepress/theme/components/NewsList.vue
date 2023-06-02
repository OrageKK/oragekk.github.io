<template>
  <div id="article-list" class="vp-article-list">
    <h3 :data-item-count="String(items.length)">
      共{{ items.length }}条碎碎念~ (｡♥‿♥｡)
    </h3>
    <figure>
      <img class="news-top-img" src="https://api.vvhan.com/api/acgimg" alt="图" />
    </figure>
    <template v-if="currentArticles.length">
      <template v-for="({ info, path }, index) in currentArticles">
        <DropTransition :appear="true" :delay="index * 0.04">
          <NewsItem :info="info" :path="path" :key="path" />
        </DropTransition>
      </template>
      <Pagination
        :current="currentPage"
        :perPage="articlePerPage"
        :total="items.length"
        @update-current-page="updatePage"
      />
    </template>
    <EmptyIcon v-else />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { Article } from "vuepress-plugin-blog2/client";
import Pagination from "@theme-hope/modules/blog/components/Pagination";
import { EmptyIcon } from "@theme-hope/modules/blog/components/icons/index";
import { useBlogOptions } from "@theme-hope/modules/blog/composables/index";
import { ArticleInfo } from "vuepress-theme-hope/shared";
import NewsItem from "./NewsItem.vue";
declare const SUPPORT_PAGEVIEW: boolean;

const props = defineProps<{
  items: Article<ArticleInfo>[];
}>();
const route = useRoute();
const router = useRouter();
const blogOptions = useBlogOptions();
const currentPage = ref(1);
const articlePerPage = computed(() => blogOptions.value.articlePerPage || 10);
const currentArticles = computed(() =>
  props.items.slice(
    (currentPage.value - 1) * articlePerPage.value,
    currentPage.value * articlePerPage.value
  )
);
const updatePage = (page: number) => {
  currentPage.value = page;
  const query = { ...route.query };
  if (query["page"] === page.toString() || (page === 1 && !query["page"]))
    return;
  if (page === 1) delete query["page"];
  else query["page"] = page.toString();
  void router.push({ path: route.path, query });
};
onMounted(() => {
  const { page } = route.query;
  updatePage(page ? Number(page) : 1);
  if (SUPPORT_PAGEVIEW)
    if (SUPPORT_PAGEVIEW) {
      void import(
        /* webpackChunkName: "pageview" */ "vuepress-plugin-comment2/pageview"
      ).then(({ updatePageview }) => {
        updatePageview();
      });
    }
  watch(currentPage, () => {
    // list top border distance
    const distance =
      document.querySelector("#article-list").getBoundingClientRect().top +
      window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, distance);
    }, 100);
  });
  // FIXME: Workaround for https://github.com/vuepress/vuepress-next/issues/1249
  watch(
    () => route.query,
    ({ page }) => {
      updatePage(page ? Number(page) : 1);
    }
  );
});
</script>
<style lang="scss" scoped>
h3 {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
  font-family: PRshouxie;
  @media (max-width: hope-config.$pad) {
    font-size: 1.8rem;
  }
}
h3::before {
  content: "共" attr(data-item-count) "条碎碎念~ (｡♥‿♥｡)";
  position: absolute;
  color: #353434;
  transform: translate(-20px, 12px) scaleY(0.5) skew(50deg);
  z-index: -1;
  filter: blur(3px);
  -webkit-mask-image: linear-gradient(transprent, #6c6868);
  mask-image: linear-gradient(transprent, #6c6868);
}
figure {
  position: relative;
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 1rem auto;
  text-align: center;
  transition: transform var(--vp-tt);
}
.news-top-img {
  overflow: hidden;
  border-radius: 8px;
}
.news-top-img:hover {
  box-shadow: 2px 2px 10px 0 var(--card-shadow);
}
</style>
