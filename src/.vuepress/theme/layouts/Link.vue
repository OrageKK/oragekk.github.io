<template>
  <SkipLink />
  <CommonWrapper>
    <template #default>
      <main class="vp-page anzhiyu-link-page" id="main-content">
        <DropTransition appear :delay="0.16">
          <div id="page">
            <h1 class="page-title">{{ page.title }}</h1>
            <div id="article-container">
              <div id="flink-banners">
                <div class="banner-top-box">
                  <div class="flink-banners-title">
                    <div class="banners-title-small">{{ page.banner.smallTitle }}</div>
                    <div class="banners-title-big">{{ page.banner.title }}</div>
                  </div>
                  <div class="banner-button-group">
                    <a class="banner-button secondary no-text-decoration" href="/link/" title="随机访问" @click.prevent="handleRandomFriend">
                      <i class="iconfont icon-hk-Random-outlined"></i>
                      <span class="banner-button-text">随机访问</span>
                    </a>
                    <a class="banner-button no-text-decoration" href="#post-comment" title="申请友链" @click.prevent="handleApplyFriend">
                      <i class="iconfont icon-hk-yuanxian"></i>
                      <span class="banner-button-text">申请友链</span>
                    </a>
                  </div>
                </div>

                <div id="skills-tags-group-all">
                  <div class="tags-group-wrapper">
                    <div v-for="(pair, pairIndex) in bannerAvatarPairs" :key="`pair-${pairIndex}`" class="tags-group-icon-pair">
                      <a
                        v-for="(item, index) in pair"
                        :key="`pair-${pairIndex}-${index}-${item.link}`"
                        class="tags-group-icon no-text-decoration"
                        :href="item.link"
                        :title="item.name"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img class="no-lightbox" :src="item.avatar" :alt="item.name" @error="handleImageError" />
                        <div class="flink-banner-avatar-overlay">
                          <span>{{ item.name }}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flink">
                <template v-for="group in groups" :key="group.class_name">
                  <h2>{{ group.class_name }}({{ group.link_list.length }})</h2>
                  <div v-if="group.class_desc" class="flink-desc">{{ group.class_desc }}</div>

                  <div
                    v-if="group.flink_style === 'anzhiyu'"
                    :class="['anzhiyu-flink-list', { 'cf-friends-lost-contact': group.lost_contact }]"
                  >
                    <div v-for="item in group.link_list" :key="`${item.name}-${item.link}`" class="flink-list-item">
                      <span v-if="item.tag || item.recommend" :class="siteCardTagClass(item)" :style="siteCardTagStyle(item)">
                        {{ item.tag || "推荐" }}
                        <i v-if="item.color === 'vip'" class="light"></i>
                      </span>
                      <a
                        :class="['cf-friends-link', { 'is-disabled': isLinkDisabled(item, group.lost_contact) }]"
                        :href="getFriendHref(item, group.lost_contact)"
                        :cf-href="item.link"
                        :title="item.name"
                        :target="isLinkDisabled(item, group.lost_contact) ? undefined : '_blank'"
                        :rel="isLinkDisabled(item, group.lost_contact) ? undefined : 'noopener noreferrer'"
                        :aria-disabled="isLinkDisabled(item, group.lost_contact)"
                        :tabindex="isLinkDisabled(item, group.lost_contact) ? -1 : undefined"
                        @click="handleFriendClick($event, item, group.lost_contact)"
                      >
                        <img
                          class="cf-friends-avatar no-lightbox"
                          :src="item.avatar"
                          :cf-src="item.avatar"
                          :alt="item.name"
                          @error="handleImageError"
                        />
                        <div class="flink-item-info">
                          <div :class="['flink-item-name', group.lost_contact ? 'cf-friends-name-lost-contact' : 'cf-friends-name']">
                            {{ item.name }}
                          </div>
                          <div v-if="!group.lost_contact" class="flink-item-desc" :title="item.descr">{{ item.descr }}</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div v-else class="flexcard-flink-list">
                    <a
                      v-for="item in group.link_list"
                      :key="`${item.name}-${item.link}`"
                      :class="[
                        'flink-list-card',
                        'cf-friends-link',
                        { 'is-disabled': isLinkDisabled(item, group.lost_contact) },
                      ]"
                      :href="getFriendHref(item, group.lost_contact)"
                      :cf-href="item.link"
                      :data-title="item.descr"
                      :title="item.name"
                      :target="isLinkDisabled(item, group.lost_contact) ? undefined : '_blank'"
                      :rel="isLinkDisabled(item, group.lost_contact) ? undefined : 'noopener noreferrer'"
                      :aria-disabled="isLinkDisabled(item, group.lost_contact)"
                      :tabindex="isLinkDisabled(item, group.lost_contact) ? -1 : undefined"
                      @click="handleFriendClick($event, item, group.lost_contact)"
                    >
                      <div class="wrapper cover">
                        <img class="cover fadeIn no-lightbox" :src="getSiteshot(item)" alt="cover" @error="handleCoverError" />
                      </div>
                      <div class="info">
                        <img
                          class="cf-friends-avatar no-lightbox flink-avatar"
                          :src="item.avatar"
                          :cf-src="item.avatar"
                          :alt="item.name"
                          @error="handleImageError"
                        />
                        <span class="flink-sitename cf-friends-name">{{ item.name }}</span>
                      </div>
                    </a>
                  </div>
                </template>
              </div>

              <section class="link-info-panel">
                <h2>本站信息如下</h2>
                <table>
                  <tbody>
                    <tr>
                      <th>昵称</th>
                      <td>{{ site.name }}</td>
                    </tr>
                    <tr>
                      <th>简介</th>
                      <td>{{ site.descr }}</td>
                    </tr>
                    <tr>
                      <th>头像</th>
                      <td>{{ site.avatar }}</td>
                    </tr>
                    <tr>
                      <th>连接</th>
                      <td>{{ site.link }}</td>
                    </tr>
                  </tbody>
                </table>

                <h2>申请方式</h2>
                <ol>
                  <li>把本站添加到你的站点中</li>
                  <li>在评论区按照以下格式留言</li>
                </ol>
                <pre><code>昵称: {{ page.applyExample.name }}
