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
                      <span v-for="(word, index) in config.aboutsiteTips.word" :key="word"
                        :class="{ 'first-tips': index === 0 }"
                        :data-up="index === config.aboutsiteTips.word.length - 2 ? true : null"
                        :data-show="index === config.aboutsiteTips.word.length - 1 ? true : null">
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
                          <div v-for="(pair, index) in duplicatedSkillPairs" :key="`pair-${index}`"
                            class="tags-group-icon-pair">
                            <div v-for="skill in pair" :key="`${index}-${skill.name}`" class="tags-group-icon"
                              :style="{ background: skill.color }">
                              <img class="no-lightbox" :title="skill.name" :src="skill.icon" size="60px"
                                :alt="skill.name" />
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
                  <div class="author-content-item map single"
                    :style="{ backgroundImage: `url(${config.map.background})` }">
                    <span class="map-title">{{ config.map.title }}<b>{{ config.map.StrengthenTitle }}</b></span>
                  </div>
                  <div class="author-content-item selfInfo single">
                    <div>
                      <span class="selfInfo-title">{{ config.selfInfo.selfInfoTips1 }}</span>
                      <span id="selfInfo-content-year" class="selfInfo-content" style="color: #43a6c6">{{
                        config.selfInfo.selfInfoContentYear }}</span>
                    </div>
                    <div>
                      <span class="selfInfo-title">{{ config.selfInfo.selfInfoTips2 }}</span>
                      <span class="selfInfo-content" style="color: #c69043">{{ config.selfInfo.selfInfoContent2
                        }}</span>
                    </div>
                    <div>
                      <span class="selfInfo-title">{{ config.selfInfo.selfInfoTips3 }}</span>
                      <span class="selfInfo-content" style="color: #b04fe6">{{ config.selfInfo.selfInfoContent3
                        }}</span>
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
                    <a href="https://www.16personalities.com/" target="_blank"
                      rel="noopener nofollow">16personalities</a>
                    了解更多关于
                    <a :href="config.personalities.name_url" target="_blank" rel="noopener external nofollow">{{
                      config.personalities.author_name }}</a>
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
                <div class="author-content-item game-yuanshen"
                  :style="{ background: `url(${config.game.game_bg}) top / cover no-repeat` }">
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
                      <a v-for="comic in config.comic.comic_list" :key="comic.name" class="comic-item"
                        :href="comic.href" target="_blank" :title="comic.name">
                        <div class="comic-item-cover">
                          <img :src="comic.cover" :alt="comic.name" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="author-content">
                <div class="author-content-item like-technology"
                  :style="{ background: `url(${config.like.like_bg}) top / cover no-repeat` }">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.like.like_tips }}</div>
                    <span class="author-content-item-title">{{ config.like.like_title }}</span>
                    <div class="content-bottom">
                      <div class="tips">{{ config.like.like_bottom }}</div>
                    </div>
                  </div>
                </div>
                <div class="author-content-item like-music"
                  :style="{ background: `url(${config.music.music_bg}) top / cover no-repeat` }">
                  <div class="card-content">
                    <div class="author-content-item-tips">{{ config.music.music_tips }}</div>
                    <span class="author-content-item-title">{{ config.music.music_title }}</span>
                    <div class="content-bottom">
                      <div class="tips">跟 {{ config.name }} 一起欣赏更多音乐</div>
                      <div class="banner-button-group">
                        <a class="banner-button" :href="config.music.music_link">
                          <i class="iconfont icon-hk-youshangjiantou-yuan-shi"></i>
                          <span class="banner-button-text">更多推荐</span>
                        </a>
                      </div>
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
                      <div v-for="reward in amountSortedRewards" :key="`${reward.name}-${reward.datatime}`"
                        class="reward-list-item">
                        <div class="reward-list-item-name">{{ reward.name }}</div>
                        <div class="reward-list-bottom-group">
                          <div class="reward-list-item-money"
                            :style="reward.amount >= 50 ? 'background:var(--anzhiyu-yellow)' : ''">
                            {{ formatAmount(reward) }}
                          </div>
                          <div class="datatime reward-list-item-time" :datatime="reward.datatime">{{ reward.datatime }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="reward-list-updateDate">
                      最新更新时间：<time class="datatime reward-list-updateDate-time" :datatime="latestRewardDate">{{
                        latestRewardDate }}</time>
                    </div>
                  </div>
                  <div class="about-reward">
                    <div id="con"></div>
                    <div id="TA-con" role="button" tabindex="0" @click="openSponsor"
                      @keydown.enter.prevent="openSponsor" @keydown.space.prevent="openSponsor">
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
                    <Sponsor ref="sponsor" class="about-sponsor" triggerless />
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
import { computed, nextTick, onMounted, onUnmounted, ref, resolveComponent } from "vue";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import SkipLink from "@theme-hope/components/SkipLink";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { aboutPage, type AboutRewardItem } from "../../data/about";
import Sponsor from "../components/Sponsor.vue";

const config = aboutPage;
let pursuitInterval: ReturnType<typeof setInterval> | null = null;
let cleanupMouseMove: (() => void) | null = null;
const sponsor = ref<{ open: () => void } | null>(null);

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

const openSponsor = (): void => {
  sponsor.value?.open();
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
@use "../styles/variables";
@use "../styles/base";
@use "../styles/animations";
@use "../styles/skills-tags";

body[data-type="about"] {
  background: transparent !important;
}

body[data-type="about"] #web_bg {
  background: transparent !important;
}
/* About page styles - about-reward section */
/* _extra/reward/about-reward.css */
.about-reward {
  position: absolute;
  top: 1rem;
  right: 2rem;
}
@media screen and (max-width: 768px) {
  .reward .about-reward #con {
    width: 170px;
  }
  .reward #tube-con {
    display: none;
  }
}



