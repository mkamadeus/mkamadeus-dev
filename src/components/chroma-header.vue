<script setup lang="ts">
type Props = {
  text: string;
};
defineProps<Props>();
const colors = ["text-#FFF"];
</script>

<template>
  <div
    class="group"
    w="max"
    pos="relative"
    mb="3"
    cursor="pointer"
  >
    <h1
      font="header semibold"
      text="4xl lg:9xl white"
      opacity="0"
    >
      {{ text }}
    </h1>
    <template
      v-for="(c, k) in colors"
      :key="`chroma-${k}`"
    >
      <h1
        font="header semibold"
        text="4xl lg:9xl"
        :class="c"
        pos="absolute top-0 left-0"
        cursor="pointer"
        select="none"
      >
        <template
          v-for="(t, i) in [...text]"
          :key="`chroma-${k}-letter-${i}`"
        >
          <span
            pos="relative top-0 left-0"
            :group-hover="i % 2 === 0 ? '-top-1' : 'top-1'"
            transition="all ease-out duration-600"
            :style="`transition-delay: ${i * 50}ms`"
          >{{ t }}</span>
        </template>
      </h1>
    </template>
  </div>
</template>
