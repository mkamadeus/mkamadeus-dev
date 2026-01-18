<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string

// Redirect to English if content is not in current locale (check before fetching)
if (locale.value !== 'en') {
  const collectionName = `blogs_${locale.value}` as 'blogs_en' | 'blogs_id' | 'blogs_ja' | 'blogs_ko'
  const stemPath = `blogs/${locale.value}/${slug}`
  const localizedContent = await queryCollection(collectionName).where('stem', '=', stemPath).first().catch(() => null)

  if (!localizedContent) {
    await navigateTo(`/blogs/${slug}`, { redirectCode: 301 })
  }
}

const { data } = await useAsyncData(`blog-${locale.value}-${slug}`, async () => {
  return await useBlogBySlug(slug)
}, {
  watch: [locale],
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
}

const head = useLocaleHead()

useHead({
  title: data.value?.title,
  link: [...(head.value.link || [])],
  meta: [
    ...(head.value.meta || []),
    { property: 'og:title', content: data.value?.title },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://mkamadeus.dev${route.fullPath}` },
  ],
})
</script>

<template>
  <NuxtLayout name="blog">
    <BlogHero :data="data!" />
    <ContentRenderer
      :value="data!"
      :prose="false"
      class="prose prose-teal prose-invert"
      w="full"
      max-w="75ch"
      mx-auto
      p="3vh"
      min-h="90vh"
      tag="article"
    />
  </NuxtLayout>
</template>
