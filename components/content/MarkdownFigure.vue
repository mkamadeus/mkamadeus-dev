<script setup lang="ts">
type Props = {
  src: string
  alt?: string
  fit?: string
  width: number
  height: number
  caption: string
}
defineProps<Props>()

</script>

<template>
  <figure>
    <NuxtImg
      :src="src"
      :alt="alt || 'figure'"
      :fit="fit || 'cover'"
      :width="width"
      :height="height"
      loading="lazy"
      quality="100"
      densities="x1 x2"
    />
    <figcaption text-center>
      {{ caption }}
    </figcaption>
  </figure>
</template>
