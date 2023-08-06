<script setup lang="ts">
const handleError = () => clearError({ redirect: '/' })
const error = useError()
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator bg="green" />
    <div
      font="body antialiased"
      flex="~ col"
      h-screen
      items-center
      justify-center
      text-gray-100
    >
      <div text="xl lg:4xl center" font="sans bold" mb-2>
        Whoops.
      </div>
      <div text="sm lg:base center" mb-4>
        {{ error?.message || 'Something went wrong.' }}
      </div>
      <button font-mono text="gray-500 lg lg:xl" underline @click="handleError">
        cd ~/
      </button>
    </div>
  </NuxtLayout>
</template>
