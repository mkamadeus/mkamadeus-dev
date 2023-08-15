<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import dayjs from 'dayjs'

const { t } = useI18n()
const { data } = await useAsyncData('blogs', () => queryContent('/blogs/en').find())

const blogs = computed(() => {
  const pages = data.value || []
  const parsedContent: Record<string, ParsedContent[]> = {}
  const postsByYear: Record<string, BlogPost[]> = {}
  const posts: BlogPost[] = []

  // group by year
  pages.forEach((page) => {
    const date = dayjs(page.date)
    const year = date.year().toString()
    if (!parsedContent[year]) { parsedContent[year] = [] }
    parsedContent[year].push(page)
  })

  // get list of years
  const years = Object.keys(parsedContent).sort((y1, y2) => {
    const diff = parseInt(y1) - parseInt(y2)
    if (diff > 0) { return -1 }
    if (diff < 0) { return 1 }
    return 0
  })

  // for each year listed
  Object.keys(parsedContent).forEach((year) => {
    // sort blogs
    parsedContent[year].sort((b1, b2) => {
      const d1 = dayjs(b1.date)
      const d2 = dayjs(b2.date)
      const diff = d1.diff(d2)
      if (diff > 0) { return -1 }
      if (diff < 0) { return 1 }
      return 0
    })

    // map blogs to simplified format
    postsByYear[year] = parsedContent[year].map((v) => {
      const parsed = v._path!.split('/')
      const id = parsed.pop() || ''
      let lang = parsed.pop() || 'en'
      if (lang === 'blogs') { lang = 'en' }

      const bp: BlogPost = {
        title: v.title!,
        author: v.author,
        description: v.description,
        path: v._path!,
        date: v.date,
        duration: v.duration,
        lang,
        id
      }
      return bp
    })
  })

  Object.keys(postsByYear).forEach((year) => {
    posts.push(...postsByYear[year])
  })

  posts.sort((b1, b2) => {
    const d1 = dayjs(b1.date)
    const d2 = dayjs(b2.date)
    const diff = d1.diff(d2)
    if (diff > 0) { return -1 }
    if (diff < 0) { return 1 }
    return 0
  })

  return {
    years,
    postsByYear,
    posts
  }
})

const listItems = ref<HTMLLIElement[]>([])
const listHeights = ref<number[]>([])

onMounted(() => {
  listHeights.value = listItems.value.map(el => el.clientHeight)
})
</script>

<template>
  <div container="~" mx-auto>
    <h1 class="header" mb="2 lg:4" font-800 animated="~ fade-in-up ease-in-out delay-500">
      {{ t('blogs.title') }}
    </h1>
    <div text="#999" animated="~ fade-in-up ease-in-out delay-1000">
      {{ t('blogs.subtitle') }}
    </div>
    <div flex="~ col" space="y-2" container="~" m="t-8 x-auto">
      <div grid="~ gap-3vh cols-[repeat(auto-fit,minmax(18.75rem,1fr))]">
        <template v-for="(post,i) in blogs.posts" :key="post.id">
          <BlogEntry v-bind="post" animated="~ fade-in-up ease-in-out" :style="`animation-delay: ${1000+200*i}ms`" />
        </template>
      </div>
    </div>
  </div>
</template>
