<script setup lang="ts">
import socialMedias from "~/constants/socialmedia";

type Props = {
  frontmatter: Record<string, unknown>;
};

const props = defineProps<Props>();
console.log("layout", props);
</script>

<template>
  <article
    font="body antialiased"
    p="6 lg:12"
    flex="~"
    justify="center items-center"
    m="x-auto"
    w="full"
  >
    <router-view />
  </article>
  <div text="white">
    <NavFooter />
  </div>
</template>
