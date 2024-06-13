---
blog: true
title: Nuxt 3 and GSAP Exploration
description: My explorations on using Nuxt 3 and GSAP for animations in my sites.
author: mkamadeus
date: 2024-03-03
duration: 3
---

::TableOfContents
::

I have been using Nuxt 3 for a while now, and I have been exploring different ways to animate my sites.
Previously I utilized CSS animations and transitions, but it wasn't really scalable and maintainable.

I recalled that GSAP is known for its usage across the web for animations (even for big companies like Google and Apple).
Since I have some spare time to test, I tried to integrate GSAP with Nuxt 3, the main framework that I have been using for my website projects.
I decided to give it a try and see how it goes with Nuxt 3.

## Installing GSAP

The installation process is pretty straightforward.
It's no different from installing any other package in Nuxt 3.
Depending on your package manager, the below command might differ.

```bash
pnpm add -D gsap
```

## Integrating GSAP with Nuxt 3

> TL;DR: I created a plugin to initialize GSAP and made it available globally.

Theoretically, GSAP can be used directly in the component by importing it as below in every component that uses it:

```ts
import { gsap } from 'gsap';
```

Reading along the GSAP documentation, I found out that GSAP has some powerful plugins that can be used to create complex animations.
Based on the documentation, it should be instantiated once before using it across animations.
Hence, I opted in to use the Nuxt 3 plugin system (under `plugins/`) instead as also suggested in one of the GSAP forums.
That way, the GSAP instance can be made available globally across the application and it's clear on which GSAP plugins are used.

I created a new file in the `plugins` directory, named it `gsap.ts` and added the following code:

```ts
import { gsap } from 'gsap'

// import your plugins here
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'

export default defineNuxtPlugin(() => {

  // register the plugins
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CSSPlugin)

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
```

> Theoretically, I can also use `gsap.client.ts` instead since GSAP is only loaded and used when DOM elements are ready to be manipulated.

## Using GSAP in Nuxt 3

After the plugin is created, I can now use GSAP in my components.
The great thing about Nuxt's plugin system is that I can refer to the GSAP instance directly without importing it in every component.
Under `script` tag in the component, I can use GSAP as below:

```ts
const { $gsap } = useNuxtApp()
```

`$gsap` here is provided by the previous plugin that I created.
I can then use `$gsap` to create animations in the component.

Looking again at the GSAP documentations, I found out that GSAP has `gsap.Context` that should be used as it is the best practice to control the lifecycle of animations in the component.
Just after component is unmounted from DOM, the animations should be cleaned up to prevent memory leaks.
By using `gsap.Context`, these can be handled easily by calling the `kill()` method.

```ts
let ctx: gsap.Context

onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(element.value!, { autoAlpha: 1 })
    tl.fromTo(element.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.play()
  }, wrapper.value!)
})

onUnmounted(() => {
  ctx.kill()
})
```

Here's the simplified version of everything that I have done:

```vue
<script setup lang="ts">
const element = ref()
const { $gsap } = useNuxtApp()

let ctx: gsap.Context

onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(element.value!, { autoAlpha: 1 })
    tl.fromTo(element.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.play()
  }, wrapper.value!)
})

onUnmounted(() => {
  ctx.kill()
})
</script>

<template>
  <div>
    <div ref="element">
      Lorem Ipsum Dolor Sit Amet
    </div>
  </div>
</template>
```

## Conclusion

I have been using GSAP for a while now and I can say that it's a great tool for creating animations.
In this site, I utilized GSAP to sequence simple animations for animating text entries into the page.
Hopefully in the future, I can explore more complex animations and utilize more GSAP plugins to create more complex animations especially in larger projects and the 3D space 🚀


