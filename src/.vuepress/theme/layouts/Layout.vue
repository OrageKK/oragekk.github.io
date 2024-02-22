<template>
  <SkipLink />
  <CommonWrapper>
    <template #default>
      <template v-if="frontmatter.home">
        <HomePage v-if="frontmatter.home" />
      </template>
      <template v-else>
        <FadeSlideY>
          <NormalPage :key="page.path">
            <template #contentAfter>
              <Sponsor />
            </template>
          </NormalPage>
        </FadeSlideY>
      </template>
    </template>
    <template v-if="sidebarDisplay !== 'none'" #navScreenBottom>
      <BloggerInfo />
    </template>
    <template v-if="!isMobile && sidebarDisplay === 'always'" #sidebar>
      <BloggerInfo />
    </template>
  </CommonWrapper>
</template>
<script setup lang="ts">
import { usePageData, usePageFrontmatter } from "vuepress/client";
import { computed, onMounted, h, resolveComponent } from "vue";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import SkipLink from "@theme-hope/components/SkipLink";
import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import Sponsor from "../components/Sponsor.vue";
import {
  useThemeData,
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";
declare const ENABLE_BLOG: boolean
const themeData = useThemeData();
const themeLocale = useThemeLocaleData();
const page = usePageData();
const frontmatter = usePageFrontmatter();
const { isMobile } = useWindowSize();
const sidebarDisplay = computed(() =>
  ENABLE_BLOG
    ? themeLocale.value.blog?.sidebarDisplay ||
      themeData.value.blog?.sidebarDisplay ||
      "mobile"
    : "none"
);
</script>