<script setup lang="ts">
const props = defineProps<{ url: string }>();
</script>

<template>
  <a
    border="~ gray-100"
    hover:bg-gray-100
    hover:text-black
    font="body"
    p="2"
    flex="~"
    space="x-1"
    transition="all duration-300"
    :href="props.url"
    target="_blank"
    cursor="pointer"
  >
    <slot />
  </a>
</template>
