<template>
  <div font="body antialiased" text="gray-100 sm" h="screen" pos="relative">
    <main p="6 lg:12" h="90%">
      <router-view />
    </main>
    <NavFooter />
  </div>
  <div pos="absolute top-0 left-0" bg-black w-screen h-screen z="-15" />
  <dot-sphere pos="absolute top-0 left-0" z="-10" />
</template>
