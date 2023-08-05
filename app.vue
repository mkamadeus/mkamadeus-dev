<script setup lang="ts">
const { finalizePendingLocaleChange, locale } = useI18n()

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
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
