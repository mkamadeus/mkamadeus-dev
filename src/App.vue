<script setup lang="ts">
import { useHead } from "@vueuse/head";

useHead({
  title: "mkamadeus.dev",
  meta: [
    {
      name: "description",
      content: "mkamadeus' website for personal portfolio.",
    },
    {
      name: "charset",
      content: "UTF-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1.0",
    },
  ],
});
</script>

<template>
  <router-view />
</template>
