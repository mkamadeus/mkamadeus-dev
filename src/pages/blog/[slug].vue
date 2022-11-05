<script setup lang="ts">
const route = useRoute();
console.log(route.params.slug);

const title = ref("");
const author = ref("");
const createdAt = ref("");

const page = defineAsyncComponent(() => {
  return import(`../../blog/${route.params.slug}.md`).then((c) => {
    title.value = c.title;
    author.value = c.author;
    createdAt.value = c.createdAt;
    return c;
  });
});

// const title = computed(() => page.)
</script>

<template>
  <article
    flex="~ col"
    items-center
    min-h="screen"
  >
    <header
      flex
      w-full
      p="lg:6"
    >
      <div
        rounded-full
        w-1
        h-full
        bg-gray-100
      />
      <div ml-4>
        <h1
          font="header bold"
          text="4xl lg:7xl"
        >
          {{ title }}
        </h1>
        <div italic>
          By: {{ author }} | {{ createdAt }}
        </div>
      </div>
    </header>
    <div prose>
      <suspense>
        <component :is="page" />
        <template #fallback>
          loading...
        </template>
      </suspense>
    </div>
  </article>
</template>
