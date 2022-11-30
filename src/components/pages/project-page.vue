<script setup lang="ts">
type Props = {
  projects: {
    icon: string;
    title: string;
    description: string;
    stacks: string[];
    url: string | string[] | undefined;
    isPrivate?: undefined;
  }[];
};

const { projects } = defineProps<Props>();
</script>

<template>
  <h1 class="header" mb="2 lg:4" font-600>Projects</h1>
  <div text="#999">
    Got any projects?
    <router-link class="link text-#ddd" to="/contact">Contact me!</router-link>
  </div>
  <div flex="~ col" space="y-8 lg:y-10" container="~" m="t-8 x-auto">
    <template v-for="(p, i) in projects" :key="`project-${i}`">
      <project-card
        :icon="p.icon"
        :description="p.description"
        :title="p.title"
        :stacks="p.stacks"
        :url="p.url"
      />
    </template>
  </div>
</template>
