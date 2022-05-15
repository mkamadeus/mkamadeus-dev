<template>
  <main
    font="body antialiased"
    bg="black"
    text="gray-100"
    p="6 lg:12"
    flex="~"
    justify="center items-center"
    m="x-auto"
    w="full"
  >
    <article prose="~">
      <router-view />
    </article>
  </main>
  <footer font="body antialiased" bg="black" text="gray-100" p="6 lg:12">
    <div text="center sm gray-500" font="italic" m="b-4">
      ~ end of article ~
    </div>
    <div w="full" p="t-4" border="t-0.5 gray-100">
      <div flex="~" justify="center items-center" space="x-2" m="b-2">
        <template v-for="l in socialMedias" :key="l.url">
          <a :class="l.icon" class="text-2xl" opacity="75" :href="l.url" />
        </template>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import projects from "~/constants/project";
import socialMedias from "~/constants/socialmedia";
</script>
