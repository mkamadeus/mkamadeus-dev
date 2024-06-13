<template>
  <main font="body antialiased" min-h="screen" pos="relative" text="white">
    <NavigationHeader relative />
    <div mx-auto container>
      <div flex="~" items-center justify-center>
        <slot />
      </div>
    </div>
    <NavigationFooter />
  </main>
</template>
