<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

// @ts-ignore
const localeOptions = locales.value.map(l => [l.name, l.code]) as [string, string][]

const tabindex = ref(0)
const open = ref(false)
</script>

<template>
  <div
    text="#888"
    relative
    cursor-pointer
    rounded
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div
      inline-flex
      items-center
      rounded
      p-1
      space-x-1
      :class="{ 'text-white': open }"
      @click="open = !open"
    >
      <span>{{ locale.toUpperCase() }}</span>
      <span>
        <div class="i-carbon-chevron-down" :class="{ 'rotate-180': open }" transition="~ duration-300" />
      </span>
    </div>
    <div
      flex="col"
      bg="#222"
      w="40"
      absolute
      right-0
      top-10
      z-50
      p-1
      :class="{ 'hidden': !open, 'flex': open }"
    >
      <a
        v-for="(option, i) of localeOptions"
        :key="i"
        cursor-pointer
        p-1
        bg="hover:#333"
        @click.prevent.stop="setLocale(option[1]); open = false;"
      >
        {{ option[0] }}
      </a>
    </div>
  </div>
</template>
