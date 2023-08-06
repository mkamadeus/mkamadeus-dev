<script setup lang="ts">
const { t } = useI18n()

const routes = computed(() => [
  {
    icon: 'i-carbon-home',
    title: t('navbar.home'),
    path: '/'
  },
  {
    icon: 'i-carbon-blog',
    title: t('navbar.blogs'),
    path: '/blogs'
  },
  {
    icon: 'i-carbon-idea',
    title: t('navbar.projects'),
    path: '/projects'
  },
  {
    icon: 'i-carbon-user',
    title: t('navbar.contacts'),
    path: '/contacts'
  }
])

const socialMedias = [
  {
    icon: 'i-carbon-logo-github',
    title: 'github',
    url: 'https://github.com/mkamadeus'
  },
  {
    icon: 'i-carbon-logo-linkedin',
    title: 'linkedin',
    url: 'https://www.linkedin.com/in/mkamadeus/'
  },
  {
    icon: 'i-carbon-logo-instagram',
    title: 'instagram',
    url: 'https://www.instagram.com/mk.amadeus/'
  }
]
</script>

<template>
  <header p="3vh lg:6vh" w-full>
    <nav flex="~" items-center justify-end space-x-4 w="full">
      <!-- SM NAV -->
      <template v-for="l in routes" :key="l.url">
        <a
          :class="l.icon"
          :aria-label="l.title"
          class="p-1 text-2xl text-#888 hover:text-#fff"
          md:hidden
          transition="all duration-150"
          :href="l.path"
        />
        <a
          :aria-label="l.title"
          class="text-#888 hover:text-#fff"
          transition="all duration-150"
          p-1
          lt-md:hidden
          :href="l.path"
        >
          {{ l.title }}
        </a>
      </template>
      <template v-for="l in socialMedias" :key="l.url">
        <a
          :aria-label="l.title"
          class="text-2xl text-#888 hover:text-#fff"
          :class="l.icon"
          transition="all duration-150"
          p-1
          lt-md:hidden
          target="_blank"
          :href="l.url"
        />
      </template>
      <LanguageDropdown />
    </nav>
  </header>
</template>
