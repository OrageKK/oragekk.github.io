<template>
  <div class="timeline-wrapper">
    <ul class="timeline-content">
      <DropTransition>
        <li class="motto">{{ hint }}</li>
      </DropTransition>

      <TOC :items="tocItems" />

      <DropTransition
        v-for="({ year, items }, index) in sortedTimeline"
        :key="year"
        appear
        :delay="0.08 * (index + 1)"
        type="group"
      >
        <h3 :id="year.toString()" key="title" class="timeline-year-title">
          <span>{{ year }}</span>
        </h3>
        <li key="content" class="timeline-year-list">
          <ul class="timeline-year-wrapper">
            <li v-for="{ date, info, path } in items" :key="path" class="timeline-item">
              <span class="timeline-date">{{ date }}</span>
              <RouteLink class="timeline-title" :to="path">
                {{ info.t }}
              </RouteLink>
            </li>
          </ul>
        </li>
      </DropTransition>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouteLink } from "vuepress/client";
import { DropTransition } from "@theme-hope/components/transitions/index";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  useBlogOptions,
  useTimeline,
} from "@theme-hope/modules/blog/composables/index";
import type { TimelineItem } from "@theme-hope/modules/blog/composables/setupTimeline";
import TOC from "@theme-hope/modules/info/components/TOC";

const blogOptions = useBlogOptions();
const themeLocale = useThemeLocaleData();
const timelines = useTimeline();

const hint = computed(
  () => blogOptions.value.timeline ?? themeLocale.value.blogLocales.timelineTitle
);

const sortedTimeline = computed<TimelineItem[]>(() => {
  const groups = new Map<number, TimelineItem["items"]>();

  timelines.value.config
    .flatMap(({ items }) => items)
    .sort(
      (prev, next) =>
        (next.info.d ?? 0) - (prev.info.d ?? 0)
    )
    .forEach(({ info, path }) => {
      const timestamp = info.d;
      if (!timestamp) return;

      const date = new Date(timestamp);
      const year = date.getFullYear();
      const items = groups.get(year) ?? [];

      items.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        info,
        path,
      });
      groups.set(year, items);
    });

  return [...groups].map(([year, items]) => ({ year, items }));
});

const tocItems = computed(() =>
  sortedTimeline.value.map(({ year }) => ({
    title: year.toString(),
    level: 2,
    slug: year.toString(),
    children: [],
  }))
);
</script>
