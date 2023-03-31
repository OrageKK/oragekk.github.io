<template>
  <div class="project-panel">
    <template
      v-if="linkDatas.length > 0"
      v-for="(item, index) in linkDatas"
      :key="index"
    >
      <a
        class="item project"
        :class="GetColorClassName(index)"
        :href="item.link"
        target="_blank"
      >
        <img class="image" :src="item.ico" alt="" onerror='this.onerror=null,this.src=this.srcset="/assets/avatar.webp"'/>
        <div class="name">{{ item.name }}</div>
        <div class="desc">{{ item.desc }}</div>
      </a>
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
const GetColorClassName = (index) => {
  const Idx = index % 9;
  return `project${Idx}`;
};
</script>
<style lang="scss" scoped>
a.item {
  text-decoration: none;
}
.project .image {
  border-radius: 50%;
}
</style>
