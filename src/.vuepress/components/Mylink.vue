<template>
  <div class="vp-project-panel">
    <template
      v-if="linkDatas.length > 0"
      v-for="(item, index) in linkDatas"
      :key="index"
    >
      <a
        class="item vp-project-card"
        :class="GetColorClassName(index)"
        :href="item.link"
        target="_blank"
      >
        <img
          class="vp-project-image"
          :src="item.icon"
          alt=""
          onerror='this.onerror=null,this.src=this.srcset="/assets/avatar.webp"'
        />
        <div class="vp-project-name">{{ item.name }}</div>
        <div class="vp-project-desc">{{ item.desc }}</div>
      </a>
    </template>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { LinkData } from "../data/friendData";
const props = defineProps({
  type: String,
  links:Object as PropType<LinkData[]>,
});
let linkDatas: LinkData[];
console.log(props.links);

linkDatas = props.links

const GetColorClassName = (index) => {
  const Idx = index % 9;
  return `project${Idx}`;
};
</script>
<style lang="scss" scoped>
a.item {
  text-decoration: none;
}
.project-card .image {
  border-radius: 50%;
}
</style>