简介: {{ page.applyExample.descr }}
头像: {{ page.applyExample.avatar }}
链接: {{ page.applyExample.link }}</code></pre>

                <h2>免责声明</h2>
                <ol>
                  <li v-for="item in page.disclaimer" :key="item">{{ item }}</li>
                </ol>

                <h2>声明</h2>
                <ol>
                  <li v-for="item in page.statement" :key="item">{{ item }}</li>
                </ol>
              </section>
            </div>
          </div>
        </DropTransition>
        <component v-if="commentService" :is="commentService" :darkmode="isDarkmode" />
      </main>
    </template>
  </CommonWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { hasGlobalComponent } from "@vuepress/helper/client";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import SkipLink from "@theme-hope/components/SkipLink";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { linkGroups, linkPage, siteInfo, type LinkItem } from "../../data/link";

const page = linkPage;
const site = siteInfo;
const groups = linkGroups;

const bannerAvatarPairs = computed(() => {
  const friends = groups.flatMap((group) => group.link_list).slice(0, 24);
  const repeated = [...friends, ...friends];
  const pairs: LinkItem[][] = [];

  for (let index = 0; index < repeated.length; index += 2) {
    pairs.push(repeated.slice(index, index + 2));
  }

  return pairs;
});

const getSiteshot = (item: LinkItem): string =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(item.link)}?w=323&h=200`;

const isLinkDisabled = (item: LinkItem, lostContact?: boolean): boolean =>
  Boolean(lostContact) || !item.link;

const getFriendHref = (item: LinkItem, lostContact?: boolean): string | undefined =>
  isLinkDisabled(item, lostContact) ? undefined : item.link;

const handleFriendClick = (
  event: MouseEvent,
  item: LinkItem,
  lostContact?: boolean
) => {
  if (isLinkDisabled(item, lostContact)) event.preventDefault();
};

const siteCardTagClass = (item: LinkItem): string[] => [
  "site-card-tag",
  item.color === "vip" ? "vip" : "",
  item.color === "speed" ? "speed" : "",
].filter(Boolean);

const siteCardTagStyle = (item: LinkItem): Record<string, string> =>
  item.color && !["vip", "speed"].includes(item.color) ? { backgroundColor: item.color } : {};

const handleImageError = (event: Event) => {
  const image = event.target as HTMLImageElement;
  image.onerror = null;
  image.src = "/assets/avatar.webp";
};

const handleCoverError = (event: Event) => {
  const image = event.target as HTMLImageElement;
  image.onerror = null;
  image.src = "/assets/home_bg3.jpg";
};

const handleRandomFriend = () => {
  const friends = groups.flatMap((group) => group.link_list).filter((item) => item.link);
  const friend = friends[Math.floor(Math.random() * friends.length)];

  if (friend) window.open(friend.link, "_blank", "noopener,noreferrer");
};

const handleApplyFriend = () => {
  const commentSection =
    document.querySelector('.vp-comment') ||
    document.querySelector('#waline') ||
    document.querySelector('[class*="comment"]') ||
    document.querySelector('main.vp-page > div:last-child');

  commentSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  setTimeout(() => {
    const textarea =
      document.querySelector('#wl-edit') ||
      document.querySelector('textarea.wl-editor') ||
      document.querySelector('textarea');

    if (textarea instanceof HTMLTextAreaElement) {
      textarea.focus();
    }
  }, 350);
};

onMounted(() => {
  document.body.setAttribute("data-type", "link");
});

onUnmounted(() => {
  document.body.removeAttribute("data-type");
});

const { isDarkmode } = useDarkmode();
const commentService = computed(() =>
  hasGlobalComponent("CommentService") ? "CommentService" : null
);
</script>

<style lang="scss">
@use "../styles/variables";
@use "../styles/base";
@use "../styles/animations";
@use "../styles/skills-tags";
@use "../styles/layout";

.anzhiyu-link-page > #page {
  @include variables.styles;
  @include base.styles;
  @include animations.styles;
  @include skills-tags.styles;
}

@include layout.page-shell("link", "anzhiyu-link-page");

body[data-type="link"] {
  background: transparent !important;
}

// flink-banners 头像 hover 覆盖显示博客名
.anzhiyu-link-page #flink-banners #skills-tags-group-all .tags-group-icon {
  position: relative;
  overflow: hidden;

  .flink-banner-avatar-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(66, 90, 239, 0.85);
    opacity: 0;
    transition: opacity 0.35s ease-in-out;
    pointer-events: none;

    span {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.3;
      text-align: center;
      padding: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  &:hover .flink-banner-avatar-overlay {
    opacity: 1;
  }
}

[data-theme="dark"] #flink-banners #skills-tags-group-all .tags-group-icon .flink-banner-avatar-overlay {
  background: rgba(255, 165, 30, 0.85);

  span {
    color: var(--anzhiyu-white, #f2f4f8);
  }
}

body[data-type="link"] #web_bg {
  background: transparent !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flink {
  overflow: hidden;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flink h2 {
  margin: 1.5rem 0 0.6rem;
  padding-top: 0;
  color: var(--anzhiyu-fontcolor, var(--font-color));
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flink-desc {
  color: var(--anzhiyu-secondtext, #666261);
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .anzhiyu-flink-list,
body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flexcard-flink-list {
  clear: both;
  width: 100%;
  margin-bottom: 1rem;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .anzhiyu-flink-list::after,
body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flexcard-flink-list::after {
  display: block;
  clear: both;
  content: "";
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item {
  box-sizing: border-box;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .cf-friends-link.is-disabled {
  cursor: not-allowed !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel h2 {
  margin: 1.2rem 0 0.75rem;
  padding-top: 0;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel h2:first-child {
  margin-top: 0;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel table {
  display: table;
  width: 100%;
  margin: 0 0 1rem;
  border-collapse: collapse;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel th,
body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel td {
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--anzhiyu-card-border, var(--border-color));
  text-align: left;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel th {
  width: 7rem;
  color: var(--anzhiyu-fontcolor, var(--font-color));
  background: color-mix(in srgb, var(--anzhiyu-card-bg, #fff) 76%, var(--anzhiyu-theme, #425aef));
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel code {
  font-family: var(--code-font-family);
}

[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container {
  --anzhiyu-card-bg: rgba(31, 34, 40, 0.9);
  --anzhiyu-card-border: rgba(255, 255, 255, 0.12);
  --anzhiyu-fontcolor: #e6e9ef;
  --anzhiyu-secondtext: #aeb7c4;
  --anzhiyu-background: #1d2025;
  --anzhiyu-white: #f2f4f8;
  --font-color: #e6e9ef;
  --link-banner-bg: #1d1f24;
  --link-banner-border: rgba(255, 255, 255, 0.12);
  --link-banner-shadow: 0 10px 32px rgba(0, 0, 0, 0.28);
  --link-banner-small-color: rgba(255, 255, 255, 0.52);
  --link-banner-title: linear-gradient(90deg, #4f7df5 0%, #a958e8 45%, #ff3d69 100%);
  --link-banner-button-border: rgba(255, 255, 255, 0.14);
  --link-banner-button-bg: rgba(255, 255, 255, 0.92);
  --link-banner-button-color: #1d1f24;
  --link-banner-secondary-bg: rgba(29, 31, 36, 0.74);
  --link-banner-secondary-color: rgba(255, 255, 255, 0.86);
  color: var(--anzhiyu-fontcolor) !important;
}

[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item {
  background: var(--anzhiyu-card-bg) !important;
  border-color: var(--anzhiyu-card-border) !important;
  color: var(--anzhiyu-fontcolor) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24) !important;
}

[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item:hover {
  background: var(--anzhiyu-theme, #425aef) !important;
  border-color: var(--anzhiyu-theme, #425aef) !important;
  color: var(--anzhiyu-white, #fff) !important;
  box-shadow: var(--anzhiyu-shadow-main, 0 8px 24px rgba(66, 90, 239, 0.32)) !important;
}

[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item:hover .cf-friends-link,
[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item:hover .flink-item-name,
[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item:hover .flink-item-desc {
  color: var(--anzhiyu-white, #fff) !important;
}

[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel {
  border-color: var(--anzhiyu-card-border) !important;
  background: var(--anzhiyu-card-bg) !important;
  color: var(--anzhiyu-fontcolor) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24) !important;
}

@media (max-width: 768px) {
  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page {
    overflow-x: hidden !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #page {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flink {
    box-sizing: border-box !important;
    width: 100% !important;
    padding: 0 0.75rem !important;
    overflow: hidden !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flink h2,
  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flink-desc {
    text-align: center !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list,
  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flexcard-flink-list {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100% !important;
    margin: 0 !important;
    overflow: visible !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container .anzhiyu-flink-list .flink-list-item {
    float: none !important;
    width: min(100%, 28rem) !important;
    max-width: 28rem !important;
    margin: 0.55rem auto !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .flexcard-flink-list > a {
    float: none !important;
    width: min(100%, 28rem) !important;
    max-width: 28rem !important;
    margin: 0.65rem auto !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel {
    box-sizing: border-box !important;
    width: calc(100% - 1.5rem) !important;
    max-width: 28rem !important;
    margin-right: auto !important;
    margin-left: auto !important;
    padding: 1rem !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel table {
    table-layout: fixed !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel th {
    width: 4.5rem !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel td {
    overflow-wrap: anywhere !important;
  }
}
/* Link page styles - link_page fix */
/* _extra/fix/link_page.css */
body[data-type="link"] main #page {
  border: 0;
  box-shadow: none !important;
  padding: 0 !important;
  background: transparent !important;
}

[data-theme="dark"] body[data-type="link"] #page {
  background: transparent;
}

.flink .anzhiyu-flink-list {
  padding: 0;
}



/* Link page styles - flink banners + lists + article-container */
body[data-type="link"] #page .page-title {
  display: none;
}
.anzhiyu-link-page #flink-banners {
  display: flex;
  width: 100%;
  height: 76%;
  background: var(--anzhiyu-card-bg);
  padding: 1.5rem;
  border: var(--style-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: var(--anzhiyu-shadow-border);
  flex-direction: column;
  overflow: hidden;
  transition: 0.3s;
  will-change: transform;
  animation: slide-in 0.6s 0.2s backwards;
}
.anzhiyu-link-page #flink-banners .flink .banners-title {
  top: 1.5rem;
}
.anzhiyu-link-page #flink-banners .banner-top-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.anzhiyu-link-page #flink-banners .banner-button-group {
  position: absolute;
  right: 2rem;
  top: 2.5rem;
  display: flex;
}
@media screen and (max-width: 768px) {
  .anzhiyu-link-page #flink-banners .banner-button-group {
    display: none;
  }
}
.anzhiyu-link-page #flink-banners .banner-button-group .banner-button i {
  margin-right: 0;
  font-size: 1rem;
}
.anzhiyu-link-page #flink-banners #skills-tags-group-all .img-alt {
  display: none;
}
.anzhiyu-link-page #flink-banners #skills-tags-group-all .tags-group-wrapper {
  animation: rowup 120s linear infinite;
}
.anzhiyu-link-page > #page #flink-banners #skills-tags-group-all .tags-group-icon {
  border-radius: 50%;
  overflow: hidden;
}
.anzhiyu-link-page > #page #flink-banners #skills-tags-group-all .tags-group-icon img {
  width: 100% !important;
  height: 100% !important;
  min-width: 100%;
  min-height: 100%;
  margin: 0 !important;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
.flink-desc {
  margin: 0.2rem 0 0.5rem;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list {
  overflow: auto;
  margin: -6px;
  text-align: center;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .img-alt {
  display: none;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list.cf-friends-lost-contact .flink-list-item {
  height: 60px;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list.cf-friends-lost-contact .flink-list-item:hover .cf-friends-link img {
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0.5rem;
  min-width: 0px;
  min-height: 0px;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list.cf-friends-lost-contact .flink-list-item .cf-friends-link img {
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item {
  margin: 6px 6px;
  transition: 0.3s;
  border-radius: 12px;
  transition-timing-function: ease-in-out;
  position: relative;
  width: calc(20% - 12px);
  border: var(--style-border);
  box-shadow: var(--anzhiyu-shadow-border);
  background: var(--anzhiyu-card-bg);
  display: flex;
  float: left;
  overflow: hidden;
  height: 90px;
  line-height: 17px;
  transform: translateZ(0px);
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item .cf-friends-link {
  display: flex;
  border: none;
  width: 100%;
  height: 100%;
  align-items: center;
  color: var(--anzhiyu-fontcolor);
  text-decoration: none;
  font-weight: bold;
  padding: 0 4px;
  border-radius: 4px 4px 0 0;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item .cf-friends-link img {
  border-radius: 32px;
  margin: 15px 20px 15px 15px;
  transition: 0.3s;
  background: var(--anzhiyu-background);
  min-width: 60px;
  min-height: 60px;
  width: 60px;
  height: 60px;
  float: left;
  object-fit: cover;
}
@media screen and (max-width: 1200px) {
  .anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item {
    width: calc(50% - 15px) !important;
  }
}
@media screen and (max-width: 600px) {
  .anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item {
    width: calc(100% - 15px) !important;
  }
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover:before,
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:focus:before,
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:active:before {
  transform: scale(1);
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item .flink-item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 90px);
  height: fit-content;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item .flink-item-info .flink-item-name {
  text-align: left;
  line-height: 20px;
  color: var(--anzhiyu-fontcolor);
  display: block;
  padding: 0px 10px 0px 0px;
  font-weight: 700;
  font-size: 19px;
  max-width: calc(100% - 12px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item .flink-item-info .flink-item-desc {
  white-space: normal;
  padding: 5px 10px 16px 0;
  color: var(--anzhiyu-fontcolor);
  text-align: left;
  font-size: 0.93em;
  height: 40px;
  text-overflow: ellipsis;
  opacity: 0.7;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover {
  transform: scale(1);
  background: var(--anzhiyu-theme);
  border: var(--style-border-hover);
  box-shadow: var(--anzhiyu-shadow-main);
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover .site-card-tag {
  left: -70px;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover a img {
  transition: 0.6s;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0.5rem;
  min-width: 0px;
  min-height: 0px;
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover a .flink-item-info {
  min-width: calc(100% - 20px);
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover a .flink-item-name {
  color: var(--anzhiyu-white);
}
.anzhiyu-link-page #article-container .anzhiyu-flink-list .flink-list-item:hover a .flink-item-desc {
  overflow: hidden;
  width: 100%;
  color: var(--anzhiyu-white);
}
.flink-name {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1.5em;
}
.anzhiyu-link-page #article-container img {
  margin: 0 auto 20px;
  object-fit: cover;
  max-height: 900px;
  max-width: 100%;
}
.anzhiyu-link-page .flexcard-flink-list {
  overflow: hidden;
}
.anzhiyu-link-page .flexcard-flink-list .flink-list-card .wrapper img {
  transition: transform 0.5s ease-out !important;
}
.anzhiyu-link-page .flexcard-flink-list .flink-list-card:hover {
  border-color: var(--anzhiyu-main) !important;
  background-color: var(--anzhiyu-main) !important;
  box-shadow: var(--anzhiyu-shadow-theme) !important;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link {
  position: relative;
  display: block;
  float: left;
  width: calc(100% / 5 - 0.5rem);
  height: 150px;
  margin: 0.5rem 0.25rem;
  padding: 0;
  overflow: hidden;
  border: var(--style-border) !important;
  border-radius: 8px;
  box-shadow: none;
  transition: all 0.3s ease 0s, transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link:hover .info {
  transform: translateY(-100%);
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link:hover .wrapper img {
  transform: scale(1.2);
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link:hover::before {
  position: fixed;
  inset: 10% 0 auto;
  z-index: 100;
  width: inherit;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(66, 90, 239, 0.8);
  color: #fff;
  content: attr(data-title);
  font-size: 20px;
  text-align: center;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .cover {
  width: 100%;
  transition: transform 0.5s ease-out;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .wrapper {
  position: relative;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .wrapper .fadeIn {
  animation: coverIn 0.8s ease-out forwards;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .wrapper img {
  height: 150px;
  pointer-events: none;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .info {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  transition: transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .wrapper .cover {
  position: absolute;
  top: 0;
  left: 0;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .info img {
  position: relative;
  top: 45px;
  z-index: 1;
  width: 80px;
  height: 80px;
  border-radius: 50% !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  text-align: center;
}
.anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link .info span {
  width: 100%;
  padding: 20px 10% 60px 10%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: var(--font-color);
  font-size: 16px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media screen and (max-width: 1024px) {
  .anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link {
    width: calc(33.33333% - 15px);
  }
}
@media screen and (max-width: 600px) {
  .anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link {
    width: calc(50% - 15px);
  }
}
[data-theme=dark] .anzhiyu-link-page .flexcard-flink-list a.flink-list-card.cf-friends-link .info,
[data-theme=dark] .anzhiyu-link-page .flexcard-flink-list a.flink-list-card.cf-friends-link .info span {
  background-color: rgba(0, 0, 0, 0.6);
}
[data-theme=dark] .anzhiyu-link-page .flexcard-flink-list > a.flink-list-card.cf-friends-link:hover:before {
  background-color: rgba(18, 18, 18, 0.8);
}
.justified-gallery > div > img,
.justified-gallery > figure > img,
.justified-gallery > a > a > img,
.justified-gallery > div > a > img,
.justified-gallery > figure > a > img,
.justified-gallery > a > svg,
.justified-gallery > div > svg,
.justified-gallery > figure > svg,
.justified-gallery > a > a > svg,
.justified-gallery > div > a > svg,
.justified-gallery > figure > a > svg {
  position: static !important;
}
.anzhiyu-link-page .site-card-tag {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 8px;
  background-color: var(--anzhiyu-theme);
  box-shadow: var(--anzhiyu-shadow-blue);
  color: var(--anzhiyu-white);
  z-index: 1;
  border-radius: 11px 0 12px 0;
  transition: 0.3s;
  font-size: 12px;
}
.anzhiyu-link-page .site-card-tag.speed {
  background: var(--anzhiyu-green);
  box-shadow: var(--anzhiyu-shadow-green);
}
.anzhiyu-link-page .site-card-tag.vip {
  background: linear-gradient(38deg, #e5b085 0%, #d48f16 100%);
  overflow: hidden;
  box-shadow: var(--anzhiyu-shadow-yellow);
}
.anzhiyu-link-page .site-card-tag i.light {
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 100px;
  height: 50px;
  background-image: -webkit-linear-gradient(0deg, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0));
  animation: light_tag 4s both infinite;
  will-change: transform;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: -8px;
  -webkit-box-align: stretch;
  align-items: stretch;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card {
  border: var(--style-border);
  border-radius: 12px;
  transition: 0.3s;
  transition-timing-function: ease-in-out;
  overflow: hidden;
  height: 200px;
  position: relative;
  width: calc(100% / 7 - 16px);
  background: var(--anzhiyu-card-bg);
  box-shadow: var(--anzhiyu-shadow-border);
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .img-alt {
  display: none;
}
@media screen and (max-width: 1200px) {
  .anzhiyu-link-page #article-container .telescopic-site-card-group .site-card {
    width: calc(20% - 16px) !important;
  }
}
@media screen and (max-width: 900px) {
  .anzhiyu-link-page #article-container .telescopic-site-card-group .site-card {
    width: calc(25% - 16px) !important;
  }
}
@media screen and (max-width: 768px) {
  .anzhiyu-link-page #article-container .telescopic-site-card-group .site-card {
    width: calc(33.3333% - 16px) !important;
  }
}
@media screen and (max-width: 600px) {
  .anzhiyu-link-page #article-container .telescopic-site-card-group .site-card {
    width: calc(50% - 16px) !important;
  }
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover {
  border: var(--style-border-hover);
  box-shadow: var(--anzhiyu-shadow-main);
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .info {
  background: var(--anzhiyu-theme);
  height: 120px;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .info .site-card-text .title {
  color: var(--anzhiyu-white);
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .info .site-card-text .desc {
  transition: 0.3s;
  color: var(--anzhiyu-white);
  width: 100%;
}
@media screen and (min-width: 768px) {
  .anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .info .site-card-text .desc {
    -webkit-line-clamp: 4;
  }
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .site-card-tag {
  left: -50px;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .img {
  height: 80px;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card:hover .img img {
  transform: scale(1.1);
  filter: brightness(0.3);
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .info {
  display: flex;
  border: none;
  padding: 0.7rem;
  width: 100%;
  height: 90px;
  margin: 0;
  border-radius: 0 0 12px 12px;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .info .site-card-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .info .site-card-text .title {
  color: var(--anzhiyu-fontcolor);
  text-align: left;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  transition: all 0.3s ease 0s;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .info .site-card-text .desc {
  font-size: 0.9rem;
  color: var(--anzhiyu-fontcolor);
  opacity: 0.7;
  transition: 0.3s;
  text-align: left;
  overflow-wrap: break-word;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .info .img-alt {
  display: none;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .info img {
  border-radius: 32px;
  transition: 0.3s !important;
  margin: 2px 8px 0 0;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  background: var(--anzhiyu-secondbg);
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .img {
  -webkit-mask-image: -webkit-radial-gradient(center, #fff, #000);
  border-radius: 0;
  height: 120px;
  width: 100%;
  display: flex;
  border: none;
  padding: 0 !important;
  transition: all 0.3s ease 0s;
}
.anzhiyu-link-page #article-container .telescopic-site-card-group .site-card .img img {
  border-radius: 0;
  transform: scale(1.03);
  transition: 0.3s;
  margin: 0;
  max-width: 100%;
}
@-moz-keyframes light_tag {
  0% {
    transform: skewx(0) translateX(-150px);
  }
  99% {
    transform: skewx(-25deg) translateX(50px);
  }
}
@-webkit-keyframes light_tag {
  0% {
    transform: skewx(0) translateX(-150px);
  }
  99% {
    transform: skewx(-25deg) translateX(50px);
  }
}
@-o-keyframes light_tag {
  0% {
    transform: skewx(0) translateX(-150px);
  }
  99% {
    transform: skewx(-25deg) translateX(50px);
  }
}
@keyframes light_tag {
  0% {
    transform: skewx(0) translateX(-150px);
  }
  99% {
    transform: skewx(-25deg) translateX(50px);
  }
}
.reward #con {
  width: 350px;
  height: 85px;
  position: relative;
  border-radius: 4px;
}
.reward #TA-con {
  width: 157px;
  height: 50px;
  background-color: #f25d8e;
  box-shadow: 0 4px 4px rgba(255,112,159,0.3);
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  border-radius: 4px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .reward #TA-con {
    width: 125px;
    left: 54px;
  }
}
.reward #TA-con:hover {
  background-color: #ff6b9a;
}
.reward #text-con {
  width: 100px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.reward #linght {
  width: 0;
  height: 0;
  position: absolute;
  top: 36%;
  left: 4px;
  border-color: transparent;
  border-style: solid;
  border-width: 10px;
  border-top: 10px solid #fff;
  border-radius: 4px;
  transform: rotate(-55deg);
}
.reward #linght::after {
  position: absolute;
  top: -13px;
  left: -11px;
  content: "";
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 10px;
  border-top: 10px solid #fff;
  transform: rotate(180deg);
  border-radius: 4px;
}
.reward #TA {
  float: right;
  line-height: 50px;
  font-size: 15px;
  color: #fff;
}
.reward #tube-con {
  width: 157px;
  height: 55px;
  position: absolute;
  right: -5px;
  top: 15px;
}
.reward svg {
  width: 100%;
  height: 100%;
}
.reward #mask {
  width: 0px;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
}
.reward #mask svg {
  width: 157px;
  height: 55px;
}
.reward #TA-con:hover + #tube-con > #mask {
  width: 157px;
}
.reward #TA-con:hover + #tube-con > #orange-mask {
  animation: move1 0.5s linear 0.2s infinite;
}
.reward #TA-con:hover + #tube-con > #orange-mask svg {
  animation: movetwo 0.5s linear 0.2s infinite;
}
.reward #orange-mask {
  width: 18px;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: -15px;
  top: 0px;
}
.reward #orange-mask svg {
  position: absolute;
  top: 0;
  left: 15px;
  width: 157px;
  height: 55px;
}
.reward #people {
  position: absolute;
  right: 10px;
  top: 4px;
  font-size: 12px;
  font-family: "雅黑";
  color: #aaa;
}
.reward #people > b {
  color: #777;
}
@-moz-keyframes move1 {
  0% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(140px);
  }
}
@-webkit-keyframes move1 {
  0% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(140px);
  }
}
@-o-keyframes move1 {
  0% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(140px);
  }
}
@keyframes move1 {
  0% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(140px);
  }
}
@-moz-keyframes movetwo {
  0% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@-webkit-keyframes movetwo {
  0% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@-o-keyframes movetwo {
  0% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@keyframes movetwo {
  0% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(-140px);
  }
}
.anzhiyu-link-page #article-container p.p.subtitle {
  font-weight: bold;
  color: #44b299;
  font-size: 1.25rem !important;
  padding-top: 1.5rem;
}
.anzhiyu-link-page #article-container p.p.subtitle:first-child {
  padding-top: 1rem;
}
.anzhiyu-link-page #article-container span.p.left,
.anzhiyu-link-page #article-container p.p.left {
  display: block;
  text-align: left;
}
.anzhiyu-link-page #article-container span.p.center,
.anzhiyu-link-page #article-container p.p.center {
  display: block;
  text-align: center;
}
.anzhiyu-link-page #article-container span.p.right,
.anzhiyu-link-page #article-container p.p.right {
  display: block;
  text-align: right;
}
.anzhiyu-link-page #article-container span.p.small,
.anzhiyu-link-page #article-container p.p.small {
  font-size: var(--global-font-size);
}
.anzhiyu-link-page #article-container span.p.large,
.anzhiyu-link-page #article-container p.p.large {
  font-size: 2.5rem;
  line-height: 1.4;
}
.anzhiyu-link-page #article-container span.p.huge,
.anzhiyu-link-page #article-container p.p.huge {
  font-size: 4rem;
  line-height: 1.4;
}
.anzhiyu-link-page #article-container span.p.ultra,
.anzhiyu-link-page #article-container p.p.ultra {
  font-size: 6rem;
  line-height: 1.4;
}
.anzhiyu-link-page #article-container span.p.small,
.anzhiyu-link-page #article-container p.p.small,
.anzhiyu-link-page #article-container span.p.large,
.anzhiyu-link-page #article-container p.p.large,
.anzhiyu-link-page #article-container span.p.huge,
.anzhiyu-link-page #article-container p.p.huge,
.anzhiyu-link-page #article-container span.p.ultra,
.anzhiyu-link-page #article-container p.p.ultra {
  margin: 0;
  padding: 0;
}
.anzhiyu-link-page #article-container span.p.bold,
.anzhiyu-link-page #article-container p.p.bold {
  font-weight: bold;
}
.anzhiyu-link-page #article-container span.p.h1,
.anzhiyu-link-page #article-container p.p.h1,
.anzhiyu-link-page #article-container span.p.h2,
.anzhiyu-link-page #article-container p.p.h2 {
  padding-bottom: 0.2rem;
  font-weight: 500;
}
.anzhiyu-link-page #article-container span.p.h1,
.anzhiyu-link-page #article-container p.p.h1 {
  font-size: 1.625rem;
  color: var(--color-h1);
  padding-top: 2em;
}
.anzhiyu-link-page #article-container span.p.h2,
.anzhiyu-link-page #article-container p.p.h2 {
  font-size: 1.625rem;
  color: var(--color-h2);
  padding-top: 2em;
  border-bottom: 1px solid rgba(68,68,68,0.1);
}
.anzhiyu-link-page #article-container span.p.h3,
.anzhiyu-link-page #article-container p.p.h3 {
  font-size: 1.375rem;
  color: var(--color-h3);
  padding-top: 2em;
}
.anzhiyu-link-page #article-container span.p.h4,
.anzhiyu-link-page #article-container p.p.h4 {
  font-size: 1.125rem;
  color: var(--color-h4);
  padding-top: 2em;
}
.anzhiyu-link-page #article-container span.p.h5,
.anzhiyu-link-page #article-container p.p.h5 {
  font-size: 1rem;
  color: var(--color-h5);
  padding-top: 1.5em;
}
.anzhiyu-link-page #article-container span.p.red,
.anzhiyu-link-page #article-container p.p.red {
  color: #e8453c;
}
.anzhiyu-link-page #article-container span.p.yellow,
.anzhiyu-link-page #article-container p.p.yellow {
  color: #fcec60;
}
.anzhiyu-link-page #article-container span.p.green,
.anzhiyu-link-page #article-container p.p.green {
  color: #3dc550;
}
.anzhiyu-link-page #article-container span.p.cyan,
.anzhiyu-link-page #article-container p.p.cyan {
  color: #1bcdfc;
}
.anzhiyu-link-page #article-container span.p.blue,
.anzhiyu-link-page #article-container p.p.blue {
  color: #2196f3;
}
.anzhiyu-link-page #article-container span.p.purple,
.anzhiyu-link-page #article-container p.p.purple {
  color: #9c27b0;
}
.anzhiyu-link-page #article-container span.p.gray,
.anzhiyu-link-page #article-container p.p.gray {
  color: #999;
}

/* Compatibility styles kept from the built AnZhiYu bundle for VuePress page content. */
.anzhiyu-link-page #flink-banners .banner-button {
  padding: 8px 12px;
  background: var(--anzhiyu-fontcolor);
  border: 0;
  border-radius: 12px;
  color: var(--anzhiyu-card-bg);
  display: flex;
  align-items: center;
  z-index: 1;
  transition: 0.3s;
  cursor: pointer;
  box-shadow: var(--anzhiyu-shadow-black);
  font: inherit;
  white-space: nowrap;
}
.anzhiyu-link-page #flink-banners .banner-button.secondary {
  background: var(--anzhiyu-secondbg);
  border: var(--style-border-always);
  color: var(--anzhiyu-lighttext);
  margin-right: 1rem;
  box-shadow: var(--anzhiyu-shadow-border);
}
.banners-title-big {
  font-size: 36px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 8px;
}
.banners-title-small {
  font-size: 12px;
  line-height: 1;
  color: var(--anzhiyu-secondtext);
  margin-top: 8px;
  margin-bottom: 0.5rem;
}
.anzhiyu-link-page #article-container {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.anzhiyu-link-page #article-container a {
  color: var(--anzhiyu-fontcolor);
}
.anzhiyu-link-page #article-container a:hover {
  text-decoration: underline;
}
.anzhiyu-link-page #article-container p {
  margin: 0 0 16px;
}
.anzhiyu-link-page #article-container ol,
.anzhiyu-link-page #article-container ul {
  margin-top: 0.4rem;
  padding: 0 0 0 0.8rem;
  list-style: none;
  counter-reset: li 0;
}
.anzhiyu-link-page #article-container ol li,
.anzhiyu-link-page #article-container ul li {
  margin: 4px 0;
}
.anzhiyu-link-page #article-container ol li:not(.tab),
.anzhiyu-link-page #article-container ul li:not(.tab) {
  position: relative;
  margin: 0.2rem 0;
}
.anzhiyu-link-page #article-container ul > li:not(.tab) {
  padding: 0.2em 0.2em 0.2em 1.4em;
}
.anzhiyu-link-page #article-container ul > li:not(.tab)::before {
  position: absolute;
  top: 0.78em;
  left: 0;
  width: 0.42em;
  height: 0.42em;
  border: 0.21em solid var(--anzhiyu-lighttext);
  border-radius: 0.42em;
  background: var(--anzhiyu-lighttext);
  content: "";
  line-height: 0.42em;
}
.anzhiyu-link-page #article-container ol > li:not(.tab) {
  padding: 0.2em 0.2em 0.2em 1.8em;
}
.anzhiyu-link-page #article-container ol > li::before {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0.65em;
  width: 1.45em;
  height: 1.45em;
  border-radius: 0.725em;
  background: var(--anzhiyu-main);
  color: #fff;
  content: counter(li);
  counter-increment: li 1;
  text-align: center;
  font-size: 0.85em;
  line-height: 1.45em;
  transition: all 0.3s ease-out;
}
.anzhiyu-link-page #article-container ol[start] {
  counter-reset: unset;
}
.anzhiyu-link-page #article-container pre,
.anzhiyu-link-page #article-container figure.highlight {
  overflow: auto;
  margin: 0 0 20px;
  padding: 0;
  background: var(--hl-bg);
  color: var(--hl-color);
  line-height: 1.6;
}
.anzhiyu-link-page #article-container pre,
.anzhiyu-link-page #article-container code {
  font-size: var(--global-font-size);
  font-family: consolas, Menlo, "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", sans-serif !important;
}
.anzhiyu-link-page #article-container code {
  padding: 2px 4px;
  background: var(--anzhiyu-code-stress);
  color: #fff;
}
.anzhiyu-link-page #article-container pre {
  padding: 10px 20px;
}
.anzhiyu-link-page #article-container pre code {
  padding: 0;
  background: none;
  color: var(--hl-color);
  text-shadow: none;
}
.anzhiyu-link-page #article-container > :last-child {
  margin-bottom: 0 !important;
}

/* Extracted from index.css: markdown content styles used by the link page. */
.anzhiyu-link-page #article-container.post-content li::marker {
  content: none;
}
.anzhiyu-link-page #article-container ol li::before,
.anzhiyu-link-page #article-container ul li::before {
  position: absolute;
  top: 0px;
  left: 0px;
  background: var(--anzhiyu-main);
  color: rgb(255, 255, 255);
  transition: all 0.3s ease-out 0s;
}
.anzhiyu-link-page #article-container figure.highlight {
  border-radius: 10px;
}

/* Copied from the matched online styles for the link info panel. */
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page .link-info-panel {
  clear: both;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--anzhiyu-card-border, var(--border-color));
  border-radius: 12px;
  background: var(--anzhiyu-card-bg, rgba(255, 255, 255, .86));
  box-shadow: var(--anzhiyu-shadow-border, 0 2px 8px rgba(0, 0, 0, .08));
}
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #article-container {
  width: 100%;
  color: var(--anzhiyu-fontcolor, var(--font-color));
}
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page .link-info-panel pre {
  overflow-x: auto;
  padding: 1rem;
  border-radius: 10px;
  background: #282c34;
  color: #abb2bf;
}
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page .link-info-panel pre code {
  padding: 0;
  border-radius: 0;
  margin: 0;
  box-shadow: none;
  line-height: inherit;
}
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.35rem;
  min-width: auto;
  padding: 8px 12px !important;
  border: 1px solid transparent !important;
  border-radius: 12px !important;
  background: #1d1f24 !important;
  color: #fff !important;
  font: inherit !important;
  font-size: 16px !important;
  line-height: 2 !important;
  box-shadow: 0 8px 16px -4px rgba(29, 31, 36, 0.18) !important;
  text-decoration: none !important;
}
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button.secondary {
  border-color: var(--anzhiyu-card-border, #e3e8f7) !important;
  background: rgba(255, 255, 255, 0.82) !important;
  color: var(--anzhiyu-fontcolor, #363636) !important;
  box-shadow: var(--anzhiyu-shadow-border, 0 8px 16px -4px rgba(44, 45, 48, 0.047)) !important;
}
[data-theme=dark] body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button {
  border-color: transparent !important;
  background: var(--link-banner-button-bg) !important;
  color: var(--link-banner-button-color) !important;
  box-shadow: none !important;
}
[data-theme=dark] body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button.secondary {
  border-color: var(--link-banner-button-border) !important;
  background: var(--link-banner-secondary-bg) !important;
  color: var(--link-banner-secondary-color) !important;
  box-shadow: none !important;
}
body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button:hover {
  background: var(--anzhiyu-theme) !important;
  color: var(--anzhiyu-white) !important;
  text-decoration: none !important;
}
[data-theme=dark] body[data-type=link] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button:hover {
  background: var(--anzhiyu-theme) !important;
  color: var(--anzhiyu-black, #1d1f24) !important;
}
</style>
