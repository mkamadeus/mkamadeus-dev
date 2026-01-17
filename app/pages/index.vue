<script setup lang="ts">
const socialMedias = [
  {
    icon: 'i-carbon-logo-github',
    title: 'github',
    url: 'https://github.com/mkamadeus',
  },
  {
    icon: 'i-carbon-logo-linkedin',
    title: 'linkedin',
    url: 'https://www.linkedin.com/in/mkamadeus/',
  },
  {
    icon: 'i-carbon-logo-instagram',
    title: 'instagram',
    url: 'https://www.instagram.com/mk.amadeus/',
  },
]

// defineOgImage({
//   component: 'Default'
// })

const wrapper = ref<HTMLDivElement>()
const homeTitle = ref<HTMLDivElement>()
const jobSubtitle = ref<HTMLDivElement>()
const schoolSubtitle = ref<HTMLDivElement>()
const socialMediaIcons = ref<HTMLDivElement>()

const { $gsap } = useNuxtApp()

let ctx: gsap.Context
onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(homeTitle.value!, { autoAlpha: 1 })
    tl.set(jobSubtitle.value!, { autoAlpha: 1 })
    tl.set(schoolSubtitle.value!, { autoAlpha: 1 })

    tl.fromTo(homeTitle.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.fromTo(jobSubtitle.value!.querySelectorAll('span, a'), { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, stagger: 0.15 })
    tl.fromTo(schoolSubtitle.value!.querySelectorAll('span, a'), { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, stagger: 0.15 })

    tl.play()
  }, wrapper.value!)
})

onUnmounted(() => {
  ctx.kill()
})
</script>

<template>
  <div
    ref="wrapper"
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
        class="header lg:text-9xl"
        mb="2 lg:4"

        tracking-tight
        text-center
        cursor-pointer
        select-none
        transition-all
        duration-300
        ease-in-out
        overflow-hidden
        hover:tracking-wider
      >
        <span
          ref="homeTitle"

          opacity-0
          inline-block
        >
          mkamadeus
        </span>
      </h1>
      <div
        ref="jobSubtitle"

        text="center sm lg:lg #888"

        inline-flex
        w-full
        justify-center
        overflow-hidden
        space-x-1
      >
        <span

          opacity-0
          inline-block
        >
          {{ $t('home.job_title') }}
        </span>
        <a
          class="link"

          href="https://www.linkedin.com/company/xendit/"
          opacity-0
          inline-block
        >
          @Xendit
        </a>
      </div>
      <div
        ref="schoolSubtitle"
        text="center sm lg:lg #888"

        inline-flex
        w-full
        justify-center
        overflow-hidden
        space-x-1
      >
        <span

          opacity-0
          inline-block
        >
          {{ $t('home.school_title') }}
        </span>
        <a
          class="link"

          href="https://itb.ac.id/"
          opacity-0
          inline-block
        >
          @ITB
        </a>
      </div>
      <div

        mt-2
        flex
        w-full
        justify-center
        space-x-2
        md:hidden
      >
        <a
          v-for="l in socialMedias"
          ref="socialMediaIcons"
          :key="l.url"
          :aria-label="l.title"
          class="text-2xl text-#888 hover:text-#fff"
          :class="l.icon"
          col-span-1
          transition="all duration-150"
          target="_blank"
          :href="l.url"
        />
      </div>
    </div>
  </div>
</template>
