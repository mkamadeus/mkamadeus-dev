<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="{ onBeforeEnter }" />
  </NuxtLayout>
</template>
