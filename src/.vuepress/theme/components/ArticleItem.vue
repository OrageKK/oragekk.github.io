<template>
  <div class="vp-article-wrapper">
    <article class="vp-article-item" vocab="https://schema.org/" typeof="Article">
      <template v-if="cover">
        <img
          class="vp-article-cover"
          :src="withBase(cover)"
          alt=""
          loading="lazy"
        />
        <meta property="image" :content="withBase(cover)" />
      </template>

      <StickyIcon v-if="sticky" />

      <div class="vp-article-content">
        <div v-if="topMeta.length" class="vp-article-meta vp-article-meta-top">
          <span v-for="item in topMeta" :key="item">{{ item }}</span>
        </div>

        <RouteLink class="vp-article-title-link" :to="path">
          <header class="vp-article-title">
            <LockIcon v-if="isEncrypted" />
            <SlideIcon v-if="type === 's'" />
            <span property="headline">{{ title }}</span>
          </header>
        </RouteLink>

        <div class="vp-article-footer">
          <div class="vp-article-meta vp-article-meta-bottom">
            <span class="vp-article-tags">
              <RouteLink
                v-for="tag in tags"
                :key="tag"
                class="vp-article-tag"
                :to="getTagPath(tag)"
              >
                # {{ tag }}
              </RouteLink>
            </span>
            <time v-if="localizedDate">{{ localizedDate }}</time>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { categoriesMap } from "@temp/blog/category";
import { computed, toRef } from "vue";
import { RouteLink, useRouteLocale, withBase } from "vuepress/client";
import {
  SlideIcon,
  StickyIcon,
} from "@theme-hope/modules/blog/components/icons/index";
import { LockIcon } from "@theme-hope/modules/encrypt/components/icons";
import type {
  ArticleInfoData,
  PageInfoData,
} from "vuepress-theme-hope/shared";

const props = defineProps<{
  info: PageInfoData & ArticleInfoData;
  path: string;
}>();

const routeLocale = useRouteLocale();
const articleInfo = toRef(props, "info");

const title = computed(() => articleInfo.value.t);
const type = computed(() => articleInfo.value.y);
const cover = computed(() => articleInfo.value.v);
const sticky = computed(() => articleInfo.value.u);
const isEncrypted = computed(() => articleInfo.value.n ?? false);
const categories = computed(() => articleInfo.value.c ?? []);
const tags = computed(() => articleInfo.value.g ?? []);
const localizedDate = computed(() => articleInfo.value.l);
const topMeta = computed(() => [
  ...(sticky.value ? ["置顶"] : []),
  ...categories.value,
]);

const getTagPath = (tag: string): string =>
  categoriesMap.tag?.[routeLocale.value]?.map?.[tag]?.path ?? `/tag/${tag}/`;
</script>
