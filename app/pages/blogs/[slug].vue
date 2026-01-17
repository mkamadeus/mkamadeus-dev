<script setup lang="ts">
import type { Collections } from '@nuxt/content'

definePageMeta({
  layout: false,
})

const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string

const { data } = await useAsyncData(`blog-${locale.value}-${slug}`, async () => {
  try {
    const collection = `blogs_${locale.value}` as keyof Collections
    const fullStem = `blogs/${locale.value}/${slug}`

    let content = await queryCollection(collection).where('stem', '=', fullStem).first()

    if (!content && locale.value !== 'en') {
      const fallbackStem = `blogs/en/${slug}`
      content = await queryCollection('blogs_en').where('stem', '=', fallbackStem).first()
    }

    return content
  }
  catch (error) {
    console.error('Query error:', error)
    return null
  }
}, {
  watch: [locale],
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
}

const head = useLocaleHead({
  addSeoAttributes: true,
})

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
    <BlogHero :data="data" />
    <ContentRenderer
      :value="data"
      :prose="false"
      class="prose prose-invert prose-teal"
      w="full"
      max-w="75ch"
      mx-auto
      p="3vh"
      min-h="90vh"
      tag="article"
    />
  </NuxtLayout>
</template>
