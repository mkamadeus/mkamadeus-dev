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
.layout-enter-active,
.layout-leave-active {
  opacity: 1;;
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.55s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2rem);
}
</style>
