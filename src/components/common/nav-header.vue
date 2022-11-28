<script setup lang="ts">
const routes = [
  {
    icon: "i-carbon-home",
    title: "Home",
    path: "/",
  },
  {
    icon: "i-carbon-blog",
    title: "Blogs",
    path: "/blog",
  },
  {
    icon: "i-carbon-idea",
    title: "Projects",
    path: "/projects",
  },
  {
    icon: "i-carbon-user",
    title: "Contacts",
    path: "/contact",
  },
];

const socialMedias = [
  {
    icon: "i-carbon-logo-github",
    title: "github",
    url: "https://github.com/mkamadeus",
  },
  {
    icon: "i-carbon-logo-linkedin",
    title: "linkedin",
    url: "https://www.linkedin.com/in/mkamadeus/",
  },
  {
    icon: "i-carbon-logo-instagram",
    title: "instagram",
    url: "https://www.instagram.com/mk.amadeus/",
  },
];
</script>

<template>
  <header p="3vh lg:6vh">
    <nav flex="~" space-x-4 justify-end w="full">
      <!-- SM NAV -->
      <template v-for="l in routes" :key="l.url">
        <router-link
          :class="l.icon"
          :aria-label="l.title"
          class="text-2xl text-#888 hover:text-#fff"
          md:hidden
          transition="all duration-150"
          :to="l.path"
        />
        <router-link
          :aria-label="l.title"
          class="text-#888 hover:text-#fff"
          lt-md:hidden
          transition="all duration-150"
          :to="l.path"
        >
          {{ l.title }}
        </router-link>
      </template>
      <template v-for="l in socialMedias" :key="l.url">
        <a
          :aria-label="l.title"
          class="text-2xl text-#888 hover:text-#fff"
          :class="l.icon"
          lt-md:hidden
          transition="all duration-150"
          target="_blank"
          :href="l.url"
        />
      </template>
    </nav>
  </header>
</template>
