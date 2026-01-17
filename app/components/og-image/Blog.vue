<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

type Props = {
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="text-white p-12 bg-black flex flex-col h-full w-full items-start justify-center">
    <h1 class="text-8xl my-0 mb-2">
      {{ title }}
    </h1>
    <p class="text-2xl text-gray-500 max-w-10ch">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
;
</style>
