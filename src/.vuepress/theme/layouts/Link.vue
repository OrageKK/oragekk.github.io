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
    { id: "anzhiyu-pages-css", href: "/anzhiyu/css/pages.css" },
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

// flink-banners 头像 hover 覆盖显示博客名
#flink-banners #skills-tags-group-all .tags-group-icon {
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
</style>
