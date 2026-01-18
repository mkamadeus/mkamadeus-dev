<script setup lang="ts">
const head = useLocaleHead()

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs!.lang,
    dir: (head.value.htmlAttrs!.dir as 'ltr' | 'rtl' | 'auto') || 'ltr',
  },
  link: [...(head.value.link || [])],
  meta: [...(head.value.meta || [])],
})
</script>

<template>
  <main
    font="body antialiased"
    min-h="screen"
    pos="relative"
    text="white"
  >
    <NavigationHeader relative />
    <div

      mx-auto
      container
    >
      <div
        flex="~"
        items-center
        justify-center
      >
        <slot />
      </div>
    </div>
    <NavigationFooter />
  </main>
</template>
