<script setup lang="ts">
const blogPages = import.meta.globEager("../../blog/*.md");
console.log(blogPages);
const pages = Object.entries(blogPages).map((k, i) => {
  const path = k[0];
  return {
    slug: path.slice(11, path.length - 3),
    title: k[1].title,
    author: k[1].author,
    createdAt: k[1].createdAt,
  };
});
console.log(pages);
</script>

<template>
  <div>
    <div m="b-4 lg:b-8">
      <chroma-header text="blogs" />
    </div>
    <div
      flex="~ col lg:row"
      space="y-2 x-0 lg:y-0 lg:x-4"
    >
      <router-link
        v-for="p in pages"
        :key="p.slug"
        :to="`/blog/${p.slug}`"
        border="~ gray-100"
        p="2 lg:4"
        cursor="pointer"
        transform="~ hover:scale-105"
        transition="~"
      >
        <div
          text-xl
          font-bold
        >
          {{ p.title }}
        </div>
        <div>@{{ p.author }}</div>
        <div>{{ p.createdAt }}</div>
      </router-link>
    </div>
  </div>
</template>
