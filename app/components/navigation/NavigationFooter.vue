<script setup lang="ts">
import dayjs from 'dayjs'

const year = dayjs().year()
</script>

<template>
  <footer
    flex="~ col"
    items-center
    justify-center
    w="full"
    p="3vh lg:6vh"
    text="#888"
    font-mono
  >
    CC BY-NC-SA 4.0 {{ year }}
  </footer>
</template>
