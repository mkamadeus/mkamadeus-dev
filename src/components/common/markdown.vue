<script setup lang="ts">
import dayjs from "dayjs";

type Props = {
  frontmatter: Record<string, unknown>;
};

const { frontmatter } = defineProps<Props>();

const isBlog: boolean = frontmatter.blog as boolean;
const date = new Date(frontmatter.date as string);
const title = isBlog ? (frontmatter.title as string) : "";
const description = (frontmatter.description as string) || title;
if (isBlog) {
  useHead({
    title: title,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        name: "charset",
        content: "UTF-8",
      },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1.0",
      },
      {
        name: "robots",
        
      }
    ],
  });
}
</script>

<template>
  <div class="prose" w="full" :max-w="isBlog ? '75ch' : ''">
    <header v-if="isBlog" class="not-prose" flex="~ col" mb-6>
      <div font="sans 900" text="4xl lg:6xl" mb-4 grid-col-span-2>
        <span>
          {{ frontmatter.title || "Untitled" }}
        </span>
      </div>
      <div flex space-x-4>
        <div inline-flex items-center space-x-1 text="#aaa">
          <span><div class="i-carbon-calendar" /></span>
          <span>{{
            dayjs(frontmatter.date as string).format("D MMMM YYYY") || "??"
          }}</span>
        </div>
        <div inline-flex items-center space-x-1 text="#aaa">
          <span><div class="i-carbon-timer" /></span>
          <span> {{ (frontmatter.duration as string) || "??" }} minutes </span>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>
