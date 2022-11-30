<script setup lang="ts">
type Props = {
  icon: string;
  title: string;
  stacks: string[];
  description: string;
  url?: string | string[];
  isPrivate?: boolean;
};

const props = defineProps<Props>();
const url = $computed(() => {
  let result: string[];
  if (props.url) {
    if (typeof props.url === "string") {
      result = [props.url];
    } else {
      result = props.url;
    }
    return result;
  }
  return [];
});
let urlList = props.url ?? [];
</script>

<template>
  <div inline-grid="~" w="full">
    <div col-span-3 inline-flex items-center space="x-2" text="lg lg:2xl #ddd">
      <span :class="icon" />
      <span font="600 sans">{{ title }}</span>
    </div>
    <span v-if="!isPrivate && url" col-span-2 flex space-x-2 justify-end>
      <template v-for="(u, i) in url" :key="`project-card-${i}`">
        <a
          display="block"
          class="i-carbon-launch text-lg text-#bbb link"
          justify-center
          font="body"
          flex="~"
          space="x-1"
          transition="all duration-150"
          :href="u"
          target="_blank"
          cursor="pointer"
        />
      </template>
    </span>
    <div font-300 col-span-4 text="#bbb">
      {{ description }}
    </div>
    <div flex="~ wrap" justify="start" col-span-5>
      <div
        v-for="s in stacks"
        :key="title + s"
        class="link text-xs"
        font-300
        m="r-2"
      >
        <span font="700">#</span>{{ s }}
      </div>
    </div>
  </div>
</template>
