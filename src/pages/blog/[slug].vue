<script setup lang="ts">
const page = defineAsyncComponent(() => import(`~/blog/hello.md`));
</script>

<template>
  <component :is="page" />
</template>
