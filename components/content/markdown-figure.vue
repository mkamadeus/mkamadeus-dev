<script setup lang="ts">
type Props = {
  src: string
  alt?: string
  width: number
  height: number
  caption: string
}
defineProps<Props>()
</script>

<template>
  <figure>
    <NuxtImg :src="src" :alt="alt" lazy="true" :width="width" :height="height" />
    <figcaption text-center>
      {{ caption }}
    </figcaption>
  </figure>
</template>
