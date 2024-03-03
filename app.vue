<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator bg="green" />
    <NuxtPage :transition="{ onBeforeEnter }" />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  opacity: 100;
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
