<template>
  <main font="body antialiased" min-h="screen" pos="relative">
    <NavigationHeader absolute />
    <article>
      <slot />
    </article>
    <NavigationFooter />
  </main>
</template>
