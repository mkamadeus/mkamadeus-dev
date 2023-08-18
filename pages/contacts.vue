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
</script>

<template>
  <div flex="~ col" justify="center" items-center h="78vh lg:66vh" w="full">
    <h1 class="header" mb-4 animated="~ fade-in-up ease-in-out delay-500">
      {{ $t("contacts.title") }}
    </h1>
    <div flex="~ col" items-center>
      <div v-for="(c, i) in contacts" :key="`contact-${i}`" flex="~" space="x-2">
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
