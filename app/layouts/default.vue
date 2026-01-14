<template>
  <main
    font="body antialiased"
    min-h="screen"
    pos="relative"
    text="white"
  >
    <NavigationHeader relative />
    <div

      container
      mx-auto
    >
      <div
        flex="~"
        items-center
        justify-center
      >
        <slot />
      </div>
    </div>
    <NavigationFooter />
  </main>
</template>
