---
blog: true
title: "Vite & Vue 3: Pengalaman Saya"
description: Pemikiran saya ketika menggunakan Vite dan Vue 3 dengan menggunakannya sesekali.
author: mkamadeus
date: 2023-02-12
duration: 6
---

> Disclaimer: murni pendapat dan preferensi SAYA berdasarkan pengalaman saya menggunakan keduanya.

::TableOfContents
::

## Latar Belakang

Saya datang ke programming dan software engineering ketika pertama kali diperkenalkan dengan HTML dan CSS di sekolah menengah.
Tidak banyak, tapi itu adalah awal yang bagus untuk siswa sekolah menengah seperti saya.
Itulah mengapa front end development memiliki tempat khusus di hati saya meskipun saya tidak benar-benar melakukannya sesering itu ❤️

Ketika saya memasuki masa-masa sebagai mahasiswa sarjana, saya diperkenalkan dengan framework Javascript. Ada *BANYAK* dari mereka saat itu, tapi yang menarik perhatian saya adalah Vue dan React.
Saat itu, kami menggunakan Vue 2 dan Vuetify untuk membuat proyek berukuran sedang untuk acara yang kami adakan di universitas.
Saya belajar React sendiri, dan begitulah cara saya mempelajari kedua framework tersebut.

Memilih antara keduanya saat itu adalah kompetisi yang cukup ketat, tapi pada akhirnya saya memilih untuk menggunakan React.
React menang dalam kebanyakan kasus terutama dalam kematangan framework dan dokumentasi (karena didukung oleh korporasi).
Vue 2 ramah developer saat itu, tapi terkadang terasa canggung dan kurangnya dukungan terkadang bisa menjadi hambatan.

Dengan munculnya Vue 3 dan Vite, bagaimanapun; itu telah meningkat banyak dari apa yang dulu.
Saat ini, ketika memilih framework/library front end yang akan saya gunakan, saya akan menggunakan Vue 3 karena sudah matang.
Saya akan membahas dari sudut pandang saya tentang apa yang telah berubah dan mengapa saya memilih Vue 3 daripada React.

## Perbedaan

### State Management

Perdebatan lama tentang bagaimana kita harus mengelola state dalam framework Javascript frontend.
Sejujurnya, baik React maupun Vue memiliki kesamaan dalam aspek ini saja.
Yang tidak saya sukai tentang React adalah centralized store untuk state tidak bisa benar-benar dilakukan tanpa menggunakan Redux, yang tidak benar-benar saya nikmati menggunakannya.

Saya merasa Redux tidak begitu mudah digunakan.
Orang yang berbeda menggunakan metode yang berbeda untuk memanggil state dan memodifikasi state yang tidak semua orang setuju tentang apa yang merupakan praktik terbaik dan cara menggunakannya.
Saya mencoba menggunakan Redux Thunk dan itu menjadi aneh dan terkadang berlebihan untuk proyek kecil yang sebagian besar saya lakukan.
Untuk proyek yang lebih kecil saya cenderung menggunakan React Context, tapi itu juga memiliki beberapa masalah yang akan saya bagikan di bagian selanjutnya.

Di Vue bagaimanapun, jauh lebih jelas dan disepakati tentang bagaimana kita harus mengelola centralized store.
Sebelumnya di Vue 2, kebanyakan orang menggunakan Vuex dan sejauh yang saya ingat, itu tidak terasa secanggung Redux (meskipun ini mungkin masalah skill 😅).
Saat ini, orang mungkin menggunakan Pinia untuk proyek mereka.
Ini benar-benar sederhana dan mudah digunakan dan kita bisa mencolokkannya dengan mudah ke proyek Vue dan Vite.

### Typescript 

Ini adalah masalah lain di mana saya pikir React belum menangani dengan cukup baik.
React memang mendukung penggunaan Typescript, tapi saya merasa typing yang dibuat tidak benar-benar didefinisikan dengan cukup baik.
Typing buatan user untuk React terkadang tidak disepakati.

Misalnya, penggunaan `React.FC` dan tipe serupa terkadang diperdebatkan dengan self-inferring component.
Itu digunakan sebelum React 18, sekarang disarankan untuk membiarkan Typescript menyimpulkan tipe itu sendiri.
Lagi pula, secara umum disarankan untuk membiarkan Typescript menyimpulkan tipe untuk Anda, jadi saya tidak melihat mengapa ini diperkenalkan sejak awal.
Beberapa contoh orang tidak bisa sepakat tentang apa yang harus bagaimana kita menggunakan props dan mendefinisikan typing yang bisa saya temukan adalah:

