<script setup lang="ts">
import dayjs from 'dayjs'

type Props = {
  id: string
  title: string
  description: string
  author: string
  date: string
  duration: number
}
const cardWrapper = ref<HTMLDivElement>()
defineExpose({ cardWrapper })

defineProps<Props>()
// const author = toRef(props, 'author')
// const { author: authorInfo, isPending: authorPending } = await useGithubUsername(author.value || 'mkamadeus')

</script>

<template>
  <div
    ref="cardWrapper"
    class="group"
    text="#aaa"
    rounded="3"
    flex="~ space-x-2"
    w="full"
    cursor-pointer
    transition="colors duration-150"
    bg="hover:#333/30"
    p="2"
  >
    <NuxtImg
      :src="`https://avatar.vercel.sh/${id}.svg`"
      h-18
      w-18
      object="cover"
      transition="~ duration-150"
      filter="~ saturate-25"
      group-hover:filter="~ saturate-100"
      rounded="1"
    />
    <div h-18 max-w-72 flex-grow pl-4 text-wrap>
      <NuxtLink flex="~ justify-between" :to="`/blogs/${id}`">
        <div
          font="500 sans"
          text="lg"
          group-hover:text="#ddd"
          transition="all duration-150"
          mb-1
          line-clamp="2"
          leading-tight
        >
          {{ title }}
        </div>
        <div>
          <div h-5 w-5 group-hover:text="#ddd" transition="all duration-150" class="i-carbon-arrow-up-right" />
        </div>
      </NuxtLink>
      <!-- <div text="xs truncate #555" mb-1 w-full>
        {{ description }}
      </div> -->
      <div
        flex="inline wrap"
        font="300"
        text="xs #aaa"
        mb-4
        space-x-3
      >
        <div flex items-center space-x-1>
          <div class="i-carbon-calendar" />
          <div>
            {{ dayjs(date).format("D MMM YYYY") || "??" }}
          </div>
        </div>
        <div flex items-center space-x-1>
          <div inline-flex class="i-carbon-timer" />
          <div>{{ duration || "??" }} minute{{ duration > 1 ? 's' : '' }}</div>
        </div>
      </div>
      <!-- <div
        v-if="!authorPending"
        flex
        items-center
        space-x-2
        text="#aaa xs"
      >
        <div w="5 lg:6" h="5 lg:6">
          <img h-full w-full rounded-full shadow :src="authorInfo?.avatar_url">
        </div>
        <NuxtLink :to="authorInfo?.html_url" font-mono underline="~ dotted" target="_blank">
          @{{ authorInfo?.login }}
        </NuxtLink>
      </div> -->
    </div>
  </div>
</template>
