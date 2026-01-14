<script setup lang="ts">
// set blog layout
definePageMeta({
  layout: false,
})

// get blog data
const route = useRoute()
const { locale } = useI18n()
const { data, pending } = await useAsyncData(`blog-${locale.value}-${route.params.slug}`, async () => {
  // Try localized content first, fallback to English
  const localizedPath = `/blogs/${locale.value}/${route.params.slug}`
  const fallbackPath = `/blogs/en/${route.params.slug}`

  let content = await queryContent().where({ _path: localizedPath }).findOne().catch(() => null)
  if (!content) {
    content = await queryContent().where({ _path: fallbackPath }).findOne()
  }
  return content
})
if (!pending.value && !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
}

useHead({
  title: data.value?.title,
  meta: [
    { property: 'og:title', content: data.value?.title },
    { property: 'og:type', content: 'article' },
  ],
})

// defineOgImage({
//   component: 'Blog'
// })
</script>

<template>
  <NuxtLayout name="blog">
    <BlogHero :data="data" />
    <div
      class="prose"
      w="full"
      max-w="75ch"
      mx-auto
      p="3vh"
      min-h="90vh"
    >
      <ContentDoc :path="data?._path" />
    </div>
  </NuxtLayout>
</template>
