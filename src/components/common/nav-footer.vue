<script setup lang="ts">
import socialMedias from "~/constants/socialmedia";

const routes = [
  { text: "#home", route: "/" },
  { text: "#blog", route: "/blog" },
  { text: "#projects", route: "/projects" },
  { text: "#contact", route: "/contact" },
];
</script>

<template>
  <footer flex="~ col" justify-center h="10vh" w="full" text="white">
    <div flex="~" justify="center items-center" space="x-2" m="b-2">
      <template v-for="l in socialMedias" :key="l.url">
        <a
          :class="l.icon"
          class="text-2xl"
          opacity="75 hover:100"
          transition="all duration-150"
          target="_blank"
          :href="l.url"
        />
      </template>
    </div>
    <div flex="~" space="x-4" justify="center items-center">
      <template v-for="{ text, route } in routes" :key="`route-${text}`">
        <div flex="~ col" justify="center">
          <div underline="~ dotted gray-100" text="center middle" font-mono>
            <router-link :to="route">
              {{ text }}
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </footer>
</template>
