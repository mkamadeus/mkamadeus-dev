<script setup lang="ts">
type Props = {
  frontmatter: Record<string, unknown>;
};

const { frontmatter } = defineProps<Props>();

const isBlog = frontmatter.blog;
const date = new Date(frontmatter.date as string);
</script>

<template>
  <div class="prose" :max-w="isBlog ? '85ch' : 'full'">
    <header v-if="isBlog">
      <h1>{{ frontmatter.title }}</h1>
      <div flex="~" space-x-2>
        <span>{{
          date.toLocaleString("default", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        }}</span>
        <span>·</span>
        <span>@{{ frontmatter.author }}</span>
      </div>
    </header>
    <slot />
  </div>
</template>
