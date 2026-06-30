<template>
  <SkipLink />
  <CommonWrapper>
    <template #default>
      <main class="vp-page anzhiyu-essay-page" id="main-content">
        <DropTransition appear :delay="0.16">
          <div id="page">
            <div id="essay_page">
              <div class="author-content author-content-item essayPage single"
                :style="config.top_background ? { background: `url(${config.top_background}) left 60% / cover no-repeat` } : { backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' }">
                <div class="card-content">
                  <div class="author-content-item-tips">{{ config.title }}</div>
                  <span class="author-content-item-title">{{ config.subTitle }}</span>
                  <div class="content-bottom">
                    <div class="tips">{{ config.tips }}</div>
                    <div class="banner-button-group">
                      <a class="banner-button essay-about-btn" :href="config.buttonLink">
                        <i class="iconfont icon-hk-youshangjiantou-yuan-shi"></i>
                        <span class="banner-button-text">{{ config.buttonText }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div id="bber">
                <section class="timeline page-1">
                  <ul id="waterfall" class="list show">
                    <li v-for="item in visibleEssays" :key="`${item.date}-${item.content}`" class="bber-item">
                      <div class="bber-content">
                        <p class="datacont">{{ item.content }}</p>

                        <div v-if="item.image?.length" class="bber-container-img">
                          <a v-for="image in item.image" :key="image" class="bber-content-img" :href="image"
                            target="_blank" data-fancybox="gallery" data-caption="">
                            <img :src="image" alt="" />
                          </a>
                          <div class="bber-content-noimg"></div>
                          <div class="bber-content-noimg"></div>
                          <div class="bber-content-noimg"></div>
                        </div>

                        <div v-if="item.video?.length" class="bber-container-img">
                          <template v-for="video in item.video" :key="video">
                            <div v-if="video.includes('player.bilibili.com')" class="bber-bilibili">
                              <iframe :src="video" scrolling="no" border="0" frameborder="no" framespacing="0"
                                allowfullscreen="true"></iframe>
                            </div>
                            <a v-else class="bber-content-video" :href="video" data-fancybox="gallery" data-caption="">
                              <video :src="video"></video>
                            </a>
                          </template>
                          <div class="bber-content-noimg"></div>
                          <div class="bber-content-noimg"></div>
                          <div class="bber-content-noimg"></div>
                        </div>

                        <div v-if="item.aplayer" class="bber-music">
                          <meting-js :id="item.aplayer.id" :server="item.aplayer.server" type="song" mutex="true"
                            preload="none" theme="var(--anzhiyu-main)" data-lrctype="0" order="list"></meting-js>
                        </div>
                      </div>
                      <hr />
                      <div class="bber-bottom">
                        <div class="bber-info">
                          <div class="bber-info-tags">
                            <span class="bber-info-tag">
                              <i class="iconfont icon-hk-clock-fill"></i>
                              <time class="datatime" :datetime="item.date">{{ formatDate(item.date) }}</time>
                            </span>
                            <a v-if="item.link" class="bber-info-tag" :href="item.link" target="_blank"
                              rel="external nofollow" title="跳转到短文指引的链接">
                              <i class="iconfont icon-hk-redlink"></i>
                              <span>链接</span>
                            </a>
                            <span v-if="item.from" class="bber-info-tag">
                              <i class="iconfont icon-hk-remen"></i>
                              <span>{{ item.from }}</span>
                            </span>
                            <span v-if="item.address" class="bber-info-tag">
                              <i class="iconfont icon-hk-dingweiweizhi"></i>
                              <span>{{ item.address }}</span>
                            </span>
                          </div>
                          <button class="bber-reply-btn" @click="handleReply(item.content)" title="引用此条短文进行评论">
                            <i class="iconfont icon-hk-pinglun2"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </section>
              </div>
              <div id="bber-tips" style="color: var(--anzhiyu-secondtext);">
                - 只展示最近{{ config.limit }}条短文 -
              </div>
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
import { essayPage } from "../../data/essay";

const config = essayPage;

const visibleEssays = computed(() => config.essay_list.slice(0, config.limit));

const formatDate = (date: string): string => new Date(date).toISOString().slice(0, 10);

onMounted(() => {
  document.body.setAttribute("data-type", "essay");
});

onUnmounted(() => {
  document.body.removeAttribute("data-type");
});

const { isDarkmode } = useDarkmode();
const commentService = computed(() =>
  hasGlobalComponent("CommentService") ? "CommentService" : null
);

const hasGlobalComponent = (componentName: string): boolean => {
  return !!resolveComponent(componentName);
};

const handleReply = (content: string) => {
  // 将内容格式化为Markdown引用格式
  const quotedContent = content
    .split('\n')
    .map(line => `> ${line}`)
    .join('\n');

  // 直接操作DOM中的textarea元素
  const textarea = document.querySelector('#wl-edit') || document.querySelector('textarea.wl-editor');

  if (textarea) {
    // 先清空评论框
    (textarea as HTMLTextAreaElement).value = '';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    // 稍微延迟后填入新内容，确保清空操作已生效
    setTimeout(() => {
      (textarea as HTMLTextAreaElement).value = quotedContent;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }, 50);
  } else {
    // 如果textarea还没渲染，直接存储到localStorage
    localStorage.setItem('WALINE_COMMENT_BOX_EDITOR', quotedContent);
  }

  // 滚动到评论区域
  setTimeout(() => {
    // 尝试多种选择器找到评论区域
    const commentSection =
      document.querySelector('.vp-comment') ||
      document.querySelector('#waline') ||
      document.querySelector('[class*="comment"]') ||
      document.querySelector('main.vp-page > div:last-child');

    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 150);
};
</script>

<style lang="scss">
@use "../styles/variables";
@use "../styles/base";
@use "../styles/animations";

body[data-type="essay"] {
  background: transparent !important;
}

body[data-type="essay"] #web_bg {
  background: transparent !important;
}
/* Essay page styles (from pages.css essay_page section) */
/* _extra/essay_page/essay_page.css */
#bber .bber-container-img {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}
#bber .bber-container-img .bber-content-noimg {
  width: calc(100% / 4 - 5px);
}

