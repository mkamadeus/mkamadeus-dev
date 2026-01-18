<script setup lang="ts">
import type { BlogCollectionItem } from '~/types/content'

type Props = {
  data: BlogCollectionItem | null
}

const props = defineProps<Props>()
const toc = computed(() => props.data?.body?.toc ?? { links: [] })
</script>

<template>
  <div id="toc">
    <div
      bg="#333"
      my-6
      h-0.5
    />
    <ol>
      <li
        v-for="l in toc.links"
        :key="`toc-l2-${l.id}`"
      >
        <a :href="`#${l.id}`">{{ l.text }}</a>
        <ol v-if="l.children">
          <li
            v-for="c in l.children"
            :key="`toc-l3-${c.id}`"
          >
            <a :href="`#${c.id}`">{{ c.text }}</a>
          </li>
        </ol>
      </li>
    </ol>
    <div
      bg="#333"
      my-6
      h-0.5
    />
  </div>
</template>
