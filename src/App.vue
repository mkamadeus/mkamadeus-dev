<script setup lang="ts">
import { useHead } from "@vueuse/head";

useHead({
  title: "mkamadeus.dev",
  meta: [
    {
      name: "description",
      content: "mkamadeus' website for personal portfolio.",
    },
  ],
});
</script>

<template>
  <router-view />
</template>
