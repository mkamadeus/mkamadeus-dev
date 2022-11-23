<template>
  <div
    font="body antialiased"
    min-h="screen"
    pos="relative"
    class="not-prose"
    text="white"
  >
    <main flex="~" justify-center items-center p="3vh lg:6vh" min-h="90vh">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route" />
        </transition>
      </router-view>
    </main>
    <NavFooter />
  </div>
</template>
