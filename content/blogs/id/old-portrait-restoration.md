---
blog: true
title: "Merestorasi Potret Lama Saya"
description: Proses saya merestorasi potret lama saya menggunakan image processing dan machine learning.
author: mkamadeus
date: 2023-07-29
duration: 6
---

::TableOfContents
::

## Latar Belakang

Saya menemukan potret lama saya dari ulang tahun saya di suatu waktu antara 2005-2010.
Saya terkejut melihat betapa banyak saya telah berubah sejak saat itu, secara fisik dan mental (saya harap).

Saya menyadari bahwa ada kesempatan untuk merestorasi gambar, karena saya melihat beberapa artifact pada gambar.
Artifact ini memiliki pola berulang yang saya pikir dengan sedikit sains mereka dapat dihilangkan.
Sebagai mahasiswa teknik, saya pikir akan menarik untuk mencoba merestorasi gambar menggunakan image processing dan machine learning.

## Gambaran Proses

Ada beberapa hal yang saya lakukan untuk merestorasi gambar ini.
1. Menyesuaikan gambar
2. Membersihkan gambar
3. Merestorasi gambar
4. Penyesuaian akhir

### Menyesuaikan Gambar

> Langkah ini akan dilakukan di semua langkah jika diperlukan.

Inilah tampilan gambar tersebut.

::MarkdownFigure
---
src: /images/old-portrait-restoration/original.jpg
alt: Gambar Asli
caption: Gambar Asli. Perhatikan bahwa warna-warnanya semua pudar (dan saya kecil 😆).
width: 500
---
::

Warna dan kontras tidak tepat ketika saya mengambil foto gambar.
Memiliki beberapa pengetahuan dalam menggunakan Adobe Photoshop, saya mencoba menyesuaikan gambar menggunakan software tersebut.
Dengan keterampilan terbatas saya, saya mencoba menyesuaikan gambar untuk membuat warna lebih natural dengan standar hari ini.

Jika Anda penasaran dengan apa yang saya lakukan, ini adalah apa yang saya lakukan secara kasar:
1. Menyesuaikan brightness dan contrast gambar.
2. Menggunakan Camera Raw Filter.
3. Menghilangkan artifact lainnya.

Anda mungkin bertanya-tanya tentang pertanyaan-pertanyaan ini:

> *Mengapa tidak langsung menghilangkan artifact?*

> *Mengapa tidak langsung merestorasi gambar menggunakan model?*

Saya telah melakukan beberapa eksperimen dan untuk kasus saya, itu bekerja lebih baik setelah gambar disesuaikan sehingga dapat mempertahankan detail gambar dengan lebih baik.
Saya juga mencoba merestorasi gambar langsung menggunakan model, tapi hasilnya tidak sebaik yang setelah gambar disesuaikan.

Inilah tampilan gambar yang disesuaikan.

::MarkdownFigure
---
src: /images/old-portrait-restoration/adjusted.png
alt: Gambar yang Disesuaikan
caption: Gambar yang Disesuaikan. Perhatikan pola berulang pada gambar.
width: 500
---
::

### Membersihkan Gambar

> Jika Anda di sini untuk bagian machine learning, Anda bisa melewati bagian ini.

