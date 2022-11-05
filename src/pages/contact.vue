<script setup lang="ts">
import contacts from "~/constants/contact";
</script>

<template>
  <div
    flex="~ col"
    justify="center"
    h="90%"
    w="full"
  >
    <chroma-header text="contact" />
    <div flex="~ col">
      <div
        v-for="(c, i) in contacts"
        :key="`contact-${i}`"
        flex="~"
        space="x-2"
      >
        <div
          flex="~ col"
          justify="center"
        >
          <div
            :class="c.icon"
            text="gray-100 lg"
          />
        </div>
        <a
          :href="c.href"
          target="_blank"
          w="full"
          underline="hover:~ dotted"
        >{{
          c.contact
        }}</a>
      </div>
    </div>
  </div>
</template>
