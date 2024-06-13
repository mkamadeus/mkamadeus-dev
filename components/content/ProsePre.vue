<template>
  <div pos-relative>
    <pre :class="$props.class" text="base gray-100" font-400><slot /></pre>
    <div flex="~ col items-end" space-y-2 pos="absolute top-3 right-3" text="xs #aaa">
      <button
        flex="inline items-center"
        p="2"
        bg="#222 hover:#333"
        font="300"
        w-max
        cursor-pointer
        rounded-lg
        space-x-2
        @click="copy(code)"
      >
        <div class="i-carbon-copy" />
        <div>Copy</div>
      </button>
      <div v-if="copied" bg="#222" rounded-lg p-2 text-xs>
        Copied to clipboard!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const { copy, copied } = useClipboard()
</script>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
