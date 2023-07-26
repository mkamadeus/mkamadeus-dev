<template>
  <main font="antialiased 300" min-h="screen" pos="relative" class="not-prose" text="white">

    <nav-header />
    <div container mx-auto>
      <div flex="~" justify-center items-center p="3vh lg:6vh">
        <slot />
      </div>
    </div>
    <nav-footer />
  </main>
</template>
