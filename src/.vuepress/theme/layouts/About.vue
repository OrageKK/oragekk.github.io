<template>
  <SkipLink />
  <CommonWrapper>
    <template #default>
      <main class="vp-page anzhiyu-about-page" id="main-content" data-type="anzhiyu">
        <DropTransition appear :delay="0.16">
          <div id="page">
            <div id="about-page">
              <div class="author-box">
                <div class="author-tag-left">
                  <span v-for="item in config.avatarSkills.left" :key="item" class="author-tag">{{ item }}</span>
                </div>
                <div class="author-img">
                  <img class="no-lightbox" :src="config.avatarImg" alt="avatar" />
                </div>
                <div class="author-tag-right">
                  <span v-for="item in config.avatarSkills.right" :key="item" class="author-tag">{{ item }}</span>
                </div>
              </div>

              <p class="p center logo large">关于我</p>
              <p class="p center small">{{ config.subtitle }}</p>

              <div class="author-content">
                <div class="author-content-item myInfoAndSayHello">
                  <div class="title1">你好，很高兴认识你</div>
                  <div class="title2">我是 <span class="inline-word">{{ config.name }}</span></div>
                  <div class="title1">{{ config.description }}</div>
                </div>
                <div class="aboutsiteTips author-content-item">
                  <div class="author-content-item-tips">{{ config.aboutsiteTips.tips }}</div>
                  <h2>
                    <span class="tips-title1">{{ config.aboutsiteTips.title1 }}</span>
                    <span class="tips-title2">{{ config.aboutsiteTips.title2 }}</span>
                    <span class="mask">
                      <span
                        v-for="(word, index) in config.aboutsiteTips.word"
                        :key="word"
                        :class="{ 'first-tips': index === 0 }"
                        :data-up="index === config.aboutsiteTips.word.length - 2 ? true : null"
                        :data-show="index === config.aboutsiteTips.word.length - 1 ? true : null"
                      >
                        {{ word }}
                      </span>
                    </span>
                  </h2>
                </div>
              </div>

              <div class="hello-about">
                <div class="cursor"></div>
                <div class="shapes">
                  <div class="shape shape-1"></div>
                  <div class="shape shape-2"></div>
                  <div class="shape shape-3"></div>
                </div>
                <div class="content">
                  <h1>{{ config.helloAbout }}</h1>
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item skills">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.skillsTips.tips }}</div>
                    <span class="author-content-item-title">{{ config.skillsTips.title }}</span>
                    <div class="skills-style-group">
                      <div id="skills-tags-group-all">
                        <div class="tags-group-wrapper">
                          <div v-for="(pair, index) in duplicatedSkillPairs" :key="`pair-${index}`" class="tags-group-icon-pair">
                            <div
                              v-for="skill in pair"
                              :key="`${index}-${skill.name}`"
                              class="tags-group-icon"
                              :style="{ background: skill.color }"
                            >
                              <img class="no-lightbox" :title="skill.name" :src="skill.icon" size="60px" :alt="skill.name" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="skills-list">
                        <div v-for="skill in config.creativity_list" :key="`skill-${skill.name}`" class="skill-info">
                          <div class="skill-icon" :style="{ background: skill.color }">
                            <img class="no-lightbox" :title="skill.name" :src="skill.icon" :alt="skill.name" />
                          </div>
                          <div class="skill-name">
                            <span>{{ skill.name }}</span>
                          </div>
                        </div>
                        <div class="etc">...</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="author-content-item careers">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.careers.tips }}</div>
                    <span class="author-content-item-title">{{ config.careers.title }}</span>
                    <div class="careers-group">
                      <div v-for="career in config.careers.list" :key="career.desc" class="career-item">
                        <div class="circle" :style="{ background: career.color || '#357ef5' }"></div>
                        <div class="name">{{ career.desc }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item-group column mapAndInfo">
                  <div class="author-content-item map single" :style="{ backgroundImage: `url(${config.map.background})` }">
                    <span class="map-title">{{ config.map.title }}<b>{{ config.map.StrengthenTitle }}</b></span>
                  </div>
                  <div class="author-content-item selfInfo single">
                    <div>
                      <span class="selfInfo-title">{{ config.selfInfo.selfInfoTips1 }}</span>
                      <span id="selfInfo-content-year" class="selfInfo-content" style="color: #43a6c6">{{ config.selfInfo.selfInfoContentYear }}</span>
                    </div>
                    <div>
                      <span class="selfInfo-title">{{ config.selfInfo.selfInfoTips2 }}</span>
                      <span class="selfInfo-content" style="color: #c69043">{{ config.selfInfo.selfInfoContent2 }}</span>
                    </div>
                    <div>
                      <span class="selfInfo-title">{{ config.selfInfo.selfInfoTips3 }}</span>
                      <span class="selfInfo-content" style="color: #b04fe6">{{ config.selfInfo.selfInfoContent3 }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item personalities">
                  <div class="author-content-item-tips">性格</div>
                  <span class="author-content-item-title">{{ config.personalities.author_name }}</span>
                  <div class="title2" style="color: #ac899c">{{ config.personalities.personality_type }}</div>
                  <div class="post-tips">
                    在
                    <a href="https://www.16personalities.com/" target="_blank" rel="noopener nofollow">16personalities</a>
                    了解更多关于
                    <a :href="config.personalities.name_url" target="_blank" rel="noopener external nofollow">{{ config.personalities.author_name }}</a>
                  </div>
                  <div class="image">
                    <img class="no-lightbox" :src="config.personalities.personality_img" alt="人格" />
                  </div>
                </div>
                <div class="author-content-item myphoto">
                  <img class="author-content-img no-lightbox" alt="自拍" :src="config.personalities.photo_url" />
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item maxim">
                  <div class="author-content-item-tips">{{ config.maxim.maxim_tips }}</div>
                  <span class="maxim-title">
                    <span style="opacity: 0.6; margin-bottom: 8px">{{ config.maxim.maxim_top }}</span>
                    <span>{{ config.maxim.maxim_bottom }}</span>
                  </span>
                </div>
                <div class="author-content-item buff">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.buff.buff_tips }}</div>
                    <span class="buff-title">
                      <span style="opacity: 0.6; margin-bottom: 8px">{{ config.buff.buff_top }}</span>
                      <span>{{ config.buff.buff_bottom }}</span>
                    </span>
                  </div>
                  <div class="card-background-icon">
                    <i class="anzhiyufont anzhiyu-icon-dice-d20"></i>
                  </div>
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item game-yuanshen" :style="{ background: `url(${config.game.game_bg}) top / cover no-repeat` }">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.game.game_tips }}</div>
                    <span class="author-content-item-title">{{ config.game.game_title }}</span>
                    <div class="content-bottom">
                      <div class="icon-group">
                        <div class="loading-bar" role="presentation" aria-hidden="true" style="display: none"></div>
                      </div>
                      <div class="tips game-yuanshen-uid">{{ config.game.game_uid }}</div>
                    </div>
                  </div>
                </div>
                <div class="author-content-item comic-content">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.comic.comic_tips }}</div>
                    <div class="author-content-item-title">{{ config.comic.comic_title }}</div>
                    <div class="comic-box">
                      <a v-for="comic in config.comic.comic_list" :key="comic.name" class="comic-item" :href="comic.href" target="_blank" :title="comic.name">
                        <div class="comic-item-cover">
                          <img :src="comic.cover" :alt="comic.name" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item like-technology" :style="{ background: `url(${config.like.like_bg}) top / cover no-repeat` }">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.like.like_tips }}</div>
                    <span class="author-content-item-title">{{ config.like.like_title }}</span>
                    <div class="content-bottom">
                      <div class="tips">{{ config.like.like_bottom }}</div>
                    </div>
                  </div>
                </div>
                <div class="author-content-item like-music" :style="{ background: `url(${config.music.music_bg}) top / cover no-repeat` }">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.music.music_tips }}</div>
                    <span class="author-content-item-title">{{ config.music.music_title }}</span>
                    <div class="content-bottom">
                      <div class="tips">跟 {{ config.name }} 一起欣赏更多音乐</div>
                    </div>
                    <div class="banner-button-group">
                      <a class="banner-button" :href="config.music.music_link">
                        <i class="anzhiyufont anzhiyu-icon-arrow-circle-right"></i>
                        <span class="banner-button-text">更多推荐</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="sortedRewards.length" class="author-content">
                <div id="about-reward" class="author-content-item single reward">
                  <div class="author-content-item-tips">致谢</div>
                  <span class="author-content-item-title">赞赏名单</span>
                  <div class="author-content-item-description">
                    感谢因为有你们，让我更加有创作的动力。
                    <div class="reward-list-all">
                      <div v-for="reward in amountSortedRewards" :key="`${reward.name}-${reward.datatime}`" class="reward-list-item">
                        <div class="reward-list-item-name">{{ reward.name }}</div>
                        <div class="reward-list-bottom-group">
                          <div class="reward-list-item-money" :style="reward.amount >= 50 ? 'background:var(--anzhiyu-yellow)' : ''">
                            {{ formatAmount(reward) }}
                          </div>
                          <div class="datatime reward-list-item-time" :datatime="reward.datatime">{{ reward.datatime }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="reward-list-updateDate">
                      最新更新时间：<time class="datatime reward-list-updateDate-time" :datatime="latestRewardDate">{{ latestRewardDate }}</time>
                    </div>
                  </div>
                  <div class="about-reward">
                    <div id="con"></div>
                    <div id="TA-con">
                      <div id="text-con">
                        <div id="linght"></div>
                        <div id="TA">为TA充电</div>
                      </div>
                    </div>
                    <div id="tube-con">
                      <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 77H234.226L307.006 24H790" stroke="#e5e9ef" stroke-width="20"></path>
                        <path d="M0 140H233.035L329.72 71H1028" stroke="#e5e9ef" stroke-width="20"></path>
                        <path d="M1 255H234.226L307.006 307H790" stroke="#e5e9ef" stroke-width="20"></path>
                        <path d="M0 305H233.035L329.72 375H1028" stroke="#e5e9ef" stroke-width="20"></path>
                        <rect y="186" width="236" height="24" fill="#e5e9ef"></rect>
                        <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#e5e9ef"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                        <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#e5e9ef"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                      </svg>
                      <div id="mask">
                        <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 77H234.226L307.006 24H790" stroke="#f25d8e" stroke-width="20"></path>
                          <path d="M0 140H233.035L329.72 71H1028" stroke="#f25d8e" stroke-width="20"></path>
                          <path d="M1 255H234.226L307.006 307H790" stroke="#f25d8e" stroke-width="20"></path>
                          <path d="M0 305H233.035L329.72 375H1028" stroke="#f25d8e" stroke-width="20"></path>
                          <rect y="186" width="236" height="24" fill="#f25d8e"></rect>
                          <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#f25d8e"></ellipse>
                          <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                          <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#f25d8e"></ellipse>
                          <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                        </svg>
                      </div>
                      <div id="orange-mask">
                        <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 77H234.226L307.006 24H790" stroke="#ffd52b" stroke-width="20"></path>
                          <path d="M0 140H233.035L329.72 71H1028" stroke="#ffd52b" stroke-width="20"></path>
                          <path d="M1 255H234.226L307.006 307H790" stroke="#ffd52b" stroke-width="20"></path>
                          <path d="M0 305H233.035L329.72 375H1028" stroke="#ffd52b" stroke-width="20"></path>
                          <rect y="186" width="236" height="24" fill="#ffd52b"></rect>
                          <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#ffd52b"></ellipse>
                          <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                          <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#ffd52b"></ellipse>
                          <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                        </svg>
                      </div>
                      <p id="people">共 <b>{{ config.reward_list.length }}</b> 人</p>
                    </div>
                  </div>
                </div>
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
import { computed, nextTick, onMounted, onUnmounted, resolveComponent } from "vue";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import SkipLink from "@theme-hope/components/SkipLink";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { aboutPage, type AboutRewardItem } from "../../data/about";

const config = aboutPage;
let pursuitInterval: ReturnType<typeof setInterval> | null = null;
let cleanupMouseMove: (() => void) | null = null;
let cleanupStyles: (() => void) | null = null;

const sortedRewards = computed(() =>
  [...config.reward_list].sort((a, b) => Date.parse(b.datatime) - Date.parse(a.datatime))
);

const amountSortedRewards = computed(() =>
  [...config.reward_list].sort((a, b) => b.amount - a.amount)
);

const latestRewardDate = computed(() => sortedRewards.value[0]?.datatime ?? "");

const skillPairs = computed(() => {
  const evenItems = config.creativity_list.filter((_, index) => index % 2 === 0);
  const oddItems = config.creativity_list.filter((_, index) => index % 2 === 1);
  const pairCount = Math.min(evenItems.length, oddItems.length);

  return Array.from({ length: pairCount }, (_, index) => [
    evenItems[index],
    oddItems[index],
  ]);
});

const duplicatedSkillPairs = computed(() => [
  ...skillPairs.value,
  ...skillPairs.value,
]);

const formatAmount = (reward: AboutRewardItem): string => {
  return `¥${reward.amount}${reward.suffix ?? ""}`;
};

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

const setupWordRotation = (): void => {
  pursuitInterval = setInterval(() => {
    const show = document.querySelector("#about-page span[data-show]");
    const next = show?.nextElementSibling || document.querySelector("#about-page .first-tips");
    const up = document.querySelector("#about-page span[data-up]");

    if (!show || !next) return;

    up?.removeAttribute("data-up");
    show.removeAttribute("data-show");
    show.setAttribute("data-up", "");
    next.setAttribute("data-show", "");
  }, 2000);
};

const setupHelloMotion = (): void => {
  const helloAboutEl = document.querySelector(".hello-about") as HTMLElement | null;
  const cursor = document.querySelector(".hello-about .cursor") as HTMLElement | null;
  const shapes = Array.from(document.querySelectorAll(".hello-about .shape")) as HTMLElement[];

  if (!helloAboutEl || !cursor || shapes.length === 0) return;

  const move = (evt: MouseEvent) => {
    const rect = helloAboutEl.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    shapes.forEach((shape, index) => {
      const delay = index * 22;
      window.setTimeout(() => {
        shape.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }, delay);
    });
  };

  helloAboutEl.addEventListener("mousemove", move);
  cleanupMouseMove = () => helloAboutEl.removeEventListener("mousemove", move);
};

const animateYear = (): void => {
  const el = document.getElementById("selfInfo-content-year");
  if (!el) return;

  const target = config.selfInfo.selfInfoContentYear;
  const duration = 2200;
  const startTime = performance.now();

  const step = (time: number) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(target * easedProgress));

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

onMounted(() => {
  cleanupStyles = mountAnzhiyuStyles();
  document.body.setAttribute("data-type", "about");

  void nextTick(() => {
    setupWordRotation();
    setupHelloMotion();
    animateYear();
  });
});

onUnmounted(() => {
  if (pursuitInterval) clearInterval(pursuitInterval);
  cleanupMouseMove?.();
  cleanupStyles?.();
  document.body.removeAttribute("data-type");
});

const { isDarkmode } = useDarkmode();
const commentService = computed(() =>
  hasGlobalComponent("CommentService") ? "CommentService" : null
);

const hasGlobalComponent = (componentName: string): boolean => {
  return !!resolveComponent(componentName);
};
</script>

<style lang="scss">
body[data-type="about"] {
  background: transparent !important;
}

body[data-type="about"] #web_bg {
  background: transparent !important;
}
</style>