#bber .bber-content-img img {
  object-fit: cover;
  max-height: 100%;
}

#bber .bber-content-img,
#bber .bber-content-video {
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
  width: calc(100% / 4 - 5px);
  margin-bottom: 10px;
}

#bber .bber-content-video video {
  border-radius: 8px;
  object-fit: cover;
  max-height: 100%;
}
#bber .bber-content-video::after {
  content: "视频";
  display: inline-block;
  padding: 1px 6px;
  background: var(--anzhiyu-black-op);
  border-radius: 8px;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--anzhiyu-white);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateZ(0);
  position: absolute;
  left: 0;
  top: 4px;
  z-index: 2;
}

#bber .bber-content .datacont {
  order: 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--anzhiyu-fontcolor);
  width: 100%;
  line-height: 1.38;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: justify;
  word-break: break-all;
}
#bber p {
  margin: 0px;
}
#bber div.bber-content {
  display: flex;
  flex-flow: wrap;
  border-radius: 12px;
  width: 100%;
  height: 100%;
}
#bber .timeline ul li.bber-item {
  position: relative;
  margin-right: 2%;
}
#bber .timeline #waterfall.show {
  opacity: 1;
}
#bber .timeline #waterfall {
  opacity: 0;
  transition: all 0.3s ease 0s;
}
#bber ul.list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
#bber {
  margin-top: 1rem;
  width: 100%;
}
#bber > section > ul > li.bber-item {
  margin-bottom: 1rem;
}

#bber-tips {
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

#bber .timeline ul li.bber-item hr {
  position: relative;
  margin: 8px 0px;
  border: 1px dashed var(--anzhiyu-theme-op);
  width: 100%;
}

