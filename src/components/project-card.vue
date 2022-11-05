<script setup lang="ts">
type Props = {
  icon: string;
  title: string;
  stacks: string[];
  description: string;
  url?: string | string[];
  isPrivate?: boolean;
};
defineProps<Props>();
</script>

<template>
  <div
    pos="relative"
    justify="end items-end"
    border="~ white"
    p="3"
    w="64"
    opacity="75"
  >
    <div
      flex="~"
      space="x-1"
      m="b-1"
    >
      <span
        text="lg"
        :class="icon || 'i-carbon-search'"
      />
      <span font="bold header">{{ title }}</span>
    </div>
    <div
      flex="~ wrap"
      justify="start"
      m="b-2"
    >
      <div
        v-for="s in stacks"
        :key="title + s"
        text="xs"
        border="b"
        m="r-2"
      >
        #{{ s }}
      </div>
    </div>
    <div
      text="sm"
      m="b-10"
    >
      {{ description }}
    </div>
    <div
      v-if="!isPrivate && url"
      pos="absolute bottom-3 right-3"
      flex="~"
      space="x-2"
      justify="end"
    >
      <template v-if="Array.isArray(url)">
        <template
          v-for="(u, i) in url"
          :key="`project-card-${i}`"
        >
          <a
            display="block"
            border="~ gray-100"
            hover:bg-gray-100
            hover:text-black
            text-xs
            text-center
            justify-center
            font="body"
            w="20"
            p="1"
            flex="~"
            space="x-1"
            transition="all duration-300"
            :href="u"
            target="_blank"
            cursor="pointer"
          >
            View {{ i + 1 }}
          </a>
        </template>
      </template>
      <template v-else>
        <a
          display="block"
          border="~ gray-100"
          hover:bg-gray-100
          hover:text-black
          text-xs
          text-center
          justify-center
          font="body"
          w="20"
          p="1"
          flex="~"
          space="x-1"
          transition="all duration-300"
          :href="url"
          target="_blank"
          cursor="pointer"
        >
          View
        </a>
      </template>
    </div>
  </div>
</template>
