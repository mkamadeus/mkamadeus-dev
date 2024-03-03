<script setup lang="ts">
import dayjs from 'dayjs'

const title = ref()
const subtitle = ref()
const listItems = ref()

const { $gsap } = useNuxtApp()

let ctx: gsap.Context
onMounted(() => {
  const items = listItems.value.map((item: { cardWrapper: HTMLDivElement; }) => item.cardWrapper)
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
const { data } = await useAsyncData('blogs', () => queryContent('/blogs/en').find())

type ContentType = NonNullable<typeof data.value>

const blogs = computed(() => {
  const pages = data.value || []
  const parsedContent: Record<string, ContentType> = {}
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
</script>

<template>
  <div container="~" mx-auto px="3vh lg:6vh" min-h-screen>
    <h1 class="header" pb="2 lg:4" overflow-hidden font-800>
      <span ref="title" inline-block opacity-0>
        {{ t('blogs.title') }}
      </span>
    </h1>
    <div text="#999">
      <span ref="subtitle" inline-block opacity-0>
        {{ t('blogs.subtitle') }}
      </span>
    </div>
    <div mt="8 lg:16" container="~" grid="~ gap-2 cols-[repeat(1,1fr)] md:cols-[repeat(2,1fr)] lg:cols-[repeat(3,1fr)]">
      <div v-for="post in blogs.posts" :key="post.id" inline-block overflow-hidden>
        <BlogEntry ref="listItems" v-bind="post" opacity-0 />
      </div>
    </div>
  </div>
</template>
