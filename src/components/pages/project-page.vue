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
  <h1 class="header" mb-2 font-600>Projects</h1>
  <div flex="~ col" space="y-2" container="~" m="t-8 x-auto">
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