<style lang="scss" scoped>
.anzhiyu-about-page {
  max-width: none;
  margin: 0 !important;
  padding: calc(var(--navbar-height) + 1rem) 1rem 3rem;
  background: rgba(255, 255, 255, 0.82) !important;
  box-shadow: none !important;
  backdrop-filter: saturate(150%) blur(0.35rem);
}

:global([data-theme="dark"]) .anzhiyu-about-page {
  background: rgba(29, 32, 37, 0.88) !important;
}

.anzhiyu-about-page :deep(#page) {
  width: min(1200px, calc(100vw - 2rem)) !important;
  max-width: min(1200px, calc(100vw - 2rem)) !important;
  margin-right: auto !important;
  margin-left: auto !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.anzhiyu-about-page :deep(#about-page) {
  width: 100% !important;
  padding-top: 1rem !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page) {
  --anzhiyu-card-bg: rgba(31, 34, 40, 0.86);
  --anzhiyu-card-border: rgba(255, 255, 255, 0.12);
  --anzhiyu-fontcolor: #e6e9ef;
  --anzhiyu-secondtext: #aeb7c4;
  --anzhiyu-white: #f2f4f8;
  --anzhiyu-black: #f2f4f8;
  --font-color: #e6e9ef;
  color: var(--anzhiyu-fontcolor) !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .author-content-item),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .author-tag),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .skill-info),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .reward-list-item) {
  background-color: var(--anzhiyu-card-bg) !important;
  border-color: var(--anzhiyu-card-border) !important;
  color: var(--anzhiyu-fontcolor) !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .p),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .author-content-item-title),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .author-content-item-tips),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .career-item .name),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .selfInfo-title),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .skill-name),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .post-tips),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .reward-list-updateDate) {
  color: var(--anzhiyu-fontcolor) !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .author-content-item-tips),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .p.small),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .post-tips) {
  color: var(--anzhiyu-secondtext) !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .hello-about .content) {
  background: rgba(31, 34, 40, 0.76) !important;
  color: var(--anzhiyu-fontcolor) !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .hello-about h1) {
  color: var(--anzhiyu-fontcolor) !important;
}

:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .map.single::before),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .game-yuanshen::before),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .like-technology::before),
:global([data-theme="dark"]) .anzhiyu-about-page :deep(#about-page .like-music::before) {
  background: rgba(0, 0, 0, 0.22) !important;
}

.anzhiyu-about-page :deep(#about-page .author-content-item.aboutsiteTips) {
  align-items: flex-start !important;
}

.anzhiyu-about-page :deep(#about-page .aboutsiteTips h2) {
  display: grid !important;
  grid-template-columns: auto minmax(6em, 1fr) !important;
  grid-template-areas:
    "title1 mask"
    "title2 mask" !important;
  column-gap: 0.55em !important;
  align-items: center !important;
  width: 100% !important;
  margin-right: 0 !important;
}

.anzhiyu-about-page :deep(#about-page .aboutsiteTips .tips-title1) {
  grid-area: title1 !important;
}

.anzhiyu-about-page :deep(#about-page .aboutsiteTips .tips-title2) {
  grid-area: title2 !important;
  white-space: nowrap !important;
}

.anzhiyu-about-page :deep(#about-page .aboutsiteTips .mask) {
  grid-area: mask !important;
  min-width: 4em !important;
  height: 1.06em !important;
  margin-top: 0 !important;
}

.anzhiyu-about-page :deep(#about-page .aboutsiteTips .mask span) {
  top: 1.06em !important;
}