#bber .bber-info {
  display: flex;
  align-items: center;
}

#bber > section > ul > li > div .bber-info-time,
#bber > section > ul > li > div .bber-info-from {
  color: var(--anzhiyu-fontcolor);
  font-size: 0.7rem;
  background-color: var(--anzhiyu-gray-op);
  padding: 0px 8px;
  border-radius: 20px;
  cursor: default;
  display: flex;
  align-items: center;
}

#bber .bber-info .anzhiyufont.anzhiyu-icon-clock {
  margin-right: 4px;
  font-size: 0.7rem;
}
#bber > section > ul > li > div .bber-info-from span,
#bber > section > ul > li > div .bber-info-from {
  margin-left: 4px;
}
#bber > section > ul > li > div .bber-info-from i {
  font-size: 0.7rem;
}
#bber .bber-item hr::before {
  display: none;
}

#bber .bber-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.bber-reply {
  cursor: pointer !important;
}

.bber-reply:hover {
  color: var(--anzhiyu-main);
  max-height: 35px;
}

#bber .timeline ul li.bber-item:hover {
  border: var(--style-border-hover);
}

#bber .bber-content-link {
  display: flex;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  align-items: center;
  background-color: rgba(245, 108, 108, 0.13);
  color: rgb(245, 108, 108);
  padding: 0px 8px;
  border-radius: 20px;
}
#bber .bber-content-link i {
  margin-right: 3px;
  font-size: 0.7rem;
}
#bber .bber-content-link:hover {
  background-color: var(--anzhiyu-main);
  color: var(--anzhiyu-white);
}
#bber .bber-music {
  width: 100%;
  height: 90px;
  margin: 0.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: var(--style-border-always);
  background: var(--anzhiyu-secondbg);
}
#bber .aplayer {
  margin: 0;
}

#bber .aplayer.aplayer-withlrc .aplayer-pic {
  height: 82px;
  width: 82px;
  margin: 4px;
  border-radius: 4px;
}
.bber-music .aplayer.aplayer-withlrc .aplayer-info {
  padding: 5px 7px 0;
}
#bber .aplayer .aplayer-info .aplayer-music {
  height: 23px;
}
#bber .aplayer .aplayer-info .aplayer-music .aplayer-title {
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0;
  color: var(--anzhiyu-fontcolor);
}

#bber .aplayer .aplayer-info .aplayer-controller {
  align-items: center;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap {
  padding: 0;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-time {
  position: initial;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar {
  background: var(--anzhiyu-gray);
  height: 8px;
  border-radius: 12px;
  transition: 0.3s;
  overflow: hidden;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-loaded {
  height: 100%;
  border-radius: 12px;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played {
  height: 100%;
  border-radius: 12px;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb {
  display: none;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-time {
  position: initial;
}

/* 顶部样式 */
.author-content.author-content-item.essayPage {
  height: 19rem;
  color: var(--anzhiyu-white);
  overflow: hidden;
  margin-top: 0px;
}
body[data-type="essay"] #page .author-content-item .card-content .banner-button-group .banner-button:hover {
  color: var(--anzhiyu-white);
  border-radius: 20px !important;
}

/* 响应式 */
@media screen and (max-width: 1200px) {
  #bber .timeline ul li.bber-item {
    width: 49%;
    margin-right: 1%;
  }
}
@media screen and (max-width: 768px) {
  #bber .timeline ul li.bber-item {
    width: 100%;
    margin-right: 0px;
  }
}
[data-theme="dark"] #bber .bber-music .aplayer,
[data-theme="dark"] #bber .aplayer .aplayer-lrc:before,
[data-theme="dark"] #bber .aplayer .aplayer-lrc:after {
  background: var(--anzhiyu-card-bg);
  color: var(--anzhiyu-fontcolor);
}
#bber .aplayer .aplayer-lrc p {
  color: var(--anzhiyu-fontcolor);
  min-height: 40px;
  line-height: 30px !important;
  height: 40px !important;
  margin: 0 !important;
}


</style>

<style lang="scss" scoped>
.anzhiyu-essay-page :deep(#essay_page) {
  width: 100% !important;
}

:global([data-theme="dark"]) .anzhiyu-essay-page :deep(#essay_page .essayPage) {
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.28) !important;
  border-color: var(--anzhiyu-card-border) !important;
}

