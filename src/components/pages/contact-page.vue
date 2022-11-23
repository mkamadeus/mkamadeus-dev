<script setup lang="ts">
type Props = {
  contacts: {
    icon: string;
    contact: string;
    href: string;
  }[];
};

const props = defineProps<Props>();
const contacts = props.contacts;
// import contacts from "~/constants/contact";
</script>

<template>
  <div flex="~ col" justify="center" h="78vh lg:66vh" w="full">
    <chroma-header text="contact" />
    <div flex="~ col">
      <div
        v-for="(c, i) in contacts"
        :key="`contact-${i}`"
        flex="~"
        space="x-2"
      >
        <div flex="~ col" justify="center">
          <div :class="c.icon" text="gray-100 lg" />
        </div>
        <a :href="c.href" target="_blank" w="full" underline="hover:~ dotted">{{
          c.contact
        }}</a>
      </div>
    </div>
  </div>
</template>
