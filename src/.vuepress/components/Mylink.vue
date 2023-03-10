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
        :href="item.href"
        target="_blank"
      >
        <img class="image" :src="item.img" alt="" />
        <div class="name">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </a>
    </template>
  </div>
</template>
<script setup lang="ts">
import { friends, LinkData } from "../data/friendData";
const props = defineProps({
  type: String,
});
let linkDatas: LinkData[];
switch (props.type) {
  case "friend":
    linkDatas = friends;
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
