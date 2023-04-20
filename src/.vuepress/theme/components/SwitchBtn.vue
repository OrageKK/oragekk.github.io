<template>
  <div id="BingSwitchWrapper">
    <a
      :href="bingData.copyrightlink"
      target="_Blank"
      id="bingLink"
      v-if="bingData"
    >
      <div class="bingLink-icon">
        <svg
          class="mapPin"
          height="16"
          width="16"
          viewBox="0 0 12 12"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M0 0h12v12h-12z" fill="none"></path>
          <path
            d="M6.5 3a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zm0-3a4.5 4.5 0 0 0-4.5 4.5 5.607 5.607 0 0 0 .087.873c.453 2.892 2.951 5.579 3.706 6.334a1 1 0 0 0 1.414 0c.755-.755 3.253-3.442 3.706-6.334a5.549 5.549 0 0 0 .087-.873 4.5 4.5 0 0 0-4.5-4.5zm3.425 5.218c-.36 2.296-2.293 4.65-3.425 5.782-1.131-1.132-3.065-3.486-3.425-5.782a4.694 4.694 0 0 1-.075-.718 3.5 3.5 0 0 1 7 0 4.634 4.634 0 0 1-.075.718z"
          ></path>
        </svg>
      </div>
      <div id="bingLink-text">{{ title }}</div>
    </a>
    <div id="left" @click="leftClick" :class="{ disabled: lDisabled }"></div>
    <div id="right" @click="rightClick" :class="{ disabled: rDisabled }"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { Image } from "../api/bing";
const props = defineProps({
  bingData: {
    // 提供相对 `Object` 更确定的类型
    type: Object as PropType<Image>,
    required: true,
  },
  lDisabled: Boolean,
  rDisabled: Boolean,
});
const title = computed(() => {
  if (props.bingData.copyright != undefined) {
    const index = props.bingData.copyright.indexOf("(");
    return index != -1
      ? props.bingData.copyright.substring(0, index)
      : props.bingData.copyright;
  }
  return props.bingData.copyright;
});
// 声明自定义事件
const emit = defineEmits(["leftClick", "rightClick"]);

const leftClick = () => {
  emit("leftClick");
};
const rightClick = () => {
  emit("rightClick");
};
</script>
<style lang="scss" scoped>
#BingSwitchWrapper {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  z-index: 5;
  display: flex;
  align-items: center;
  a {
    color: var(--theme-color);
    font-weight: 500;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  #bingLink {
    display: flex;
    align-items: center;
    background-color: #2226;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  .bingLink-icon {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    .mapPin {
      fill: #fff;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      left: 50%;
      position: absolute;
    }
    @media (max-width: hope-config.$mobile) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  #bingLink-text {
    font-family: "Segoe UI", Segoe, Tahoma, Arial, Verdana, sans-serif;
    text-align: left;
    box-sizing: border-box;
    min-height: 2.5rem;
    max-width: 14rem;
    color: #fff;
    padding: 0.625rem 0.625rem 0.625rem 0rem;
    font-size: 0.9rem;
    @media (max-width: hope-config.$mobile) {
      font-size: 0.75rem;
      min-height: 2rem;
    }
  }
  #left {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #222c;
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    @media (max-width: hope-config.$mobile) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  #left::after {
    transform: scale(0.25) translate(25%) rotate(45deg);
    border-radius: 0.375rem;
    border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
  }
  #left.disabled::after {
    border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
  }
  #right {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #222c;
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    @media (max-width: hope-config.$mobile) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  #right::after {
    transform: scale(0.25) translate(-25%) rotate(225deg);
    border-radius: 0.375rem;
    border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
  }
  #right.disabled::after {
    border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
  }
}
</style>
