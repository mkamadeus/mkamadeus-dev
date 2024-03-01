<script setup lang="ts">
// set blog layout
definePageMeta({
  layout: false
})

// get blog data
const route = useRoute()
const { data, pending } = await useAsyncData(`blog-${route.params.slug}`, () => { return queryContent().where({ _path: `/blogs/en/${route.params.slug}` }).findOne() })
if (!pending.value && !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
}

useHead({
  title: data.value?.title,
  meta: [
    { property: 'og:title', content: data.value?.title },
    { property: 'og:type', content: 'article' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css'
    }
  ]
})

// defineOgImage({
//   component: 'Blog'
// })
</script>

<template>
  <NuxtLayout name="blog">
    <BlogHero />
    <div
      class="prose"
      w="full"
      max-w="75ch"
      mx-auto
      p="3vh"
      min-h="90vh"
    >
      <ContentDoc :path="`/blogs/en/${route.params.slug}`" />
    </div>
  </NuxtLayout>
</template>
