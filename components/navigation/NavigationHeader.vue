<script setup lang="ts">
const { t } = useI18n()

const routes = computed(() => [
  {
    icon: 'i-carbon-home',
    title: t('navbar.home'),
    path: '/'
  },
  {
    icon: 'i-carbon-idea',
    title: t('navbar.projects'),
    path: '/projects'
  },
  {
    icon: 'i-carbon-blog',
    title: t('navbar.blogs'),
    path: '/blogs'
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

const localePath = useLocalePath()
const route = useRoute()

// const navigationDots = ref<HTMLDivElement[]>([])

// const { $gsap } = useNuxtApp()

// let ctx: gsap.Context
// const timelines: gsap.core.Tween[] = []

// onMounted(() => {
//   ctx = $gsap.context(() => {
//     for (let i = 0; i < navigationDots.value.length; i++) {
//       const dot = navigationDots.value[i]
//       // const dotTimeline = $gsap.timeline({ defaults: { ease: 'power3.inOut' } })
//       $gsap.set(dot, { autoAlpha: 0 })
//       const dotTween = $gsap.fromTo(dot, { yPercent: 0, scale: 0, opacity: 0 }, { yPercent: 80, duration: 0.75, autoAlpha: 1, opacity: 1, scale: 1, paused: true, ease: 'elastic.inOut(0.5, 0.15)' })
//       timelines.push(dotTween)
//     }

//     const currentIndex = routes.value.findIndex(r => r.path === route.path)
//     if (currentIndex === -1) { return }

//     timelines[currentIndex].play()
//   })

//   onUnmounted(() => {
//     ctx.kill()
//   })

//   watch(() => route.path, (oldRoute, newRoute) => {
//     // TODO: fix on route not found
//     const oldIndex = routes.value.findIndex(r => r.path === oldRoute)
//     const newIndex = routes.value.findIndex(r => r.path === newRoute)

//     if (oldIndex !== -1) {
//       const oldTimeline = timelines[oldIndex]
//       oldTimeline.play()
//     }

//     if (newIndex !== -1) {
//       const newTimeline = timelines[newIndex]
//       newTimeline.reverse()
//     }
//   })
// })
</script>

<template>
  <NavigationMenuRoot p="3vh lg:6vh" z-10 w-full>
    <NavigationMenuList
      flex
      items-center
      justify-end
      w="full"
      space-x="2 md:3"
    >
      <div
        flex="~"
        items-center
        justify-end
        space-x="2 md:3"
      >
        <NavigationMenuItem v-for="l in routes" :key="l.path">
          <NavigationMenuTrigger as-child>
            <NuxtLink
              :aria-label="l.title"
              :class="[localePath(route.path) === localePath(l.path) ? 'text-#fff' : 'text-#888']"
              class="text-#888 hover:text-#fff"
              transition="all duration-150"
              block
              :to="localePath(l.path)"
            >
              <div :class="l.icon" text-2xl md:hidden />
              <span lt-md:hidden>{{ l.title }}</span>
            </NuxtLink>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuIndicator
          class="top-7 z-[1] flex items-end justify-center overflow-hidden transition-all duration-100 data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in !animate-duration-100 data-[state=hidden]:opacity-0"
        >
          <div
            class="i-carbon-caret-up"
            inline-block
            text="#888 lg"
            rounded-full
          />
        </NavigationMenuIndicator>
        <Separator orientation="vertical" />
      </div>
      <div
        flex="~"
        items-center
        justify-end
        space-x="2 md:3"
        lt-md:hidden
      >
        <NavigationMenuItem v-for="l in socialMedias" :key="l.url">
          <NavigationMenuLink
            :aria-label="l.title"
            class="text-2xl text-#888 hover:text-#fff"
            transition="all duration-150"
            target="_blank"
            :to="l.url"
            external
            block
          >
            <div :class="l.icon" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <Separator orientation="vertical" />
      </div>
      <div
        flex="~"
        items-center
        justify-end
        space-x="2 md:3"
      >
        <NavigationMenuItem>
          <NavigationLanguageDropdown />
        </NavigationMenuItem>
      </div>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
