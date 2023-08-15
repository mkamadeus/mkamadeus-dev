<script setup lang="ts">
import dayjs from 'dayjs'

const year = dayjs().year()
</script>

<template>
  <footer
    flex="~ col"
    items-center
    justify-center
    h="10vh"
    w="full"
    text="#888"
  >
    CC BY-NC-SA 4.0 {{ year }}
  </footer>
</template>