.anzhiyu-about-page :deep(.theme-hope-content) {
  max-width: none;
}

@media (max-width: 768px) {
  .anzhiyu-about-page {
    padding-inline: 0.75rem;
  }

  .anzhiyu-about-page :deep(#page) {
    width: 100% !important;
    max-width: 100% !important;
  }

  .anzhiyu-about-page :deep(#about-page .aboutsiteTips h2) {
    grid-template-columns: 1fr !important;
    grid-template-areas:
      "title1"
      "title2"
      "mask" !important;
  }
}
</style>

<style lang="scss">
body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page {
  max-width: none !important;
  margin: 0 !important;
  padding: calc(var(--navbar-height) + 1rem) 1rem 3rem !important;
  background: rgba(255, 255, 255, 0.82) !important;
  box-shadow: none !important;
  backdrop-filter: saturate(150%) blur(0.35rem) !important;
}

[data-theme="dark"] body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page {
  background: rgba(29, 32, 37, 0.9) !important;
}

body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page > #page,
body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #page {
  width: min(1200px, calc(100vw - 2rem)) !important;
  max-width: min(1200px, calc(100vw - 2rem)) !important;
  margin-right: auto !important;
  margin-left: auto !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

[data-theme="dark"] body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #about-page {
  --anzhiyu-card-bg: rgba(31, 34, 40, 0.9);
  --anzhiyu-card-border: rgba(255, 255, 255, 0.12);
  --anzhiyu-fontcolor: #e6e9ef;
  --anzhiyu-secondtext: #aeb7c4;
  --anzhiyu-white: #f2f4f8;
  --anzhiyu-black: #f2f4f8;
  --font-color: #e6e9ef;
  color: var(--anzhiyu-fontcolor) !important;
}

[data-theme="dark"] body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #about-page .author-content-item,
[data-theme="dark"] body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #about-page .author-tag,
[data-theme="dark"] body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #about-page .skill-info,
[data-theme="dark"] body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #about-page .reward-list-item {
  background-color: var(--anzhiyu-card-bg) !important;
  border-color: var(--anzhiyu-card-border) !important;
  color: var(--anzhiyu-fontcolor) !important;
}

@media (max-width: 768px) {
  body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page {
    padding-inline: 0.75rem !important;
  }

  body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page #page {
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
