<template>
  <SkipLink />
  <BlogWrapper>
    <div class="theme-container no-sidebar has-toc">
      <main class="vp-page" id="main-content">
        <div class="theme-hope-content">
          <DropTransition appear :delay="0.24">
            <NewsList :key="page.path" :items="items" />
          </DropTransition>
          <component :is="commentService" :darkmode="isDarkmode"></component>
        </div>
      </main>
    </div>
  </BlogWrapper>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import { usePageData } from "vuepress/client";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { useBlogType } from '@vuepress/plugin-blog/client'
import type { ArticleInfo } from "vuepress-theme-hope";
import SkipLink from "@theme-hope/components/SkipLink";
import NewsList from "../components/NewsList.vue";

const news = useBlogType<ArticleInfo>("news");
const page = usePageData();
const items = computed(() => (news.value ? news.value.items : null));
const { isDarkmode } = useDarkmode();
const commentService = computed(() =>
  hasGlobalComponent("CommentService") ? "CommentService" : null
);
const hasGlobalComponent = (componentName) => {
  return !!resolveComponent(componentName);
};
</script>

<style lang="scss" scoped>
.vp-page {
  padding-inline-end: 0 !important;
}
</style>
