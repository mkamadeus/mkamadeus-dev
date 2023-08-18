<script setup lang="ts">
// set blog layout
definePageMeta({
  layout: 'blog'
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
  ]
})

defineOgImage({
  component: 'default'
  // title: data.value?.title
})

</script>

<template>
  <article>
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
  </article>
</template>