/* About page styles - main about page */
body[data-type='about'] #page {
  border: 0;
  box-shadow: none !important;
  padding: 0 !important;
  background: transparent !important;
}
body[data-type='about'] #page .page-title {
  display: none;
}
body[data-type='about'] .page #footer-wrap {
  opacity: 1;
  overflow: visible;
  height: auto !important;
  min-height: 16px;
  color: #666;
}
body[data-type='about'] #web_bg {
  background: var(--anzhiyu-background);
}
#about-page {
  padding-top: 1rem;
}
#about-page .author-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 16px 0;
}
#about-page .author-box .author-tag-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
@media screen and (max-width: 768px) {
  #about-page .author-box .author-tag-left {
    display: none;
  }
}
#about-page .author-box .author-tag-left .author-tag:first-child,
#about-page .author-box .author-tag-left .author-tag:last-child {
  margin-right: -16px;
}
#about-page .author-box .author-tag-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
@media screen and (max-width: 768px) {
  #about-page .author-box .author-tag-right {
    display: none;
  }
}
#about-page .author-box .author-tag-right .author-tag:first-child,
#about-page .author-box .author-tag-right .author-tag:last-child {
  margin-left: -16px;
}
#about-page .author-box .author-tag {
  transform: translate(0, -4px);
  padding: 1px 8px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  border-radius: 40px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: var(--anzhiyu-shadow-lightblack);
  animation: 6s ease-in-out 0s infinite normal none running floating;
}
#about-page .author-box .author-tag:nth-child(1) {
  animation-delay: 0s;
}
#about-page .author-box .author-tag:nth-child(2) {
  animation-delay: 0.6s;
}
#about-page .author-box .author-tag:nth-child(3) {
  animation-delay: 1.2s;
}
#about-page .author-box .author-tag:nth-child(4) {
  animation-delay: 1.8s;
}
#about-page .author-box .author-img {
  margin: 0 30px;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  position: relative;
  background: var(--anzhiyu-secondbg);
  user-select: none;
  transition: 0.3s;
}
@media screen and (max-width: 768px) {
  #about-page .author-box .author-img {
    width: 120px;
    height: 120px;
  }
}
#about-page .author-box .author-img img {
  border-radius: 50%;
  overflow: hidden;
  width: 180px;
  height: 180px;
}
@media screen and (max-width: 768px) {
  #about-page .author-box .author-img img {
    width: 120px;
    height: 120px;
  }
}
#about-page .author-box .author-img:hover {
  transform: scale(1.1);
}
#about-page .author-box .author-img:before {
  content: '';
  transition: 1s;
  width: 30px;
  height: 30px;
  background: var(--anzhiyu-green);
  position: absolute;
  border-radius: 50%;
  border: 5px solid var(--anzhiyu-background);
  bottom: 5px;
  right: 10px;
  z-index: 2;
}
@media screen and (max-width: 768px) {
  #about-page .author-box .author-img:before {
    bottom: -5px;
    right: -5px;
  }
}
.author-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}
#about-page .myInfoAndSayHello {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--anzhiyu-white);
  background: linear-gradient(120deg, #5b27ff 0, #00d4ff 100%);
  background-size: 200%;
  animation: gradient 15s ease infinite;
  width: 59%;
}
.author-content-item {
  width: 49%;
  border-radius: 24px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 1rem 2rem;
  overflow: hidden;
}
#about-page .myInfoAndSayHello .title1 {
  opacity: 0.8;
  line-height: 1.3;
}
#about-page .myInfoAndSayHello .title2 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0.5rem 0;
}
.inline-word {
  word-break: keep-all;
  white-space: nowrap;
}
#about-page .myInfoAndSayHello .title1 {
  opacity: 0.8;
  line-height: 1.3;
}
.author-content-item.aboutsiteTips {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 39%;
}
.aboutsiteTips h2 {
  margin-right: auto;
  font-size: 36px;
  font-family: Helvetica;
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: var(--font-color);
  margin-top: 0;
}
.aboutsiteTips .mask {
  height: 36px;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
}
.aboutsiteTips .mask span {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 36px;
  padding-bottom: var(--offset);
  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
}
.aboutsiteTips .mask span[data-show] {
  transform: translateY(-100%);
  transition: 0.5s transform ease-in-out;
}
.aboutsiteTips .mask span[data-up] {
  transform: translateY(-200%);
  transition: 0.5s transform ease-in-out;
}
.aboutsiteTips .mask span:nth-child(1) {
  background-image: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
}
.aboutsiteTips .mask span:nth-child(2) {
  background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
}
.aboutsiteTips .mask span:nth-child(3) {
  background-image: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
}
.aboutsiteTips .mask span:nth-child(4) {
  background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
}
@media screen and (max-width: 768px) {
  .author-content-item.map {
    margin-bottom: 0;
  }
}
#about-page .about-statistic {
  min-height: 380px;
  width: 39%;
  background-size: cover;
  color: var(--anzhiyu-white);
  overflow: hidden;
}
#about-page .about-statistic::after {
  box-shadow: 0 -159px 173px 71px #0c1c2c inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.author-content-item .card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
}
.author-content-item .card-content .author-content-item-title {
  margin-bottom: 0.5rem;
}
.author-content-item .author-content-item-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}
#statistic {
  font-size: 16px;
  border-radius: 15px;
  width: 100%;
  color: var(--anzhiyu-white);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
