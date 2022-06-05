<script setup lang="ts">
type Props = {
  text: string;
};
defineProps<Props>();
const colors = ["text-#F00", "text-#0F0", "text-#00F"];
</script>

<template>
  <div class="group" w="max" pos="relative" mb="3" cursor="pointer">
    <h1 font="header semibold" text="4xl lg:9xl white" opacity="0">
      {{ text }}
    </h1>
    <template v-for="(c, k) in colors">
      <h1
        font="header semibold"
        text="4xl lg:9xl"
        :class="c"
        mix-blend="exclusion"
        pos="absolute top-0 left-0"
        cursor="pointer"
        select="none"
      >
        <template v-for="(t, i) in [...text]">
          <span
            pos="relative top-0 left-0"
            mix-blend="difference"
            :group-hover:pos="`${k == 0 || k == 1 ? 'top-2' : 'top-0'} ${
              k == 1 || k == 2 ? 'left-2' : 'left-0'
            }`"
            transition="all ease-out duration-600"
            :style="`transition-delay: ${i * 50}ms`"
            >{{ t }}</span
          >
        </template>
      </h1>
    </template>
  </div>
</template>
