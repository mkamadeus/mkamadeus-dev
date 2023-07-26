<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`blog-${route.params.slug}`, () => { return queryContent().where({ _path: `/blogs/${route.params.slug}` }).findOne() })
const toc = computed(() => data.value!.body.toc)
</script>

<template>
  <div id="toc">
    <div bg="#333" h-0.5 my-6 />
    <ol>
      <li v-for="l in toc.links">
        <a :href="`#${l.id}`">{{ l.text }}</a>
        <ol v-if="l.children">
          <li v-for="c in l.children">
            <a :href="`#${c.id}`">{{ c.text }}</a>
          </li>
        </ol>
      </li>
    </ol>
    <div bg="#333" h-0.5 my-6 />
  </div>
</template>
