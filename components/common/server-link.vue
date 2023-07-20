<script setup lang="ts">

type Props = {
  href: string
}

const props = defineProps<Props>();

// const constructedPath = ref('')

// watch([window], () => {
//   if(!params.has("lang")) params.set("lang", "en-US");
// })
const params = new URLSearchParams()
params.set("lang", "en-US");
const constructedPath = `${props.href}?${params.toString()}`;
</script>

<template>
  <a :href="constructedPath">
    <slot />
  </a>
</template>
