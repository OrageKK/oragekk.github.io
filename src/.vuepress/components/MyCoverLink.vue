<template>
  <div class="project-panel">
    <template
      v-if="linkDatas.length > 0"
      v-for="(item, index) in linkDatas"
      :key="index"
    >
      <div class="link-card">
        <a class="card-body" :href="item.link" target="_blank">
          <img
            class="link-picture"
            :src="`https://s0.wp.com/mshots/v1/${item.link}?w=323px&h=200px`"
            alt=""
            rel="noopener noreferrer external"
          />
          <div class="card-content">
            <div class="link-avatar my-auto">
              <img
                :src="item.ico"
                :alt="item.name"
                onerror='this.onerror=null,this.src=this.srcset="/assets/avatar.webp"'
              />
            </div>
            <div class="link-text">
              <div class="link-name">{{ item.name }}</div>
              <div class="link-desc">{{ item.desc }}</div>
            </div>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { api } from "../data/api";
import { friends, LinkData } from "../data/friendData";
const props = defineProps({
  type: String,
});
let linkDatas: LinkData[];
switch (props.type) {
  case "friend":
    linkDatas = friends;
    break;
  case "api":
    linkDatas = api;
    break;
  default:
    linkDatas = [];
    break;
}
</script>
<style lang="scss" scoped>
.link-card {
  position: relative;
  display: inline-block;
  width: calc(30% - 8px);
  @media (max-width: hope-config.$tablet) {
    width: calc(50% - 30px);
  }
  margin: 8px 11px;
  border-radius: 0.5rem;
  overflow: hidden;
  min-height: 10rem;
  color: inherit;
  background-color: #1f1f23;
  box-shadow: 1px 1px 8px var(--card-shadow);
  cursor: pointer;
  transition: box-shadow var(--transform-transition) transform
    var(--transform-transition);
}
.link-card:hover {
  transform: scale(0.98, 0.98);
  box-shadow: 0;
}
a.card-body {
  --light: #f8f9fa;

  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 1rem 0 rgba(0, 0, 0, 0.5),
    0 0 0 2px rgba(255, 255, 255, 0.15);
  display: inline-block;
  width: 100%;
  height: 100%;
  .card-content {
    display: flex;
    align-items: center;
    height: auto;
    justify-content: center;
    z-index: 2;
    position: absolute;
    top: 50%; /* 垂直位置为50% */
    left: 50%; /* 水平位置为50% */
    transform: translate(-50%, -50%); /* 移动到中心位置 */
    flex-wrap: wrap;
    width: 100%;
    .link-avatar {
      flex: none;
      transition: transform 0.6s ease-in-out, opacity 0.5s ease-in-out; /* 添加过渡效果 */
      width: 3.5rem;
      height: 3.5rem;
      @media (max-width: hope-config.$tablet) {
        width: 2.8rem;
        height: 2.8rem;
      }
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
        border: 1px solid var(--border-color);
        background-color: var(--light);
        object-fit: contain;
        box-shadow: 0 0 0 0.2rem rgba(195, 195, 195, 0.2),
          0 0 0 0.4rem rgba(195, 195, 195, 0.1);
      }
    }
    .link-text {
      transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out; /* 添加过渡效果 */
      line-height: 2.5;
      flex: none;
      flex-basis: 160px;
      text-align: center;
      padding: 0 0.8rem;
      @media (max-width: hope-config.$tablet) {
        flex-shrink: 1;
      }
      .link-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--light);
        font-weight: 700;
        @media (max-width: hope-config.$tablet) {
          font-size: 0.85rem;
        }
      }
      .link-desc {
        max-height: 2rem;
        font-size: 0.85rem;
        @media (max-width: hope-config.$tablet) {
          font-size: 0.75rem;
        }
        line-height: 1.2;
        color: var(--light-grey);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

a.card-body:hover {
  .link-picture {
    transform: scale(1);
    filter: opacity(1) blur(0px) saturate(150%);
  }
  .link-avatar {
    transform: rotate(360deg) scale(1.3);
    opacity: 0;
  }
  .link-text {
    transform: translateX(100%);
    opacity: 0;
  }
}
.card-body .link-picture {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 0.5rem;
  filter: opacity(0.5) blur(10px) saturate(0.5) brightness(0.5);
  transform: scale(0.96);
  transition: all var(--transform-transition);
}
</style>