#bber .timeline #waterfall {
  display: block !important;
  columns: 3 !important;
  column-count: 3 !important;
  column-gap: 1rem !important;
  padding: 0 !important;
  margin: 1rem 0 0 !important;
  list-style: none !important;
}

#bber .timeline #waterfall>li.bber-item {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
  display: inline-block !important;
  width: 100% !important;
  margin-bottom: 1rem !important;
  background: var(--anzhiyu-card-bg, #fff) !important;
  border-radius: 12px !important;
  padding: 1rem !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  border: 1px solid var(--anzhiyu-card-border, #eee) !important;
  vertical-align: top !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

#bber .timeline #waterfall>li.bber-item:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12) !important;
}

:global([data-theme="dark"]) #bber .timeline #waterfall>li.bber-item:hover {
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.34) !important;
}

#bber .timeline #waterfall hr {
  display: none !important;
}

#bber .bber-content .datacont {
  white-space: pre-line !important;
}

#bber .bber-bilibili {
  position: relative;
  width: 100%;
  padding: 30% 45%;
  margin-top: 10px;
  margin-bottom: 10px;
}

#bber .bber-bilibili iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0;
  border: 0;
  border-radius: 12px;
  border: var(--style-border);
}

.essayPage .banner-button-group {
  display: flex;
  justify-content: center;
}

.essayPage .essay-about-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.essayPage .banner-button.essay-about-btn:hover {
  transform: translateY(-2px);
}

.essayPage .essay-about-btn i {
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  background: transparent;
  border-radius: 50%;
  color: #fff;
}

@media (max-width: 1024px) {
  #bber .timeline #waterfall {
    columns: 2 !important;
    column-count: 2 !important;
  }
}

@media (max-width: 768px) {
  #bber .timeline #waterfall {
    columns: 1 !important;
    column-count: 1 !important;
  }
}

// 评论按钮样式
.bber-bottom {
  align-items: center;
}

.bber-info {
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bber-info-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bber-info-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  background: #f0f0f0;
  color: #555;
  font-size: 0.68rem;
  font-weight: 500;
  line-height: 1.4;
  text-decoration: none;
  transition: all 0.2s ease;

  i {
    font-size: 0.65rem;
  }

  &:hover {
    background: #e0e0e0;
    color: var(--anzhiyu-main, #425aef);
  }
}

:global([data-theme="dark"]) a.bber-info-tag:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #8ea2ff;
}

.bber-reply-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #555;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: var(--anzhiyu-main, #425aef);
    background: rgba(66, 90, 239, 0.08);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  i {
    font-size: 16px;
  }
}

:global([data-theme="dark"]) .bber-reply-btn {
  &:hover {
    color: #8ea2ff;
    background: rgba(142, 162, 255, 0.16);
  }
}
</style>

