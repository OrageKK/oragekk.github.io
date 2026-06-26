<template>
  <div
    id="article-list"
    :class="['vp-article-list', `article-list-${articleListLayout}`]"
    role="feed"
  >
    <template v-if="currentArticles.length">
      <DropTransition
        v-for="({ info, path }, index) in currentArticles"
        :key="path"
        appear
        :delay="index * 0.04"
      >
        <ArticleItem :info="info" :path="path" />
      </DropTransition>

      <Pagination
        :current="currentPage"
        :per-page="articlePerPage"
        :total="sortedArticles.length"
        @update-current-page="updatePage"
      />
    </template>

    <EmptyIcon v-else />
  </div>
</template>

<script setup lang="ts">
import { isSupported, usePageview } from "@vuepress/plugin-comment/pageview";
import type { Article } from "@vuepress/plugin-blog/client";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vuepress/client";
import { DropTransition } from "@theme-hope/components/transitions/index";
import ArticleItem from "@theme-hope/modules/blog/components/ArticleItem";
import Pagination from "@theme-hope/modules/blog/components/Pagination";
import { EmptyIcon } from "@theme-hope/modules/blog/components/icons/index";
import { useBlogOptions } from "@theme-hope/modules/blog/composables/index";
import type {
  ArticleInfoData,
  PageInfoData,
} from "vuepress-theme-hope/shared";

type ArticleListLayout = "single" | "double";

const props = withDefaults(
  defineProps<{
    items?: Article<PageInfoData & ArticleInfoData>[];
  }>(),
  {
    items: () => [],
  }
);

const route = useRoute();
const router = useRouter();
const blogOptions = useBlogOptions();
const updatePageview = usePageview();
const currentPage = ref(1);

const articlePerPage = computed(() => blogOptions.value.articlePerPage ?? 10);

const articleListLayout = computed<ArticleListLayout>(() =>
  (blogOptions.value as { articleListLayout?: ArticleListLayout })
    .articleListLayout === "single"
    ? "single"
    : "double"
);

const getSticky = (info: PageInfoData & ArticleInfoData): number | boolean =>
  info.u ?? false;

const compareDateDesc = (
  prev: PageInfoData & ArticleInfoData,
  next: PageInfoData & ArticleInfoData
): number => (next.d ?? 0) - (prev.d ?? 0);

const compareByHopeArticleSorter = (
  prev: Article<PageInfoData & ArticleInfoData>,
  next: Article<PageInfoData & ArticleInfoData>
): number => {
  const prevSticky = getSticky(prev.info);
  const nextSticky = getSticky(next.info);

  if (prevSticky && nextSticky && prevSticky !== nextSticky)
    return Number(nextSticky) - Number(prevSticky);

  if (prevSticky && !nextSticky) return -1;
  if (!prevSticky && nextSticky) return 1;

  return compareDateDesc(prev.info, next.info);
};

const sortedArticles = computed(() =>
  [...props.items].sort(compareByHopeArticleSorter)
);

const currentArticles = computed(() =>
  sortedArticles.value.slice(
    (currentPage.value - 1) * articlePerPage.value,
    currentPage.value * articlePerPage.value
  )
);

const updatePage = async (page: number): Promise<void> => {
  currentPage.value = page;

  const query = { ...route.query };
  const needUpdate = !(
    query["page"] === page.toString() ||
    (page === 1 && !query["page"])
  );

  if (needUpdate) {
    if (page === 1) delete query["page"];
    else query["page"] = page.toString();

    await router.push({ path: route.path, query });
  }

  if (isSupported) {
    await nextTick();
    updatePageview({ selector: ".vp-pageview" });
  }
};

onMounted(() => {
  const { page } = route.query;

  void updatePage(page ? Number(page) : 1);

  watch(currentPage, () => {
    const list = document.querySelector<HTMLElement>("#article-list");
    if (!list) return;

    const distance = list.getBoundingClientRect().top + window.scrollY;

    setTimeout(() => {
      window.scrollTo(0, distance);
    }, 100);
  });
});
</script>
