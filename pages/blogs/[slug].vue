<script setup lang="ts">
import dayjs from 'dayjs';

definePageMeta({
  layout: 'blog'
})
const route = useRoute()
const { data } = await useAsyncData(`blog-${route.params.slug}`, () => { return queryContent().where({ _path: `/${route.params.slug}` }).findOne() })
console.log(data.value)
</script>

<template>
  <section :style="{
    'background-image': 'url(/images/hmif-goes-out-09-office.jpeg)'
  }" pt-12vh pb-3vh>
    <div flex="~ col" mx-auto px="3vh lg:6vh" mb-6 w-full max-w="75ch">

      <div font="sans 900" text="4xl lg:6xl #ddd" mb-4 grid-col-span-2>
        {{ data!.title }}
      </div>
      <div flex space-x-4>
        <div inline-flex items-center space-x-1 text="#aaa">
          <span>
            <div class="i-carbon-calendar" />
          </span>
          <span>{{
            dayjs(data!.date as string).format("D MMMM YYYY") || "??"
          }}</span>
        </div>
        <div inline-flex items-center space-x-1 text="#aaa">
          <span>
            <div class="i-carbon-timer" />
          </span>
          <span> {{ (data!.duration as string) || "??" }} minutes </span>
        </div>
      </div>
    </div>
  </section>
  <div class="prose" w="full" max-w="75ch" mx-auto p="3vh lg:6vh" min-h="90vh">
    <ContentDoc :path="`/${route.params.slug}`" />
  </div>
</template>