- [Evidence 1](https://www.reddit.com/r/reactjs/comments/wjq51d/is_reactfc_not_recommended_what_are_other/)
- [Evidence 2](https://www.reddit.com/r/reactjs/comments/vx5qpa/is_fc_still_discouraged/)
- [Evidence 3](https://www.reddit.com/r/reactjs/comments/ys70t9/is_is_still_problematic_to_use_reactfc_if_our/)

> Catatan samping: beberapa dari ini hanya preferensi poster; saya tidak suka bagaimana React tidak mendokumentasikan ini dengan jelas.

Contoh lain dari ini adalah typing `React.Context`.
Ini tidak sekonsisten seperti `React.FC`, tapi typing yang disediakan tidak terlalu ...bagus.
Lagi, terkadang orang memiliki pendapat yang berbeda tentang menggunakan typing yang disediakan oleh React.
Orang terkadang membuat tipe mereka sendiri dan terkadang memiliki gaya yang berbeda hanya untuk membuat context sederhana.

### Plugin

> Bagian ini sebagian besar hanya mengapa Vite itu luar biasa! Saya melihat React dan Vue dalam posisi yang sama.

Plugin Vite sedang naik daun dalam beberapa tahun terakhir.
Dengan dukungan dari komunitas, banyak plugin dan framework dibangun di atas Vite.
Saya jarang melihat proyek React x Vite, jadi saya tidak benar-benar tahu bagaimana orang akan memanfaatkannya; dan saya percaya itu akan bekerja serupa dengan bagaimana itu bekerja dengan Vue.
Kelemahan menggunakan React bagaimanapun adalah tidak ada meta framework yang berjalan di bawah Vite.
Next.js, salah satu framework paling populer yang menggunakan React menggunakan Webpack 5 di bawah kap yang saya mengerti mengapa mereka tidak memilih untuk mengubahnya ke Vite.

### Readibility dan Maintainability

Lagi, ini bervariasi antara developer ke developer.
Codebase yang baik, terlepas dari framework yang mereka gunakan bisa mudah dibaca dan dipelihara.
Menggunakan React untuk beberapa waktu saya merasa seperti React bisa melakukan beberapa perbaikan untuk meningkatkan readibility.
Meskipun sepenuhnya dalam Javascript (atau JSX), bagaimana React memisahkan business logic dan UI logic terkadang bisa menjadi sulit dipahami.
Pelaku utama bagi saya di sini adalah `useEffect()` yang hanya salah satu hook React yang paling membingungkan.

Beberapa pola React yang tidak saya sukai termasuk yang di luar `useEffect()`:

> Ini bisa di-refactor tergantung pada orang dan proyek, tapi saya melihat ini cukup umum.

```jsx
const MyComponent = () => {
  if(condition1) {
    return <div>A</div>
  }

  if(condition2) {
    return <div>B</div>
  }

  // pendekatan berbeda jika nested
  return <div>
    ...
    {
      condition3
        ? <div>C</div>
        : <div>D</div>
    }
  </div>
}
```

```jsx
const MyComponent = () => {
  useEffect(() => {
    // lakukan A
  }, [depA])

  useEffect(() => {
    // lakukan B, tapi ini async
  }, [depB])
  
  useEffect(() => {
    // lakukan C, tapi ini async
  }, [depC, depD])

  ...
}
```

Sederhananya, `useEffect()` akan menjalankan callback ketika sesuatu pada dependency list telah berubah.
Berdasarkan namanya sendiri, hook ini untuk menangani side effect ketika sesuatu berubah.
Banyak orang menyalahgunakan `useEffect()` dan malah menjalankannya tanpa dependency list untuk memperbarui sesuatu ketika apa pun berubah pada komponen itu yang tidak dianggap praktik yang baik.
`useEffect` dibahas lebih lanjut di [blog post Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/) (orang keren).
Banyak aturan dan rekomendasi yang ditulis, yang bisa menakutkan.

Pandangan pribadi saya tentang ini adalah `useEffect()`, menggunakannya dengan benar atau salah bisa menyebabkan maintainability yang mengerikan terkadang.
Anda terkadang tidak akan menyadari bahwa sesuatu memperbarui, berubah, dan hook memicu (atau sebaliknya bahkan, itu tidak).
Saya mengerti bagaimana orang menikmati menggunakan React karena gaya penulisan kode yang tightly coupled antara UI logic dan business logic.
Secara pribadi, saya pikir itu membuat beberapa kode lebih sulit untuk dipelihara.

Di Vue, saya bisa memisahkan UI logic dan business logic dengan lebih baik.
Vue memiliki cara yang lebih baik untuk melakukan UI logic seperti conditional rendering dan list rendering dengan hal-hal seperti `v-if` dan `v-for`.
Di React Anda melakukan itu dalam Javascript yang mungkin tidak terlihat banyak tapi saya pikir pendekatan Vue (dan saya pikir framework lain juga seperti Svelte) untuk ini jauh lebih baik dan bersih untuk readibility.

Dengan diperkenalkannya `<script setup>`, hal-hal menjadi jauh lebih baik untuk dibaca dan dipahami.
Kita "set up" semua yang kita butuhkan di sana untuk business logic dan helper function yang mungkin kita butuhkan untuk UI dan cukup menggunakannya.
Saya telah mengkonversi proyek saya dari Vue dan React, dan itu jauh lebih mudah dibaca daripada ketika menggunakan React dan hooks.

### Styling

Ketika berbicara tentang library frontend, tidak bisa dihindari tentang bagaimana kita harus menata website kita.
Meskipun ini adalah zaman Tailwind-like, orang cenderung menggunakan organisasi styling mereka sendiri.
Vue pasti unggul dalam hal ini karena menyediakan kita dengan tag `<style>` khusus di dalam komponen.

Vue juga memberi pengguna mereka kemampuan untuk memiliki conditional styling.
Pola umum adalah memiliki styling tertentu aktif pada beberapa kondisi.
Dengan directive Vue, kita bisa mencapai ini dengan menyediakan atribut `class` dengan peta JSON sederhana.
Pola ini bekerja dengan baik dengan library Tailwind-like.

```vue
<div :class="{"class-name-1": isLoading, "class-name-2": !isLoading }">
  stuff here...
</div>
```

React di sisi lain tidak benar-benar menyediakan Anda dengan cara untuk memberikan style dengan mudah.
Selain menggunakan file `.css`, pilihan terbaik lainnya yang Anda miliki adalah CSS in JS.
Pendapat pribadi dimulai di sini; saya tidak benar-benar suka CSS in JS karena itu mengacaukan kode saya.
Saya lebih suka menggunakan file `.css` biasa.

Vue meningkatkan DX untuk memberikan style.
Saya tidak merasa seperti React memikirkan banyak tentang bagaimana kita harus menata sesuatu; itu diserahkan kepada kita pengguna untuk memutuskan.

## Apa yang Baik dari React

Untuk menutup tulisan saya, tampaknya adil untuk mengangkat hal-hal positif dari menggunakan React pada hari ini.
Saya mengakui bahwa React sekarang memiliki salah satu komunitas terbesar, jika bukan komunitas terbesar di antara library/framework Javascript lainnya.
Mungkin lebih mudah bagi orang yang baru memulai untuk menggunakan React karena komunitas yang luas mendukungnya.
Untuk proyek yang relatif eksperimental dan kecil, saya bisa melihat orang menggunakan React.

Jangan lupa bahwa React Native ada; itu adalah pilihan yang baik untuk orang yang ingin melakukan mobile development tapi ingin menggunakan React untuk sistem komponennya.
Meskipun secara pribadi saya akan menggunakan Flutter sekarang, React Native adalah yang pertama dari jenisnya untuk memiliki fungsionalitas cross-platform.
Startup di setiap arah masih menggunakan React Native untuk aplikasi terobosan mereka.
Ini adalah satu aspek yang bisa dikerjakan Vue (tapi saya secara pribadi pikir mereka harus tetap pada website).

## Kesimpulan

Pengalaman pribadi saya membawa saya untuk menggunakan Vue untuk sisa proyek saya.
Plugin yang luas dan komunitas yang berkembang membuat saya tetap pada ekosistem Vue.
Saya berharap bahwa React bisa tumbuh dengan cara yang Vue miliki dengan cara beradaptasi dan bekerja dengan komunitas dan fitur baru yang meningkatkan developer experience.