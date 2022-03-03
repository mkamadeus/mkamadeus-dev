<script setup lang="ts">
import projects from "~/constants/project";
import socialMedias from "~/constants/socialmedia";
</script>

<template>
  <div
    font="body antialiased"
    bg="black"
    text="gray-100 sm"
    p="6 lg:12"
    h="screen"
  >
    <div flex="~ col" justify="center" h="90%">
      <div m="b-6">
        <chroma-header text="welcome." />
        <div text="sm lg:base">mkamadeus' site.</div>
        <div text="sm lg:base">get in touch with me.</div>
      </div>
    </div>
    <div h="10%">
      <div flex="~" justify="center items-center" space="x-2" m="b-2">
        <template v-for="l in socialMedias" :key="l.url">
          <a :class="l.icon" class="text-2xl" opacity="75" :href="l.url" />
          <!-- <home-button opacity="75" :url="l.url">
            <span>{{ l.title }}</span>
          </home-button> -->
        </template>
      </div>
      <div flex="~" space="x-4" justify="center items-center">
        <template v-for="l in ['#blog', '#projects', '#contact']" :key="l.url">
          <div flex="~ col" justify="center">
            <div underline="~ dotted gray-100" text="center middle">
              {{ l }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
