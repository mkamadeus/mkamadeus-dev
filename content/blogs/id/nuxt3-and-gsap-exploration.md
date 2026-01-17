---
blog: true
title: Eksplorasi Nuxt 3 dan GSAP
description: Eksplorasi saya menggunakan Nuxt 3 dan GSAP untuk animasi di situs saya.
author: mkamadeus
date: 2024-03-03
duration: 3
---

::TableOfContents
::

Saya telah menggunakan Nuxt 3 untuk sementara waktu sekarang, dan saya telah mengeksplorasi berbagai cara untuk menganimasikan situs saya.
Sebelumnya saya menggunakan animasi dan transisi CSS, tapi itu tidak benar-benar scalable dan maintainable.

Saya ingat bahwa GSAP dikenal karena penggunaannya di seluruh web untuk animasi (bahkan untuk perusahaan besar seperti Google dan Apple).
Karena saya memiliki waktu luang untuk menguji, saya mencoba mengintegrasikan GSAP dengan Nuxt 3, framework utama yang telah saya gunakan untuk proyek website saya.
Saya memutuskan untuk mencobanya dan melihat bagaimana hasilnya dengan Nuxt 3.

## Menginstal GSAP

Proses instalasi cukup mudah.
Tidak berbeda dengan menginstal package lain di Nuxt 3.
Tergantung pada package manager Anda, perintah di bawah ini mungkin berbeda.

```bash
pnpm add -D gsap
```

## Mengintegrasikan GSAP dengan Nuxt 3

> TL;DR: Saya membuat plugin untuk menginisialisasi GSAP dan membuatnya tersedia secara global.

Secara teoritis, GSAP dapat digunakan langsung di komponen dengan mengimpornya seperti di bawah ini di setiap komponen yang menggunakannya:

```ts
import { gsap } from 'gsap';
```

Membaca dokumentasi GSAP, saya menemukan bahwa GSAP memiliki beberapa plugin yang powerful yang dapat digunakan untuk membuat animasi yang kompleks.
Berdasarkan dokumentasi, itu harus diinstansiasi sekali sebelum menggunakannya di seluruh animasi.
Oleh karena itu, saya memilih untuk menggunakan sistem plugin Nuxt 3 (di bawah `plugins/`) sebagai gantinya seperti yang juga disarankan di salah satu forum GSAP.
Dengan cara itu, instance GSAP dapat dibuat tersedia secara global di seluruh aplikasi dan jelas plugin GSAP mana yang digunakan.

Saya membuat file baru di direktori `plugins`, menamakannya `gsap.ts` dan menambahkan kode berikut:

```ts
import { gsap } from 'gsap'

// import plugin Anda di sini
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'

export default defineNuxtPlugin(() => {

  // daftarkan plugin
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

> Secara teoritis, saya juga bisa menggunakan `gsap.client.ts` sebagai gantinya karena GSAP hanya dimuat dan digunakan ketika elemen DOM siap untuk dimanipulasi.

## Menggunakan GSAP di Nuxt 3

Setelah plugin dibuat, saya sekarang bisa menggunakan GSAP di komponen saya.
Hal yang bagus tentang sistem plugin Nuxt adalah saya bisa merujuk ke instance GSAP secara langsung tanpa mengimpornya di setiap komponen.
Di bawah tag `script` di komponen, saya bisa menggunakan GSAP seperti di bawah ini:

```ts
const { $gsap } = useNuxtApp()
```

`$gsap` di sini disediakan oleh plugin sebelumnya yang saya buat.
Saya kemudian bisa menggunakan `$gsap` untuk membuat animasi di komponen.

Melihat lagi dokumentasi GSAP, saya menemukan bahwa GSAP memiliki `gsap.Context` yang harus digunakan karena itu adalah praktik terbaik untuk mengontrol lifecycle animasi di komponen.
Tepat setelah komponen di-unmount dari DOM, animasi harus dibersihkan untuk mencegah memory leak.
Dengan menggunakan `gsap.Context`, ini dapat ditangani dengan mudah dengan memanggil metode `kill()`.

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

Berikut adalah versi yang disederhanakan dari semua yang telah saya lakukan:

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

## Kesimpulan

Saya telah menggunakan GSAP untuk sementara waktu sekarang dan saya bisa mengatakan bahwa itu adalah alat yang bagus untuk membuat animasi.
Di situs ini, saya menggunakan GSAP untuk mengurutkan animasi sederhana untuk menganimasikan entri teks ke halaman.
Semoga di masa depan, saya bisa mengeksplorasi animasi yang lebih kompleks dan menggunakan lebih banyak plugin GSAP untuk membuat animasi yang lebih kompleks terutama dalam proyek yang lebih besar dan ruang 3D 🚀