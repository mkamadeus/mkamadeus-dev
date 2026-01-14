<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

const projects = [
  {
    icon: 'i-carbon-search',
    title: 'Geprek NIM Finder',
    description: 'Student ID finder for ITB students. Static site with no backend.',
    stacks: [
      'react',
      'vite',
      'tailwind',
      'cloudflare-pages',
    ],
    url: 'https://geprek.mkamadeus.dev',
  },
  {
    icon: 'i-carbon-bot',
    title: 'NIC Scraper',
    description: '(Legally) scrape university students\' data to be fed into Geprek',
    stacks: [
      'go',
      'http-request',
    ],
    url: 'https://github.com/mkamadeus/nicscraper',
  },
  {
    icon: 'i-carbon-idea',
    title: 'Arkalogica Monopoly',
    description: 'Simple monopoly-like game based on websockets.',
    stacks: [
      'react',
      'typescript',
      'expressjs',
      'socketio',
    ],
    url: [
      'https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend',
      'https://github.com/arkavidia-hmif/arkavidia-monopoly-backend',
    ],
  },
  {
    icon: 'i-carbon-network-overlay',
    title: 'mTLS Demo',
    description: 'Simple demo on Mutual TLS in multiple scenarios.',
    stacks: [
      'go',
      'openssl',
    ],
    url: 'https://github.com/mkamadeus/mtls-demo',
  },
  {
    icon: 'i-carbon-application-web',
    title: 'SIY Academic System',
    description: 'Fullstack system for managing and calculating score for use in FTMD ITB',
    stacks: [
      'typescript',
      'fastify',
      'prisma',
      'postgresql',
      'react',
      'nextjs',
      'docker',
    ],
    isPrivate: true,
  },
  {
    icon: 'i-carbon-qr-code',
    title: 'Simple RSVP System',
    description: 'Makeshift QR code based RSVP system mainly relying on Google Suite',
    stacks: [
      'google-sheets',
      'app-script',
      'vue',
    ],
    isPrivate: true,
  },
  {
    icon: 'i-carbon-bot',
    title: 'Automatic Presence Worker',
    description: 'University presence automated for the pandemic.',
    stacks: [
      'docker',
      'python',
      'selenium',
      'http-request',
    ],
    isPrivate: true,
  },
  {
    icon: 'i-carbon-cognitive',
    title: 'Myx: ML Experiment to Service',
    description: 'Final project and been made a thesis report for graduation.',
    stacks: [
      'go',
      'python',
      'fastapi',
      'mlops',
    ],
    url: [
      'https://github.com/mkamadeus/myx',
      'https://report.mkamadeus.dev/',
    ],
  },
]

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
          inline-block
          opacity-0
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
          {{ $t('projects.subtitle') }}
        </span>
        <span ref="subtitleContact">
          <NuxtLink
            class="link text-#ddd"
            :to="localePath('/contacts')"
          >
            {{
              $t('projects.contact_me') }}
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
