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
  <div>
    <main
      font="body antialiased"
      min-h="screen"
      pos="relative"
    >
      <NavigationHeader absolute />
      <article>
        <slot />
      </article>
      <NavigationFooter />
    </main>
  </div>
</template>
