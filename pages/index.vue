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
    h="80vh lg:70vh"
    w="full"
    text="gray-100 sm lg:lg"
    p="3vh lg:6vh"
  >
    <div m="b-6">
      <h1
        class="header"
        mb="2 lg:4"
        animated="~ fade-in-up ease-in-out delay-500"
        cursor-pointer
        select-none
        text-center
        tracking-tight
        transition-all
        duration-300
        ease-in-out
        hover:tracking-wider
      >
        mkamadeus
      </h1>
      <div text="center sm lg:lg #888" animated="~ fade-in-up ease-in-out delay-1000">
        {{ $t('home.job_title') }}
        <NuxtLink class="link" href="https://www.linkedin.com/company/xendit/">
          @Xendit
        </NuxtLink>
      </div>
      <div text="center sm lg:lg #888" animated="~ fade-in-up ease-in-out delay-1300">
        {{ $t('home.school_title') }}
        <NuxtLink class="link" href="https://itb.ac.id/">
          @ITB
        </NuxtLink>
      </div>
      <div
        mt-2
        w-full
        flex
        justify-center
        md:hidden
        space-x-2
        animated="~ fade-in-up ease-in-out delay-1600"
      >
        <template v-for="l in socialMedias" :key="l.url">
          <NuxtLink
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
