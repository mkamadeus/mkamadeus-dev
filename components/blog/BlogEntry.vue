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
const props = defineProps<Props>()
const author = toRef(props, 'author')
const { author: authorInfo, isPending: authorPending } = await useGithubUsername(author.value || 'mkamadeus')

</script>

<template>
  <div
    class="group"
    text="#aaa"
    rounded="lg"
    bg="#222"
    h-max
    w-full
  >
    <div bg="#333" h-40 rounded="t-lg" pos="relative">
      <NuxtImg
        :src="`https://avatar.vercel.sh/${id}.svg`"
        h-full
        w-full
        object="cover"
        rounded="t-lg"
      />
    </div>
    <div p-3>
      <div flex="~ justify-between" cursor-pointer @click="$router.push(`/blogs/${id}`)">
        <div>
          <div
            font="500 sans"
            text="lg"
            group-hover:text="#ddd"
            transition="all duration-150"
            mb-1
            leading-tight
          >
            {{ title }}
          </div>
        </div>
        <div>
          <div h-6 w-6 group-hover:text="#ddd" transition="all duration-150" class="i-carbon-arrow-up-right" />
        </div>
      </div>
      <div text="xs truncate #555" mb-1>
        {{ description }}
      </div>
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
      <div
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
      </div>
    </div>
  </div>
</template>
