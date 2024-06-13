<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const localeOptions = locales.value.map(l => [l.name, l.code]) as [string, string][]

const toggleState = ref(false)
</script>

<template>
  <DropdownMenuRoot
    v-model:open="toggleState"
  >
    <DropdownMenuTrigger
      text="#888"
      relative
      inline-flex
      cursor-pointer
      items-center
      rounded
      p-1
      space-x-1
      :class="{ 'text-white': toggleState }"
      @click="toggleState = !toggleState"
    >
      <span>{{ locale.toUpperCase() }}</span>
      <span>
        <div class="i-carbon-chevron-down" :class="{ 'rotate-180': toggleState }" transition="~ duration-300" />
      </span>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        flex="col"
        bg="#222"
        w="40"
        absolute
        right-0
        top-10
        z-50
        rounded-3
        p-1
        :side-offset="-50"
      >
        <DropdownMenuItem
          v-for="(option, i) of localeOptions"
          :key="i"
          cursor-pointer
          rounded-2
          p-1
          bg="hover:#333"
          text="#aaa"
          @click="setLocale(option[1]);"
        >
          {{ option[0] }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
