<script setup lang="ts">
import dayjs from "dayjs";

type BlogPage = {
  path: string;
  title: string;
  date: dayjs.Dayjs;
  author: string;
  duration: string;
};

const router = useRouter();

const blogs: Record<string, BlogPage[]> = {};
const pages: BlogPage[] = router
  .getRoutes()
  .filter(
    (r) => r.path.startsWith("/blog") && r.path != "/blog" && r.meta.frontmatter
  )
  .map((r) => {
    const page: BlogPage = {
      path: r.path,
      title: r.meta.frontmatter.title as string,
      date: dayjs(r.meta.frontmatter.date as string),
      author: r.meta.frontmatter.author as string,
      duration: r.meta.frontmatter.duration as string,
    };
    return page;
  });

// group by year
pages.forEach((page) => {
  const year = page.date.year().toString();
  if (!blogs[year]) blogs[year] = [];
  blogs[year].push(page);
});

const years = Object.keys(blogs).sort((y1, y2) => {
  const diff = parseInt(y1) - parseInt(y2);
  if (diff > 0) return -1;
  if (diff < 0) return 1;
  return 0;
});

// sort blogs
Object.keys(blogs).forEach((year) => {
  blogs[year].sort((b1, b2) => {
    const diff = b1.date.diff(b2.date);
    if (diff > 0) return -1;
    if (diff < 0) return 1;
    return 0;
  });
});

const listItems = ref<HTMLLIElement[]>([]);
const listHeights = computed(() =>
  listItems.value.map((el) => el.clientHeight)
);

onMounted(() => {
  console.log(listItems.value[0].clientHeight);
});
</script>

<template>
  <h1 class="header" mb-2 font-600>Blogs</h1>
  <div flex="~ col" space="y-2" container="~" m="t-8 x-auto">
    <ul>
      <li
        v-for="(y, i) in years"
        :ref="(el) => listItems.push(el as HTMLLIElement)"
        :key="`blog-${y}`"
        pos="relative"
        pt-8
        pb-8
      >
        <div pos="absolute top-0">
          <div inline-flex items-center space-x-2 text-3xl>
            <span w-2 h-2 rounded-full bg="#ddd" /><span font-800>{{ y }}</span>
          </div>
          <div
            w="0.25"
            :style="`height: calc(${listHeights[i]}px - 4em)`"
            bg="#ddd"
            pos="absolute top-5 left-0.8"
          />
        </div>
        <template v-for="blog in blogs[y]" :key="`blog-page-${blog.title}`">
          <div
            class="group"
            px="4"
            py-3
            cursor="pointer"
            text="#aaa"
            @click="router.push(blog.path)"
          >
            <div
              font="500"
              text="lg"
              group-hover:text="#ddd"
              transition="all duration-150"
            >
              {{ blog.title }}
            </div>
            <div
              font="300"
              text="sm"
              group-hover:text="#ddd"
              transition="all duration-150"
            >
              {{ blog.date.format("D MMM YYYY") || "??" }}
              •
              {{ blog.duration || "??" }} min
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
