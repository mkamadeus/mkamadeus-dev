<script setup lang="ts">
import dayjs from 'dayjs';

definePageMeta({
  layout: 'blog'
})
const route = useRoute()
const { data } = await useAsyncData(`blog-${route.params.slug}`, () => { return queryContent().where({ _path: `/blogs/${route.params.slug}` }).findOne() })
const { locale } = useI18n();
const dateFormat = computed(() => {
  switch (locale.value) {
    case 'en':
      return 'D MMMM YYYY';
    case 'id':
      return 'D MMMM YYYY';
    case 'ja':
      return 'YYYY年 M月 D日'
    case 'ko':
      return 'YYYY년 M월 D일'
    default:
      return 'D MMMM YYYY'
  }
})


type GithubUserResponse = {
  login: string
  avatar_url: string
  html_url: string
  bio: string
}
const { data: author, pending } = useFetch<GithubUserResponse>(`https://api.github.com/users/${data.value!.author || 'mkamadeus'}`)
</script>

<template>
  <section class="bg-gradient-to-tl from-#000 to-#222" pb-3vh>
    <div flex="~ col" items-center justify-center mx-auto px="6vh lg:16vh" w-full h-screen>
      <div>
        <div font="sans 900" text="4xl lg:8xl #ddd" mb="4 lg:8" grid-col-span-2>
          {{ data!.title }}
        </div>
        <div flex space-x-2 font-mono text="lg:xl #aaa" mb="8 lg:12">
          <div inline-flex items-center space-x-1>
            <span>
              <div class="i-carbon-calendar" />
            </span>
            <span>{{
              dayjs(data!.date as string).format(dateFormat) || "??"
            }}</span>
          </div>
          <div>•</div>
          <div inline-flex items-center space-x-1>
            <span>
              <div class="i-carbon-timer" />
            </span>
            <span> {{ (data!.duration as string) || "??" }} minutes </span>
          </div>
        </div>
        <div v-if="!pending" flex items-center space="x-3 lg:x-6" text="#aaa">
          <div>
            <img w-10 h-10 rounded-full shadow :src="author?.avatar_url" />
          </div>
          <div font-mono>
            <a :href="author?.html_url" class="underline text-dotted" target="_blank">@{{ author?.login }}</a>
            <div>{{ author?.bio }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="prose" w="full" max-w="75ch" mx-auto p="3vh" min-h="90vh">
    <ContentDoc :path="`/blogs/${route.params.slug}`" />
  </div>
</template>
