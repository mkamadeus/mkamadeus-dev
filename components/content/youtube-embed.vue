<script setup lang="ts">
type Props = {
  videoId: string
}

defineProps<Props>()
</script>

<template>
  <div flex="~ justify-center" my-6>
    <iframe id="ytplayer" type="text/html" width="640" height="360" :src="`https://www.youtube.com/embed/${videoId}`"
      frameborder="0" />
  </div>
</template>
