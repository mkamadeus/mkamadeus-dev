<script setup lang="ts">
const { t } = useI18n()

const projects = await useProjects()

const localePath = useLocalePath()
const wrapper = ref<HTMLElement>()
const title = ref<HTMLElement>()
const subtitle = ref<HTMLElement>()
const subtitleContact = ref<HTMLElement>()

const { $gsap } = useNuxtApp()

let ctx: gsap.Context
onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(title.value!, { autoAlpha: 1 })
    tl.set(subtitle.value!, { autoAlpha: 1 })
    tl.set(subtitleContact.value!, { autoAlpha: 1 })

    tl.fromTo(title.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.fromTo(subtitle.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 0.3 })
    tl.fromTo(subtitleContact.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 0.3 })

    tl.play()
  }, wrapper.value!)
})

onUnmounted(() => {
  ctx.kill()
})

// defineOgImage({
//   component: 'Default'
// })
</script>

<template>
  <div
    ref="wrapper"
    flex="~ col"
    w-full
    justify-center
    m="lg:x-8"
    px="3vh lg:6vh"
  >
    <div m="b-8 lg:b-16">
      <h1
        class="header"
        font="800"
        overflow-hidden
        pb="2 lg:4"
      >
        <span
          ref="title"

          opacity-0
          inline-block
        >
          {{ t('projects.title') }}
        </span>
      </h1>
      <div
        text="#999"
        flex
        overflow-hidden
        space-x-1
      >
        <span ref="subtitle">
          {{ t('projects.subtitle') }}
        </span>
        <span ref="subtitleContact">
          <NuxtLink
            class="link text-#ddd"
            :to="localePath('/contacts')"
          >
            {{ t('projects.contact_me') }}
          </NuxtLink>
        </span>
      </div>
    </div>
    <div
      flex="~ col"
      space="y-8 lg:y-10"
      container="~"
      m="x-auto"
    >
      <template
        v-for="(p, i) in projects"
        :key="`project-${i}`"
      >
        <ProjectCard
          animated="~ fade-in-up ease-in-out"
          :style="`animation-delay: ${1500 + 100 * i}ms`"
          :icon="p.icon"
          :description="p.description"
          :title="p.title"
          :stacks="p.stacks"
          :url="p.url"
        />
      </template>
    </div>
  </div>
</template>
