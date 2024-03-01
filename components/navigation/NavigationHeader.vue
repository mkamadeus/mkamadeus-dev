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

const localePath = useLocalePath()
const route = useRoute()

const navigationDots = ref<HTMLDivElement[]>([])

const { $gsap } = useNuxtApp()

let ctx: gsap.Context
const timelines: gsap.core.Tween[] = []

onMounted(() => {
  ctx = $gsap.context(() => {
    for (let i = 0; i < navigationDots.value.length; i++) {
      const dot = navigationDots.value[i]
      // const dotTimeline = $gsap.timeline({ defaults: { ease: 'power3.inOut' } })
      $gsap.set(dot, { autoAlpha: 0 })
      const dotTween = $gsap.fromTo(dot, { yPercent: 0, scale: 0, opacity: 0 }, { yPercent: 80, duration: 0.75, autoAlpha: 1, opacity: 1, scale: 1, paused: true, ease: 'elastic.inOut(0.5, 0.15)' })
      timelines.push(dotTween)
    }

    const currentIndex = routes.value.findIndex(r => r.path === route.path)
    if (currentIndex === -1) { return }

    timelines[currentIndex].play()
  })

  onUnmounted(() => {
    ctx.kill()
  })

  watch(() => route.path, (oldRoute, newRoute) => {
    // TODO: fix on route not found
    const oldIndex = routes.value.findIndex(r => r.path === oldRoute)
    const newIndex = routes.value.findIndex(r => r.path === newRoute)

    if (oldIndex !== -1) {
      const oldTimeline = timelines[oldIndex]
      oldTimeline.play()
    }

    if (newIndex !== -1) {
      const newTimeline = timelines[newIndex]
      newTimeline.reverse()
    }
  })
})
</script>

<template>
  <NavigationMenuRoot p="3vh lg:6vh" z-10 w-full>
    <NavigationMenuList
      flex="~"
      items-center
      justify-end
      space-x="2 md:3"
      w="full"
    >
      <!-- SM NAV -->
      <NavigationMenuItem v-for="l in routes" :key="l.path">
        <NavigationMenuLink pos="relative" z-20>
          <NuxtLink
            :aria-label="l.title"
            :class="[localePath(route.path) === localePath(l.path) ? 'text-#fff' : 'text-#888']"
            class="hover:text-#fff"
            transition="all duration-150"
            pos="relative"
            z="20"
            p-1
            :to="localePath(l.path)"
          >
            <div :class="l.icon" inline-block text-2xl md:hidden />
            <span lt-md:hidden>{{ l.title }}</span>
          </NuxtLink>
          <div
            ref="navigationDots"
            pos="absolute left-0 right-0 bottom-0"
            z="15"

            h-full
            w-full
            flex
            items-center
            justify-center
            opacity-0
          >
            <div
              class="i-carbon-caret-up"
              inline-block
              text="#888 lg"
              rounded-full
            />
          </div>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem v-for="l in socialMedias" :key="l.url" display="lt-md:hidden">
        <NavigationMenuLink>
          <NuxtLink
            :aria-label="l.title"
            class="text-2xl text-#888 hover:text-#fff"
            transition="all duration-150"
            block
            p-1
            target="_blank"
            :to="l.url"
          >
            <div :class="l.icon" />
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationLanguageDropdown />
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
