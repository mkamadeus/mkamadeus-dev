<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})

type Props = {
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="h-full w-full flex flex-col items-start justify-center bg-black p-12 text-white font-sans">
    <h1 class="my-0 mb-2 text-8xl">
      {{ title }}
    </h1>
    <p class="max-w-10ch text-2xl text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
;
</style>
