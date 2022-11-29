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
  <div flex="~ col" justify="center" items-center h="78vh lg:66vh" w="full">
    <h1 class="header" mb-2>Contacts</h1>
    <div flex="~ col" items-center>
      <div
        v-for="(c, i) in contacts"
        :key="`contact-${i}`"
        flex="~"
        space="x-2"
      >
        <a
          class="link"
          :href="c.href"
          inline-flex
          space-x-2
          items-center
          target="_blank"
        >
          <div :class="c.icon" inline-block />
          <span>{{ c.contact }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
