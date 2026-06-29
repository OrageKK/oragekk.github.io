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
                    <a class="banner-button secondary no-text-decoration" href="/link/" title="随机访问">
                      <i class="iconfont icon-hk-random"></i>
                      <span class="banner-button-text">随机访问</span>
                    </a>
                    <button class="banner-button no-text-decoration" type="button" title="申请友链" @click="handleApplyFriend">
                      <i class="iconfont icon-hk-yuanxian"></i>
                      <span class="banner-button-text">申请友链</span>
                    </button>
                  </div>
                </div>

                <div id="skills-tags-group-all">
                  <div class="tags-group-wrapper">
                    <div class="tags-scroll-row tags-scroll-row-top">
                      <a
                        v-for="(item, index) in bannerAvatarRows.top"
                        :key="`top-${index}-${item.link}`"
                        class="tags-group-icon no-text-decoration"
                        :href="item.link"
                        :title="item.name"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img class="no-lightbox" :title="item.name" :src="item.avatar" :alt="item.name" @error="handleImageError" />
                      </a>
                    </div>
                    <div class="tags-scroll-row tags-scroll-row-bottom">
                      <a
                        v-for="(item, index) in bannerAvatarRows.bottom"
                        :key="`bottom-${index}-${item.link}`"
                        class="tags-group-icon no-text-decoration"
                        :href="item.link"
                        :title="item.name"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img class="no-lightbox" :title="item.name" :src="item.avatar" :alt="item.name" @error="handleImageError" />
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
                    <div v-for="item in group.link_list" :key="item.link" class="flink-list-item">
                      <span v-if="item.tag || item.recommend" :class="siteCardTagClass(item)" :style="siteCardTagStyle(item)">
                        {{ item.tag || "推荐" }}
                        <i v-if="item.color === 'vip'" class="light"></i>
                      </span>
                      <a
                        class="cf-friends-link"
                        :href="item.link"
                        :cf-href="item.link"
                        :title="item.name"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      :key="item.link"
                      class="flink-list-card cf-friends-link"
                      :href="item.link"
                      :cf-href="item.link"
                      :data-title="item.descr"
                      :title="item.name"
                      target="_blank"
                      rel="noopener noreferrer"
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
import { computed, onMounted, onUnmounted, resolveComponent } from "vue";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import SkipLink from "@theme-hope/components/SkipLink";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { linkGroups, linkPage, siteInfo, type LinkItem } from "../../data/link";

const page = linkPage;
const site = siteInfo;
const groups = linkGroups;
let cleanupStyles: (() => void) | null = null;

const mountAnzhiyuStyles = (): (() => void) => {
  const links = [
    { id: "anzhiyu-var-css", href: "/anzhiyu/css/var.css" },
    { id: "anzhiyu-index-css", href: "/anzhiyu/css/index.css" },
  ].map(({ id, href }) => {
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }

    return link;
  });

  return () => {
    links.forEach((link) => link.parentNode?.removeChild(link));
  };
};

const bannerAvatarRows = computed(() => {
  const friends = groups.flatMap((group) => group.link_list).slice(0, 24);
  const midpoint = Math.ceil(friends.length / 2);
  const top = friends.slice(0, midpoint);
  const bottom = friends.slice(midpoint);

  return {
    top: [...top, ...top],
    bottom: [...bottom, ...bottom],
  };
});

