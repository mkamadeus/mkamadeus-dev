<template>
  <main
    font="antialiased 300"
    min-h="screen"
    pos="relative"
    class="not-prose"
    text="white"
  >
    <NavHeader />
    <div flex="~" justify-center items-center p="3vh lg:6vh" min-h="84vh">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route" />
        </transition>
      </router-view>
    </div>
    <div p="3vh">
      <NavFooter />
    </div>
  </main>
</template>