<style lang="scss">
body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page {
  max-width: none !important;
  margin: 0 !important;
  padding: calc(var(--navbar-height) + 1rem) 1rem 3rem !important;
  background: rgba(255, 255, 255, 0.82) !important;
  box-shadow: none !important;
  backdrop-filter: saturate(150%) blur(0.35rem) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page {
  background: rgba(29, 32, 37, 0.9) !important;
}

body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page>#page,
body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #page {
  width: min(1200px, calc(100vw - 2rem)) !important;
  max-width: min(1200px, calc(100vw - 2rem)) !important;
  margin-right: auto !important;
  margin-left: auto !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .card-content {
  background: linear-gradient(90deg,
      rgba(0, 0, 0, 0.38) 0%,
      rgba(0, 0, 0, 0.18) 48%,
      rgba(0, 0, 0, 0.06) 100%) !important;
  color: #fff !important;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.34) !important;
}

body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn {
  border: 1px solid rgba(255, 255, 255, 0.38) !important;
  background: rgba(255, 255, 255, 0.18) !important;
  color: #fff !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 8px 24px rgba(0, 0, 0, 0.16) !important;
  -webkit-backdrop-filter: saturate(180%) blur(16px) !important;
  backdrop-filter: saturate(180%) blur(16px) !important;
}

body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .banner-button.essay-about-btn:hover {
  border-color: rgba(255, 255, 255, 0.58) !important;
  background: rgba(255, 255, 255, 0.28) !important;
  color: #fff !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.36),
    0 12px 30px rgba(0, 0, 0, 0.22) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #essay_page {
  --anzhiyu-card-bg: rgba(31, 34, 40, 0.9);
  --anzhiyu-card-border: rgba(255, 255, 255, 0.12);
  --anzhiyu-fontcolor: #e6e9ef;
  --anzhiyu-secondtext: #aeb7c4;
  --anzhiyu-white: #f2f4f8;
  --anzhiyu-black: #f2f4f8;
  --font-color: #e6e9ef;
  color: var(--anzhiyu-fontcolor) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .card-content {
  background: linear-gradient(90deg,
      rgba(8, 10, 14, 0.72) 0%,
      rgba(8, 10, 14, 0.46) 52%,
      rgba(8, 10, 14, 0.2) 100%) !important;
  color: #f4f6fb !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.58) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .card-content .content-bottom,
[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .card-content .tips,
[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .card-content .author-content-item-tips,
[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .card-content .author-content-item-title {
  color: inherit !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn {
  border-color: rgba(255, 255, 255, 0.2) !important;
  background: rgba(18, 22, 30, 0.46) !important;
  color: #f7f8fb !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 10px 28px rgba(0, 0, 0, 0.34) !important;
  -webkit-backdrop-filter: saturate(180%) blur(16px) !important;
  backdrop-filter: saturate(180%) blur(16px) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .banner-button.essay-about-btn:hover {
  border-color: rgba(255, 255, 255, 0.34) !important;
  background: rgba(34, 39, 52, 0.58) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 14px 34px rgba(0, 0, 0, 0.42) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #bber .timeline #waterfall>li.bber-item {
  background: var(--anzhiyu-card-bg) !important;
  border-color: var(--anzhiyu-card-border) !important;
  color: var(--anzhiyu-fontcolor) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #bber .bber-content .datacont,
[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #bber .bber-content p,
[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #bber-tips {
  color: var(--anzhiyu-fontcolor) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .bber-info-tag {
  background: rgba(255, 255, 255, 0.11) !important;
  color: var(--anzhiyu-secondtext) !important;
}

[data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .bber-reply-btn {
  color: var(--anzhiyu-secondtext) !important;
}

@media (max-width: 768px) {
  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page {
    padding-inline: 0.75rem !important;
  }

  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page #page {
    width: 100% !important;
    max-width: 100% !important;
  }

  /* essay-about-btn 移动端保持与 PC 端一致 */
  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .banner-button-group {
    right: 2rem !important;
    bottom: 1.5rem !important;
  }

  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn {
    padding: 0.5rem 1.2rem !important;
    width: auto !important;
  }

  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn .banner-button-text {
    display: inline !important;
  }

  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn i {
    background: transparent !important;
    border-radius: 50% !important;
    padding: 0 !important;
    margin-left: 0 !important;
    height: 1.2rem !important;
    width: 1.2rem !important;
    font-size: 1.3rem !important;
    color: #fff !important;
  }

  body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn:hover i {
    background: transparent !important;
    color: #fff !important;
  }

  [data-theme="dark"] body[data-type="essay"] main#main-content.anzhiyu-essay-page.vp-page .essayPage .essay-about-btn i {
    color: #f7f8fb !important;
  }
}
</style>