const getSiteshot = (item: LinkItem): string =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(item.link)}?w=323&h=200`;

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
  cleanupStyles = mountAnzhiyuStyles();
  document.body.setAttribute("data-type", "link");
});

onUnmounted(() => {
  cleanupStyles?.();
  document.body.removeAttribute("data-type");
});

const { isDarkmode } = useDarkmode();
const commentService = computed(() =>
  hasGlobalComponent("CommentService") ? "CommentService" : null
);

const hasGlobalComponent = (componentName: string): boolean => !!resolveComponent(componentName);
</script>

<style lang="scss">
body[data-type="link"] {
  background: transparent !important;
}

body[data-type="link"] #web_bg {
  background: transparent !important;
}

@keyframes link-avatar-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page {
  max-width: none !important;
  margin: 0 !important;
  padding: calc(var(--navbar-height) + 1rem) 1rem 3rem !important;
  background: rgba(255, 255, 255, 0.82) !important;
  box-shadow: none !important;
  backdrop-filter: saturate(150%) blur(0.35rem) !important;
}

[data-theme="dark"] body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page {
  background: rgba(29, 32, 37, 0.9) !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #page {
  width: min(1200px, calc(100vw - 2rem)) !important;
  max-width: min(1200px, calc(100vw - 2rem)) !important;
  margin-right: auto !important;
  margin-left: auto !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #article-container {
  width: 100%;
  color: var(--anzhiyu-fontcolor, var(--font-color));
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners {
  position: relative !important;
  height: 390px !important;
  min-height: 0 !important;
  padding: 0.8rem 1.6rem !important;
  border: 1px solid var(--link-banner-border, rgba(230, 233, 239, 0.9)) !important;
  border-radius: 12px !important;
  background: var(--link-banner-bg, rgba(255, 255, 255, 0.96)) !important;
  box-shadow: var(--link-banner-shadow, 0 10px 32px rgba(31, 35, 45, 0.08)) !important;
  overflow: hidden !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banners-title-small {
  color: var(--link-banner-small-color, #777d88) !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banners-title-big {
  background: var(--link-banner-title, linear-gradient(90deg, #2c3138 0%, #2c3138 100%)) !important;
  background-clip: text !important;
  color: transparent !important;
  font-size: 2.25rem !important;
  -webkit-background-clip: text !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button {
  border-color: var(--link-banner-button-border, rgba(51, 56, 66, 0.14)) !important;
  background: var(--link-banner-button-bg, #1d1f24) !important;
  color: var(--link-banner-button-color, #fff) !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button.secondary {
  background: var(--link-banner-secondary-bg, rgba(255, 255, 255, 0.74)) !important;
  color: var(--link-banner-secondary-color, #2c3138) !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all {
  position: absolute !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  display: block !important;
  height: 240px !important;
  min-width: 0 !important;
  overflow: hidden !important;
  transform: none !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-group-wrapper {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.25rem !important;
  width: max-content !important;
  margin-top: 0 !important;
  animation: none !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-scroll-row {
  display: flex !important;
  width: max-content !important;
  gap: 2.6rem !important;
  padding-left: 2.5rem !important;
  animation: link-avatar-scroll 42s linear infinite !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-scroll-row-bottom {
  margin-left: -5.5rem !important;
  animation-duration: 48s !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-group-icon {
  flex: 0 0 auto !important;
  width: 92px !important;
  height: 92px !important;
  border-radius: 50% !important;
  background: #fff !important;
}

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-group-icon img {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  border-radius: 50% !important;
  object-fit: cover !important;
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

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel {
  clear: both;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--anzhiyu-card-border, var(--border-color));
  border-radius: 12px;
  background: var(--anzhiyu-card-bg, rgba(255, 255, 255, 0.86));
  box-shadow: var(--anzhiyu-shadow-border, 0 2px 8px rgba(0, 0, 0, 0.08));
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

body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page .link-info-panel pre {
  overflow-x: auto;
  padding: 1rem;
  border-radius: 10px;
  background: #282c34;
  color: #abb2bf;
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

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners {
    position: relative !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
    width: 100% !important;
    height: 360px !important;
    min-height: 360px !important;
    box-sizing: border-box !important;
    margin-right: 0 !important;
    margin-bottom: 1rem !important;
    margin-left: 0 !important;
    padding: 1.35rem 1.25rem 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;
    border-radius: 0 !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-top-box {
    position: relative !important;
    z-index: 2 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    min-height: 158px !important;
    text-align: center !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .flink-banners-title {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100% !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banners-title-small {
    width: 100% !important;
    text-align: center !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banners-title-big {
    width: 100% !important;
    max-width: 20rem !important;
    margin-right: auto !important;
    margin-left: auto !important;
    font-size: 2rem !important;
    line-height: 1.15 !important;
    text-align: center !important;
    overflow-wrap: anywhere !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group {
    position: static !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 0.6rem !important;
    width: 100% !important;
    margin-top: 0.9rem !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners .banner-button-group .banner-button {
    height: 38px !important;
    padding: 0 0.8rem !important;
    border-radius: 10px !important;
    font-size: 0.9rem !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all {
    position: absolute !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    height: 176px !important;
    padding: 0 0 1rem !important;
    display: flex !important;
    align-items: flex-end !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-group-wrapper {
    gap: 1rem !important;
    width: max-content !important;
    margin-top: 0 !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-scroll-row {
    gap: 1.1rem !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-scroll-row-top {
    margin-left: -2.25rem !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-scroll-row-bottom {
    margin-left: -5.25rem !important;
  }

  body[data-type="link"] main#main-content.anzhiyu-link-page.vp-page #flink-banners #skills-tags-group-all .tags-group-icon {
    width: 72px !important;
    height: 72px !important;
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
</style>
