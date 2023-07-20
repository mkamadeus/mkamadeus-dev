<script setup lang="ts">
// type Props = {
//   options: [string, string][]
//   initial?: string
// }

// type Emits = {
//   (event: 'input', value: string): void
// }

// const { initial, options } = defineProps<Props>()
// const emit = defineEmits<Emits>()

const { t, locale, locales, setLocale } = useI18n();

// @ts-ignore
const localeOptions = locales.value.map((l) => [l.name, l.code]) as [string, string][]


const tabindex = ref(0)
const open = ref(false)
const selected = ref('')

const onOption = (value: string) => {
  setLocale(value);
  open.value = false;
}

</script>

<template>
  <div rounded text="#888" relative cursor-pointer :tabindex="tabindex" @blur="open = false">
    <div inline-flex space-x-1 items-center rounded p-1 :class="{ 'text-white': open }" @click="open = !open">
      <span>{{ locale.toUpperCase() }}</span>
      <span>
        <div class="i-carbon-chevron-down" :class="{ 'rotate-180': open }" transition="~ duration-300" />
      </span>
    </div>
    <div absolute flex="col" bg="#222" min-w="full" p-1 top-10 :class="{ 'hidden': !open, 'flex': open }">
      <a v-for="(option, i) of localeOptions" :key="i" p-1 cursor-pointer bg="hover:#333"
        @click.prevent.stop="setLocale(option[1]); open = false;">
        {{ option[0] }}
      </a>
    </div>
  </div>
</template>