#statistic div span:first-child {
  opacity: 0.8;
  font-size: 12px;
}
#statistic div span:last-child {
  font-weight: 700;
  font-size: 34px;
  line-height: 1;
  white-space: nowrap;
}
#statistic div {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 50%;
  margin-bottom: 0.5rem;
}
.post-tips {
  color: var(--anzhiyu-gray);
  font-size: 14px;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
}
.post-tips a {
  color: var(--anzhiyu-gray) !important;
  border: none !important;
}
.author-content-item .card-content .banner-button-group .banner-button {
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  background: var(--anzhiyu-white-op);
  color: var(--anzhiyu-white);
  display: inline-flex;
  align-items: center;
  z-index: 1;
  transition: 0.3s;
  cursor: pointer;
  border-bottom: 0 !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateZ(0);
}
.author-content-item .card-content .banner-button-group .banner-button i,
.author-content-item .card-content .banner-button-group .banner-button svg {
  margin-right: 0.25rem;
  font-size: 22px;
}
.author-content-item .card-content .banner-button-group .banner-button .banner-button-text {
  margin-left: 4px;
}
#about-page .author-content-item .card-content .banner-button-group .banner-button i,
#about-page .author-content-item .card-content .banner-button-group .banner-button svg {
  font-size: 22px;
  margin-right: 0.25rem;
  height: 40px;
  max-width: 40px;
  display: flex;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
}
.author-content-item .card-content .banner-button-group .banner-button:hover {
  background: var(--anzhiyu-main);
  color: var(--anzhiyu-white);
  border-radius: 20px !important;
}
.author-content-item .card-content .banner-button-group .banner-button:hover i,
.author-content-item .card-content .banner-button-group .banner-button:hover svg .author-content-item.personalities {
  background: none !important;
}
.author-content-item.personalities {
  width: 59%;
}
.author-content-item.personalities .image {
  position: absolute;
  right: 30px;
  top: 10px;
  width: 220px;
  transition: transform 2s cubic-bezier(0.13, 0.45, 0.21, 1.02);
}
.author-content-item.personalities .image img {
  display: block;
  margin: 0 auto 20px;
  max-width: 100%;
  transition: filter 375ms ease-in 0.2s;
}
.author-content-item.personalities:hover .image {
  transform: rotate(-10deg);
}
.author-content-item.myphoto {
  height: 60%;
  min-height: 240px;
  position: relative;
  overflow: hidden;
  width: 39%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.author-content-item.myphoto img {
  position: absolute;
  min-width: 100%;
  object-fit: cover;
  transition: 0.6s;
  animation: coverIn 2s ease-out forwards;
  transition: transform 2s ease-out !important;
}
.author-content-item.myphoto:hover img {
  transform: scale(1.1);
}
.author-content-item:hover .card-background-icon {
  transform: rotate(20deg);
}
.author-content-item.personalities .title2 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
}
.author-content-item.map {
  min-height: 160px;
  max-height: 400px;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.5rem;
  height: 60%;
  transition: 1s ease-in-out;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.author-content-item.single {
  width: 100%;
}
.author-content-item.map .map-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: var(--font-color);
  background: var(--anzhiyu-maskbg);
  padding: 0.5rem 2rem;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateZ(0);
  transition: all 1s, color 0s ease-in-out;
  font-size: 20px;
}
.author-content-item.map .map-title b {
  color: var(--font-color);
}
.author-content-item.selfInfo {
  display: flex;
  min-height: 100px;
  max-height: 400px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: -webkit-fill-available;
  height: 40%;
}
.author-content-item.selfInfo div {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 2rem 0.5rem 0;
  min-width: 120px;
}
.author-content-item.selfInfo .selfInfo-title {
  opacity: 0.8;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 8px;
}
.author-content-item.selfInfo .selfInfo-content {
  font-weight: 700;
  font-size: 34px;
  line-height: 1;
}
.author-content-item-group.column.mapAndInfo {
  width: 59%;
}
.author-content-item.map:hover {
  background-size: 120%;
  transition: 4s ease-in-out;
  background-position-x: 0;
  background-position-y: 36%;
}
.author-content-item.map:hover .map-title {
  bottom: -100%;
}
.author-content-item-group.column {
  display: flex;
  flex-direction: column;
  width: 49%;
  justify-content: space-between;
}
.post-tips a:hover {
  color: var(--anzhiyu-main) !important;
  background: none !important;
}
.author-content-item.single.reward .reward-list-updateDate {
  color: var(--anzhiyu-gray);
  font-size: 14px;
}
.author-content-item.maxim {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: 39%;
}
.author-content-item .author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
}
.author-content-item.maxim .maxim-title {
  display: flex;
  flex-direction: column;
}
.author-content-item.buff {
  height: 200px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(120deg, #ff27e8 0, #ff8000 100%);
  color: var(--anzhiyu-white);
  background-size: 200%;
  animation: gradient 15s ease infinite;
  min-height: 200px;
  height: fit-content;
  width: 59%;
}
.author-content-item.buff .card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.author-content-item.buff .buff-title {
  display: flex;
  flex-direction: column;
}
.card-background-icon {
  font-size: 12rem;
  opacity: 0.2;
  position: absolute;
  right: 0;
  bottom: -40%;
  transform: rotate(30deg);
  transition: 2s ease-in-out;
}
.card-background-icon i {
  font-size: 12rem;
}
.author-content-item.game-yuanshen {
  background-size: cover;
  min-height: 300px;
  overflow: hidden;
  color: var(--anzhiyu-white);
  width: 59%;
}
.author-content-item .content-bottom {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author-content-item .content-bottom .icon-group {
  display: flex;
  position: relative;
}
.author-content-item .content-bottom .icon-group i {
  display: inline-block;
  width: 143px;
  height: 18px;
  margin-right: 0.5rem;
}
.author-content-item.game-yuanshen::after {
  box-shadow: 0 -69px 203px 11px #575d8b inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.author-content-item.comic-content {
  width: 39%;
  min-height: 300px;
  overflow: hidden;
}
.author-content-item.comic-content .comic-box {
  display: flex;
  width: 120%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.author-content-item.comic-content .author-content-item-tips,
.author-content-item.comic-content .author-content-item-title {
  z-index: 2;
  color: var(--anzhiyu-white);
  pointer-events: none;
}
.author-content-item.comic-content .comic-item {
  height: 100%;
  color: #fff;
  width: 20%;
  transform: skew(-10deg, 0deg);
  transition: 0.8s;
  position: relative;
  overflow: hidden;
}
.author-content-item.comic-content .comic-item:hover {
  width: 46%;
}
.author-content-item.comic-content .comic-item:hover .comic-item-cover {
  left: 16%;
  transform: skew(10deg, 0deg) scale(1.6);
}
.author-content-item.comic-content .comic-item .comic-item-cover {
  position: absolute;
  top: 0;
  left: -50%;
  height: 100%;
  transform: skew(10deg, 0deg);
  object-fit: cover;
  transition: scale 0.2s, all 0.8s;
}
.author-content-item.comic-content .comic-item .comic-item-cover img {
  height: 100%;
  transition: 0.8s;
  max-width: none;
  border-radius: 0px;
}
.author-content-item.comic-content::after {
  box-shadow: 0 -48px 203px 11px #fbe9b8 inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.author-content-item.like-technology {
  min-height: 230px;
  color: var(--anzhiyu-white);
}
.author-content-item.like-music {
  min-height: 400px;
  color: var(--anzhiyu-white);
  overflow: hidden;
}
.author-content-item.like-music::after {
  box-shadow: 0 -69px 203px 11px #453e38 inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
@media screen and (max-width: 1200px) {
  .author-content-item.personalities .image {
    width: 180px;
  }
}
@media screen and (max-width: 768px) {
  #gitcalendar {
    display: none;
  }
  [data-theme='dark'] .author-content-item .card-content .banner-button-group .banner-button {
    color: var(--anzhiyu-black) !important;
  }
  .author-content-item .card-content .banner-button-group .banner-button:hover {
    background: none !important;
  }
  .author-content-item.game-yuanshen .content-bottom {
    padding-bottom: 10px;
  }
  .author-content-item.game-yuanshen .game-yuanshen-uid {
    display: none;
  }
  .author-content {
    margin-top: 0;
  }
  .author-content-item {
    width: 100% !important;
    margin-top: 1rem;
    padding: 1rem;
  }
  .author-content-item.map {
    margin-bottom: 0;
  }
  .author-content-item-group.column {
    width: 100% !important;
  }
  .author-content-item.selfInfo {
    height: 95%;
  }
  .author-content-item.personalities {
    height: 200px;
  }
  .post-tips {
    left: auto;
  }
  .author-content-item.personalities .image {
    width: 125px;
  }
  .site-card-group > a {
    width: 100% !important;
  }
  body[data-type='about'] .post-reward {
    display: none;
  }
  .reward-list-item {
    width: 100% !important;
  }
  .author-content-item .card-content .banner-button-group .banner-button-text {
    display: none;
  }
  .author-content-item .card-content .banner-button-group {
    right: 1rem;
    bottom: 1rem;
  }
  .author-content-item .card-content .banner-button-group .banner-button {
    background: none;
    padding: 0;
    width: auto;
    backdrop-filter: unset;
  }
  .author-content-item .card-content .banner-button-group .banner-button i,
  .author-content-item .card-content .banner-button-group .banner-button svg {
    margin-right: 0.25rem;
    font-size: 1.5rem;
    background: #fff;
    border-radius: 50%;
    padding: 6px;
    margin-left: 80px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--anzhiyu-fontcolor);
  }
  .author-content-item .card-content .banner-button-group .banner-button:hover i {
    background: var(--anzhiyu-background) !important;
    color: var(--anzhiyu-theme);
  }
  #selfInfo-content-year {
    width: 90px;
  }
}
@media screen and (min-width: 768px) and (max-width: 896px) {
  .author-content-item.like-music .content-bottom .tips {
    display: none;
  }
}
.reward-list-all {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.reward-list-item {
  padding: 1rem;
  border-radius: 12px;
  border: var(--style-border-always);
  width: calc((100% / 5) - 0.5rem);
  margin: 0 0.25rem 0.5rem 0.25rem;
  box-shadow: var(--anzhiyu-shadow-border);
}
@media screen and (max-width: 1200px) {
  .reward-list-item {
    width: calc((100% / 3) - 0.5rem);
  }
}
.reward-list-item .reward-list-item-name {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.reward-list-item .reward-list-bottom-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.reward-list-item .reward-list-item-money {
  padding: 4px;
  background: var(--font-color);
  color: var(--card-bg);
  font-size: 12px;
  line-height: 1;
  border-radius: 4px;
  margin-right: 4px;
  white-space: nowrap;
}
.reward-list-item .reward-list-item-time {
  font-size: 12px;
  color: var(--anzhiyu-secondtext);
  white-space: nowrap;
}
.skills {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  min-height: 450px;
}
.skills .skill-icon {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.skills .skills-list {
  display: flex;
  opacity: 0;
  transition: 0.3s;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 10px;
}
.skills .skill-info {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 10px;
  background: var(--anzhiyu-background);
  border-radius: 40px;
  padding: 4px 12px 4px 8px;
  border: var(--style-border);
  box-shadow: var(--anzhiyu-shadow-border);
}
.skills .skill-icon img {
  width: 18px;
  height: 18px;
  margin: 0 auto !important;
}
.skills .skills-style-group {
  position: relative;
}
.author-content-item.skills .skills-style-group {
  position: relative;
}
.skills:hover .skills-style-group #skills-tags-group-all {
  opacity: 0;
}
.skills:hover .skills-style-group .skills-list {
  opacity: 1;
}
.author-content-item.careers {
  min-height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
}
.author-content-item.careers .careers-group {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
}
.author-content-item.careers .career-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.author-content-item.careers .career-item .circle {
  width: 16px;
  height: 16px;
  margin-top: 3px;
  margin-right: 8px;
  border-radius: 50%;
}
.author-content-item.careers .career-item .text {
  color: var(--anzhiyu-secondtext);
}
.author-content-item.careers .careers-item {
  display: flex;
  align-items: center;
}
.author-content-item.careers .careers-item .circle {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 16px;
}
.author-content-item.careers .careers-item .name {
  color: var(--anzhiyu-secondtext);
}
.author-content-item.careers img {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  transition: 0.6s;
  z-index: -1;
}
:root {
  --loadingbar-background-color: #2c2b30;
  --loadingbar-prospect-color: #ece5d8;
}
.loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 62.5px;
  transform: translate(-25%, -50%) scale(0.5);
  transition: all 0.5s;
  user-select: none;
  overflow: hidden;
}
.loading-bar::after {
  content: '';
  position: absolute;
  top: 500px;
  left: 0;
  filter: drop-shadow(0 -500px 0 var(--loadingbar-prospect-color));
  width: 500px;
  height: 62.5px;
  background: url("https://yuanshen.site/imgs/loading-bar.png") no-repeat left 100%;
  background-size: 500px 62.5px;
  background-position-x: 0;
}
.author-content-item.game-yuanshen:hover .loading-bar::after {
  animation: loading-bar 3.5s cubic-bezier(0.28, 0.11, 0.32, 1) infinite forwards;
}
@media screen and (max-width: 719px) {
  .loading-bar .loading-bar {
    display: none;
  }
}
@media screen and (max-width: 719px) and (orientation: landscape) {
  .loading-bar .loading-bar {
    display: block !important;
    transform: translate(-50%, -50%) scale(0.7) !important;
  }
}
@supports not (filter: drop-shadow(0 0 0 #fff)) {
  .loading-bar:before {
    content: 'Your browser does not support the animation';
  }
}
.hello-about {
  margin: 20px auto;
  border-radius: 24px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  overflow: hidden;
  user-select: none;
}
.shapes {
  position: relative;
  height: 315px;
  width: 100%;
  background: #2128bd;
  overflow: hidden;
}
.shape {
  will-change: transform;
  position: absolute;
  border-radius: 50%;
}
.shape.shape-1 {
  background: #005ffe;
  width: 650px;
  height: 650px;
  margin: -325px 0 0 -325px;
}
.shape.shape-2 {
  background: #ffe5e3;
  width: 440px;
  height: 440px;
  margin: -220px 0 0 -220px;
}
.shape.shape-3 {
  background: #ffcc57;
  width: 270px;
  height: 270px;
  margin: -135px 0 0 -135px;
}
.hello-about .content {
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 315px;
  width: 100%;
  background: #fff;
  mix-blend-mode: screen;
}
[data-theme='dark'] .hello-about .content {
  background: transparent;
}
[data-theme='dark'] .hello-about h1 {
  color: var(--anzhiyu-white);
}
.hello-about h1 {
  font-size: 200px;
  color: #000;
  margin: 0;
  text-align: center;
  font: inherit;
  vertical-align: baseline;
  line-height: 1;
  font-size: calc(0.0989119683 * 100vw + 58.5558852621px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (min-width: 419px) {
  .hello-about h1 {
    font-size: calc(0.0989119683 * 100vw + 58.5558852621px);
  }
}
@media (max-width: 768px) {
  .hello-about {
    margin: 20px 0 auto;
  }
}
.cursor {
  position: absolute;
  background: #2128bd;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border-radius: 50%;
  will-change: transform;
  user-select: none;
  pointer-events: none;
  z-index: 3;
}
#about-page .author-content-item-group.column.mapAndInfo {
  width: 100%;
}
#about-page .author-content-item-group.column {
  flex-direction: row;
}
#about-page .author-content-item.map {
  width: 50%;
}
#about-page .author-content-item.selfInfo {
  height: 100%;
  width: 49%;
}
@-moz-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% {
    width: 475px;
  }
  83.2% {
    width: 475px;
  }
  83.3% {
    width: 475px;
  }
  83.4% {
    width: 475px;
  }
  83.5% {
    width: 475px;
  }
  83.6% {
    width: 475px;
  }
  83.7% {
    width: 475px;
  }
  83.8% {
    width: 475px;
  }
  83.9% {
    width: 475px;
  }
  84% {
    width: 475px;
  }
  85% {
    width: 475px;
  }
  86% {
    width: 475px;
  }
  87% {
    width: 475px;
  }
  100% {
    width: 500px;
  }
}
@-webkit-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% {
    width: 475px;
  }
  83.2% {
    width: 475px;
  }
  83.3% {
    width: 475px;
  }
  83.4% {
    width: 475px;
  }
  83.5% {
    width: 475px;
  }
  83.6% {
    width: 475px;
  }
  83.7% {
    width: 475px;
  }
  83.8% {
    width: 475px;
  }
  83.9% {
    width: 475px;
  }
  84% {
    width: 475px;
  }
  85% {
    width: 475px;
  }
  86% {
    width: 475px;
  }
  87% {
    width: 475px;
  }
  100% {
    width: 500px;
  }
}
@-o-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% {
    width: 475px;
  }
  83.2% {
    width: 475px;
  }
  83.3% {
    width: 475px;
  }
  83.4% {
    width: 475px;
  }
  83.5% {
    width: 475px;
  }
  83.6% {
    width: 475px;
  }
  83.7% {
    width: 475px;
  }
  83.8% {
    width: 475px;
  }
  83.9% {
    width: 475px;
  }
  84% {
    width: 475px;
  }
  85% {
    width: 475px;
  }
  86% {
    width: 475px;
  }
  87% {
    width: 475px;
  }
  100% {
    width: 500px;
  }
}
@keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% {
    width: 475px;
  }
  83.2% {
    width: 475px;
  }
  83.3% {
    width: 475px;
  }
  83.4% {
    width: 475px;
  }
  83.5% {
    width: 475px;
  }
  83.6% {
    width: 475px;
  }
  83.7% {
    width: 475px;
  }
  83.8% {
    width: 475px;
  }
  83.9% {
    width: 475px;
  }
  84% {
    width: 475px;
  }
  85% {
    width: 475px;
  }
  86% {
    width: 475px;
  }
  87% {
    width: 475px;
  }
  100% {
    width: 500px;
  }
}
</style>

<style lang="scss" scoped>
.anzhiyu-about-page :deep(#about-page) {
  width: 100% !important;
  padding-top: 1rem !important;
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

.anzhiyu-about-page :deep(#about-reward .about-sponsor) {
  position: absolute;
  top: 40px;
  left: -25px;
  z-index: 2;
  width: 320px;
  height: 100px;
  pointer-events: none;
}

.anzhiyu-about-page :deep(#about-reward .about-sponsor #drinks-button-box),
.anzhiyu-about-page :deep(#about-reward .about-sponsor #drinks-qrcodes) {
  pointer-events: auto;
}

@media (max-width: 768px) {
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

body[data-type="about"] main#main-content.anzhiyu-about-page.vp-page>#page,
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
  --font-color: #ffffffb3;
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
