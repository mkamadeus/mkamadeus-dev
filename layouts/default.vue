<template>
  <main font="antialiased" min-h="screen" pos="relative" text="white">
    <nav-header z-10 />
    <div mx-auto container>
      <div flex="~" items-center justify-center p="3vh lg:6vh">
        <slot />
      </div>
    </div>
    <nav-footer />
  </main>
</template>
