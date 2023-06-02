<template>
  <BlogWrapper>
    <div class="vp-page vp-blog">
      <div class="blog-page-wrapper">
        <main class="vp-blog-main" id="main-content">
          <div class="news-content">
            <DropTransition appear :delay="0.24">
              <NewsList :key="page.path" :items="items" />
            </DropTransition>
            <component :is="commentService" :darkmode="isDarkmode"></component>
          </div>
        </main>
      </div>
    </div>
  </BlogWrapper>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import { usePageData } from "@vuepress/client";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { useBlogType } from "vuepress-plugin-blog2/client";
import { ArticleInfo } from "vuepress-theme-hope/shared";
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
.vp-blog-main {
  flex: 1;
  width: 0;
  max-width: 780px;
}
.waline-wrapper {
  // background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.4rem;
  background-image: linear-gradient(to top, #a8ede9be 0%, #fed6e3b1 100%);
}
</style>
