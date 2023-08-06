<script setup lang="ts">
type Props = {
  videoId: string
}

defineProps<Props>()
</script>

<template>
  <div flex="~ justify-center" my-10>
    <iframe
      id="ytplayer"
      type="text/html"
      aspect-ratio="16/9"
      h-full
      w-full
      :src="`https://www.youtube.com/embed/${videoId}`"
      frameborder="0"
    />
  </div>
</template>
