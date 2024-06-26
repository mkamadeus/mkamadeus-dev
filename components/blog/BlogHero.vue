<script setup lang="ts">
import dayjs from 'dayjs'

// get blog data
const route = useRoute()
const { data, pending } = await useAsyncData(`blog-${route.params.slug}`, () => { return queryContent().where({ _path: `/blogs/en/${route.params.slug}` }).findOne() })
if (!pending.value && !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
}

const { locale } = useI18n()
const dateFormat = computed(() => {
  switch (locale.value) {
    case 'en':
      return 'D MMMM YYYY'
    case 'id':
      return 'D MMMM YYYY'
    case 'ja':
      return 'YYYY年 M月 D日'
    case 'ko':
      return 'YYYY년 M월 D일'
    default:
      return 'D MMMM YYYY'
  }
})

const { author, isPending: authorPending } = await useGithubUsername(data.value?.author || 'mkamadeus')

useHead({
  meta: [
    { property: 'og:title', content: data.value?.title },
    { property: 'article:author', content: author.value?.html_url },
    { property: 'article:published_time', content: data.value?.date }
  ]
})
</script>

<template>
  <section class="from-#000 to-#222 bg-gradient-to-tl" pb-3vh>
    <div
      flex="~ col"
      px="6vh lg:16vh"
      mx-auto
      h-screen
      w-full
      items-center
      justify-center
    >
      <div>
        <div font="sans 900" text="4xl lg:8xl #ddd" mb="4 lg:8" grid-col-span-2>
          {{ data?.title }}
        </div>
        <div flex font-mono space-x-2 text="lg:xl #aaa" mb="8 lg:12">
          <div inline-flex items-center space-x-1>
            <span>
              <div class="i-carbon-calendar" />
            </span>
            <span>{{
              dayjs(data?.date as string).format(dateFormat) || "??"
            }}</span>
          </div>
          <div>•</div>
          <div inline-flex items-center space-x-1>
            <span>
              <div class="i-carbon-timer" />
            </span>
            <span> {{ (data!.duration as string) || "??" }} minute{{ data!.duration > 1 ? 's' : '' }} </span>
          </div>
        </div>
        <div v-if="!authorPending" flex items-center text="#aaa">
          <div w="10 lg:12" h="10 lg:12">
            <img h-full w-full rounded-full shadow :src="author?.avatar_url">
          </div>
          <div pl="3 lg:6">
            <div>{{ author?.name }}</div>
            <NuxtLink :to="author?.html_url" class="text-dotted underline" target="_blank" external>
              <div font-mono>
                @{{ author?.login }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
