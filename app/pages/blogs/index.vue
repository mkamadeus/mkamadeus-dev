<script setup lang="ts">
import type { BlogCollectionItem } from '~/types/content'
import dayjs from 'dayjs'

const title = ref()
const subtitle = ref()
const listItems = ref()

const { $gsap } = useNuxtApp()

let ctx: gsap.Context
onMounted(() => {
  if (!listItems.value) return

  const items = listItems.value.map((item: { cardWrapper: HTMLDivElement }) => item.cardWrapper)
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(title.value, { autoAlpha: 0 })
    tl.set(subtitle.value, { autoAlpha: 0 })
    tl.set(items, { autoAlpha: 0 })

    tl.fromTo(title.value, { yPercent: 105 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.fromTo(subtitle.value, { yPercent: 105 }, { yPercent: 0, autoAlpha: 1, duration: 0.3 })
    tl.fromTo(items, { yPercent: 105 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.15 })

    tl.play()
  })
})

onUnmounted(() => {
  ctx.kill()
})

const { t } = useI18n()
const { locale } = useI18n()

const { data } = await useAsyncData(`blogs-${locale.value}`, async () => {
  const { blogs, fallbackBlogs } = await useBlogs()
  return (blogs.length > 0 ? blogs : fallbackBlogs) as BlogCollectionItem[]
}, {
  watch: [locale],
})

type ContentType = BlogCollectionItem

const blogs = computed(() => {
  const pages = data.value || []
  const parsedContent: Record<string, ContentType[]> = {}
  const postsByYear: Record<string, BlogPost[]> = {}
  const posts: BlogPost[] = []

  // group by year
  pages.forEach((page) => {
    const date = dayjs(page.date)
    const year = date.year().toString()
    if (!parsedContent[year]) {
      parsedContent[year] = []
    }
    parsedContent[year].push(page)
  })

  // get list of years
  const years = Object.keys(parsedContent).sort((y1, y2) => {
    const diff = parseInt(y1) - parseInt(y2)
    if (diff > 0) {
      return -1
    }
    if (diff < 0) {
      return 1
    }
    return 0
  })

  // for each year listed
  Object.keys(parsedContent).forEach((year) => {
    // sort blogs
    parsedContent[year]?.sort((b1, b2) => {
      const d1 = dayjs(b1.date)
      const d2 = dayjs(b2.date)
      const diff = d1.diff(d2)
      if (diff > 0) {
        return -1
      }
      if (diff < 0) {
        return 1
      }
      return 0
    })

    // map blogs to simplified format
    postsByYear[year] = parsedContent[year]?.map((v) => {
      const stemParts = (v.stem || '').split('/')
      const filename = stemParts[stemParts.length - 1] || ''

      const bp: BlogPost = {
        title: v.title!,
        author: v.author,
        description: v.description,
        path: v.path || '',
        date: v.date,
        duration: v.duration,
        lang: locale.value,
        id: filename,
      }
      return bp
    }) || []
  })

  Object.keys(postsByYear).forEach((year) => {
    const yearPosts = postsByYear[year]
    if (yearPosts) {
      posts.push(...yearPosts)
    }
  })

  posts.sort((b1, b2) => {
    const d1 = dayjs(b1.date)
    const d2 = dayjs(b2.date)
    const diff = d1.diff(d2)
    if (diff > 0) {
      return -1
    }
    if (diff < 0) {
      return 1
    }
    return 0
  })

  return {
    years,
    postsByYear,
    posts,
  }
})
</script>

<template>
  <div
    container="~"
    mx-auto
    px="3vh lg:6vh"
    min-h-screen
  >
    <h1
      class="header"
      pb="2 lg:4"

      font-800
      overflow-hidden
    >
      <span
        ref="title"

        opacity-0
        inline-block
      >
        {{ t('blogs.title') }}
      </span>
    </h1>
    <div text="#999">
      <span
        ref="subtitle"

        opacity-0
        inline-block
      >
        {{ t('blogs.subtitle') }}
      </span>
    </div>
    <div
      mt="8 lg:16"
      container="~"
      grid="~ gap-2 cols-[repeat(1,1fr)] md:cols-[repeat(2,1fr)] lg:cols-[repeat(3,1fr)]"
    >
      <div
        v-for="post in blogs.posts"
        :key="post.id"
        inline-block
        overflow-hidden
      >
        <BlogEntry
          ref="listItems"
          v-bind="post"
          opacity-0
        />
      </div>
    </div>
  </div>
</template>
