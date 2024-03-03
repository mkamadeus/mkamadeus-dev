<script setup lang="ts">
const contacts = [
  {
    icon: 'i-carbon-email',
    contact: 'me@mkamadeus.dev',
    href: 'mailto:me@mkamadeus.dev'
  },
  {
    icon: 'i-carbon-phone',
    contact: '+62 811-1229-090',
    href: 'https://wa.me/628111229090'
  },
  {
    icon: 'i-carbon-logo-instagram',
    contact: 'mk.amadeus',
    href: 'https://www.instagram.com/mk.amadeus/'
  }
]

const { $gsap } = useNuxtApp()

const title = ref<HTMLElement>()
const contactEntries = ref<HTMLElement[]>()

let ctx: gsap.Context
onMounted(() => {
  const items = contactEntries.value!
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(title.value!, { autoAlpha: 0 })
    tl.set(items, { autoAlpha: 0 })

    tl.fromTo(title.value!, { yPercent: 105 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.fromTo(items, { yPercent: 105 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, stagger: 0.15 })

    tl.play()
  })
})

onUnmounted(() => {
  ctx.kill()
})
</script>

<template>
  <div flex="~ col" justify="center" items-center h="80vh lg:70vh" w="full">
    <h1 ref="title" class="header" mb-4 animated="~ fade-in-up ease-in-out delay-500">
      {{ $t("contacts.title") }}
    </h1>
    <div flex="~ col" items-center>
      <div v-for="(c, i) in contacts" ref="contactEntries" :key="`contact-${i}`" flex="~" space="x-2">
        <NuxtLink
          class="link"
          :href="c.href"
          inline-flex
          items-center
          space-x-2
          target="_blank"
          animated="~ fade-in-up ease-in-out"
          :style="`animation-delay:${1000 + 300 * i}ms`"
        >
          <div :class="c.icon" inline-block />
          <span>{{ c.contact }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