Artifact yang ada pada gambar adalah pola berulang karena dicetak pada printer yang macet saat itu.
Setelah menghadiri [kelas image processing](https://informatika.stei.itb.ac.id/~rinaldi.munir/Citra/citra.htm), saya menyadari bahwa saya bisa menggunakan [low-pass filter](https://en.wikipedia.org/wiki/Low-pass_filter) untuk menghilangkan artifact.

Menggunakan alat online, saya mengkonversi gambar saya ke domain frekuensi menggunakan [Fast Fourier Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform).
Ini menghasilkan array 2D dari bilangan kompleks, yang merepresentasikan gambar dalam domain frekuensi.
Angka-angka dibuat menjadi nilai skalar dengan mengambil nilai absolut dari bilangan kompleks sehingga dapat divisualisasikan.
Inilah bagaimana gambar direpresentasikan dalam domain frekuensi untuk visualisasi.

::MarkdownFigure
---
src: /images/old-portrait-restoration/fft-01.png
alt: Fast Fourier Transform dari Gambar
caption: Fast Fourier Transform dari gambar yang disesuaikan. Perhatikan titik-titik yang lebih terang pada gambar.
width: 500
---
::

Seperti yang Anda lihat, ada beberapa titik terang yang terlihat dalam domain frekuensi.
Pola berulang dalam domain spasial akan terlihat sebagai titik terang selain pusat dalam domain frekuensi.
Ini karena pola berulang memiliki frekuensi tinggi, yang direpresentasikan sebagai titik terang dalam domain frekuensi.

Karena alasan ini kita bisa menggunakan low-pass filter untuk menghilangkan pola berulang.
Kita cukup mengatur nilai titik terang menjadi 0, yang akan menghilangkan pola berulang.

::MarkdownFigure
---
src: /images/old-portrait-restoration/fft-02.png
alt: Low-pass Filtered Fast Fourier Transform dari Gambar
caption: Low-pass Filtered Fast Fourier Transform dari Gambar. Perhatikan titik-titik terang pada gambar diatur menjadi 0.
width: 500
---
::

Jika Anda perhatikan, saya tidak menghilangkan semua titik terang pada gambar.
Setelah eksperimen, titik-titik khusus itu adalah yang menyebabkan sebagian besar kekaburan.
Menghilangkan titik tambahan menyebabkan gambar kehilangan detailnya.

Setelah itu, kita bisa mengkonversi gambar kembali ke domain spasial menggunakan [Inverse Fast Fourier Transform](https://en.wikipedia.org/wiki/Inverse_Fourier_transform).

Inilah hasilnya setelah menjalani proses sejauh ini.

::MarkdownFigure
---
src: /images/old-portrait-restoration/cleaned.png
alt: Gambar yang Dibersihkan
caption: Gambar yang Dibersihkan
width: 500
---
::

Meskipun terlihat sangat mirip, kita dapat mengamati bahwa pola berulang hilang (atau setidaknya, dihaluskan) untuk bagian gambar yang terlihat.

Saya cukup puas dengan hasilnya (dan saya bisa menggunakan gelar teknik saya sebagai bonus 😝), jadi saya memutuskan untuk melanjutkan ke langkah berikutnya.

### Merestorasi Gambar

> **Fun Fact**: Saya melakukan langkah ini setelah beberapa minggu membersihkan dan menyesuaikan gambar karena saya baru menemukan model machine learning ini 😅

Secara kebetulan, saya menemukan [video](https://www.youtube.com/watch?v=pPCHSWCA4hg) di YouTube oleh [Two Minute Papers](https://www.youtube.com/@TwoMinutePapers) yang menampilkan model machine learning untuk merestorasi potret lama.
Anda bisa melihat video di bawah ini:

::YoutubeEmbed{video-id="pPCHSWCA4hg"}
::

Model machine learning ini disebut **"CodeFormer"** dan tersedia di [Replicate](https://replicate.com/sczhou/codeformer) untuk penggunaan publik.

Model ini dilatih untuk merestorasi potret lama dan bekerja dengan baik untuk kasus saya dan gambar lain yang telah saya uji, meskipun ada beberapa kelemahan yang saya temui.
Observasi ini akan dibahas di bagian selanjutnya.

Ada satu parameter yang terlihat dalam model ini, yang disebut `codeformer_fidelity`.
Parameter ini adalah nilai yang dibatasi antara 0 dan 1 ($[0,1]$), yang menandakan ukuran antara kualitas dan fidelitas.
Semakin rendah angkanya, semakin banyak fitur asli gambar yang dipertahankan.
Sebaliknya, semakin tinggi angkanya, semakin banyak model akan mencoba merestorasi gambar yang pada gilirannya mungkin menghilangkan beberapa kualitas asli gambar.

Berdasarkan informasi itu, saya mencoba menyeimbangkan antara kedua nilai dan menemukan bahwa nilai $0.7$ bekerja paling baik untuk kasus saya (jika saya ingat dengan benar).
Angka ini harus disesuaikan sesuai dengan penggunaan Anda, jadi jangan ragu untuk bereksperimen dengannya.
Jika Anda merasa hasilnya terlalu tidak realistis atau berbeda dengan seperti apa Anda terlihat, coba turunkan nilainya.

Menggunakan gambar yang dibersihkan, saya menjalankan model pada itu dan melakukan beberapa penyesuaian pada hasilnya.
Inilah hasilnya setelah proses.

::MarkdownFigure
---
src: /images/old-portrait-restoration/restored.jpg
alt: Gambar yang Direstorasi
caption: Gambar yang Direstorasi
width: 500
---
::

Saya terpukau oleh hasilnya karena sangat dekat dengan bagaimana saya terlihat (setidaknya berdasarkan ingatan saya) 🤯

## Pelajaran

### Domain Spasial dan Frekuensi

Tidak semua titik terang dari domain frekuensi itu "buruk".
Beberapa titik terang diperlukan untuk mempertahankan detail gambar.
Menghilangkan semua titik terang akan menghasilkan gambar yang lebih buram.
Setelah eksperimen, dalam kasus saya empat titik itu adalah yang menyebabkan kekaburan.

Saya melakukan penyesuaian sebelum melakukan penghilangan pola berulang karena hasilnya lebih baik.
Saya tidak benar-benar yakin mengapa, tapi saya mencoba membuat kontras lebih jelas antara pola berulang dan gambar asli.
Hasilnya adalah apa yang Anda lihat di blog ini.

### CodeFormer

Model bekerja dengan baik untuk kasus saya dan saya menemukan beberapa observasi.

Saya mencoba model ini untuk merestorasi gambar lain dan menemukan bahwa hasilnya tidak sebaik yang untuk kasus saya.
Itu memiliki kesulitan mendeteksi wajah dan hasilnya terkadang aneh.
Saya pikir ini karena model dilatih pada dataset tertentu, yaitu potret lama.
Foto saya bukan khusus potret lama, melainkan hanya foto lama dengan artifact.

Berikut adalah beberapa poin lain yang saya amati:
- Model bekerja paling baik untuk memperbaiki foto close up.
- Model bekerja untuk foto dengan beberapa orang
- Model tidak bekerja dengan baik terhadap foto dengan banyak artifact, noise, dan blur.
- Semakin jelas fitur foto, semakin baik hasilnya.
- Jumlah pixel yang lebih tinggi tidak selalu berarti hasil yang lebih baik.
- Coba seimbangkan antara kualitas dan fidelitas/kesetiaan.