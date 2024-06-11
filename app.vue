<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}

const useIdFunction = () => useId()
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtLoadingIndicator bg="green" />
      <NuxtPage :transition="{ onBeforeEnter }" />
    </NuxtLayout>
  </ConfigProvider>
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
