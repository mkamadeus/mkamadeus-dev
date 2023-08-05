<template>
  <main font="antialiased" min-h="screen" pos="relative" text="white">
    <nav-header z-10 />
    <div container mx-auto>
      <div flex="~" justify-center items-center p="3vh lg:6vh">
        <slot />
      </div>
    </div>
    <nav-footer />
  </main>
</template>
