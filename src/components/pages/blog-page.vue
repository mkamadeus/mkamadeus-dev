<script setup lang="ts">
const router = useRouter();
const routes = router
  .getRoutes()
  .filter(
    (r) => r.path.startsWith("/blog") && r.path != "/blog" && r.meta.frontmatter
  );
</script>

<template>
  <chroma-header text="blogs" />
  <div flex="~ col" space="y-2" container="~" m="t-8 x-auto">
    <template v-for="r in routes" :key="r.path">
      <div p="4" border="~ white" cursor="pointer" @click="router.push(r.path)">
        <div font="bold">{{ r.meta.frontmatter.title }}</div>
        <div>
          {{ r.meta.frontmatter.date }} - {{ r.meta.frontmatter.author }}
        </div>
      </div>
    </template>
  </div>
</template>
