<template>
  <div class="vp-article-wrapper">
    <article
      class="vp-article-item"
      vocab="https://schema.org/"
      typeof="Article"
    >
      <div class="news-item-content">
        <div class="info-row">
          <img class="avatar" src="/assets/avatar.webp" />
          <div>
            <a href="/intro"><span class="name">上冬十二</span></a>
            <div class="page-info" v-if="pinfo">
              <DateInfo v-bind="pinfo" />
              <PageViewInfo v-bind="pinfo" />
              <TagInfo v-bind="pinfo" />
              <WordInfo v-bind="pinfo" />
            </div>
          </div>
        </div>
        <hr class="vp-article-hr" />
        <slot name="excerpt" v-bind="{ excerpt }">
          <template v-if="excerpt">
            <!-- <div class="vp-article-excerpt" v-html="excerpt"></div> -->
            <Content :page-key="routeName" />
          </template>
        </slot>
      </div>
      <div class="tag">
        <span property="headline">#{{ title }}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useArticleInfo } from "@theme-hope/modules/blog/composables/index";
import DateInfo from "@theme-hope/modules/info/components/DateInfo";
import PageViewInfo from "@theme-hope/modules/info/components/PageViewInfo";
import TagInfo from "@theme-hope/modules/info/components/TagInfo";
import WordInfo from "@theme-hope/modules/info/components/WordInfo";
import { toRef } from "vue";
import { ArticleInfo } from "vuepress-theme-hope/shared";
import { Content } from "@vuepress/client";
import { useRouter } from "vue-router";
import "vuepress-theme-hope/client/modules/info/styles/page-info.scss";
import { computed } from "vue";
interface Articles {
  /**
   * Article path
   *
   * 文章路径
   */
  path: string;
  /**
   * Article information
   *
   * 文章信息
   */
  info: ArticleInfo;
}
const props = defineProps<Articles>();
const articleInfo = toRef(props, "info");
const { info: pageInfo, items } = useArticleInfo(props);
const {
  ["t" /* ArticleInfoType.title */]: title,
  ["s" /* ArticleInfoType.title */]: shortTitle,
  ["y" /* ArticleInfoType.type */]: type,
  ["n" /* ArticleInfoType.isEncrypted */]: isEncrypted = false,
  ["v" /* ArticleInfoType.cover */]: cover,
  ["e" /* ArticleInfoType.excerpt */]: excerpt,
  ["u" /* ArticleInfoType.sticky */]: sticky,
} = articleInfo.value;
const pinfo = pageInfo.value;
const router = useRouter();
// 假设你要获取 path 为 '/foo' 的路由的名称
const route = router.resolve(props.path);
const routeName = computed(() => (route ? route.name.toString() : ""));
</script>

<style lang="scss" scoped>
.vp-article-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 1.25rem;

  text-align: start;
  overflow-wrap: break-word;
  @media (max-width: hope-config.$pad) {
    margin: 0 auto 1rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
  .tag {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #000;
    color: white;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    padding: 2px 6px;
    text-align: center;
    font-family: ZWZT;
    @media (max-width: hope-config.$pad) {
      font-size: 0.8rem;
    }
  }
}

.vp-article-item {
  overflow: hidden;
  padding: 0;
  border-radius: 0.4rem;

  background: var(--bg-color-float);
  color: inherit;
  box-shadow: 0 1px 3px 1px var(--card-shadow);

  transition: background var(--color-transition),
    box-shadow var(--color-transition), transform 0.5s ease;

  &:hover {
    box-shadow: 0 2px 6px 2px var(--card-shadow);
    transform: scale(1.01);
  }
}
.news-item-content {
  position: relative;
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  .info-row {
    display: flex;
    flex-direction: row;
    // margin: 0px 20px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 20%;
      margin-right: 10px;
    }
  }
  .vp-article-hr {
    height: 2px;
    border: none;
    background: linear-gradient(
      to right,
      #7873f5 0%,
      #97d9e1 33%,
      #ec77ab 100%
    );
  }
}
</style>
