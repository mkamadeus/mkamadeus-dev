<script setup lang="ts">
const handleError = () => clearError({ redirect: '/' })
const error = useError()
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator bg="green" />
    <div
      flex="~ col"
      justify="center"
      items-center
      h="80vh lg:70vh"
      w="full"
      text="gray-100 sm lg:lg"
      p="3vh lg:6vh"
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
