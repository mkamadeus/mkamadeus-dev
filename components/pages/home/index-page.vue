<script setup lang="ts">
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
  <div
    flex="~ col"
    justify="center"
    items-center
    h="78vh lg:66vh"
    w="full"
    text="gray-100 sm lg:lg"
  >
    <div m="b-6">
      <h1 class="header" text-center mb="2 lg:4">
        mkamadeus
      </h1>
      <div text="center sm lg:lg #888">
        {{ $t('home.job_title') }}
        <a class="link" href="https://www.linkedin.com/company/xendit/">@Xendit</a>
      </div>
      <div text="center sm lg:lg #888">
        {{ $t('home.school_title') }}
        <a class="link" href="https://www.linkedin.com/company/xendit/">@ITB</a>
      </div>
      <div
        mt-2
        w-full
        flex
        justify-center
        md:hidden
        space-x-2
      >
        <template v-for="l in socialMedias" :key="l.url">
          <a
            :aria-label="l.title"
            class="text-2xl text-#888 hover:text-#fff"
            :class="l.icon"
            col-span-1
            transition="all duration-150"
            target="_blank"
            :href="l.url"
          />
        </template>
      </div>
    </div>
  </div>
</template>
