<script setup lang="ts">
import socialMedias from "~/constants/socialmedia";

type Props = {
  frontmatter: Record<string, unknown>;
};

const props = defineProps<Props>();
console.log("layout", props);
</script>

<template>
  <main font="body antialiased" min-h="screen" pos="relative" text="white">
    <NavHeader />
    <article flex="~" justify-center items-center p="3vh lg:6vh" min-h="90vh">
      <router-view />
    </article>
    <NavFooter />
  </main>
</template>
