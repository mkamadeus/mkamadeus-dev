---
blog: true
title: Memindahkan Resource Kubernetes Antar Node
description: Panduan singkat tentang cara memindahkan resource yang telah di-provision di dalam Kubernetes untuk membuat perubahan pada node.
author: mkamadeus
date: 2022-11-27
duration: 2
---

::TableOfContents
::

## Latar Belakang

Saya menyediakan cluster Kubernetes baru untuk pekerjaan saya.
Menggunakan AWS Elastic Kubernetes Service dan template yang disediakan, cluster dapat di-provision dan diatur dengan aplikasi yang diperlukan dengan relatif cepat.
Namun, saya menyadari konfigurasi salah, khususnya salah satu node tidak diatur dengan benar.
Saya sudah mengatur aplikasi untuk autoscaling, disaster recovery, dll.
Alih-alih memulai ulang progress saya, saya ingin mempertahankan aplikasi yang terinstal.

## Prosedur

TLDR; prosedur untuk memindahkan resource dari satu node ke node lain adalah sebagai berikut:

1. Provision worker node sementara.
2. Cordon semua node selain node yang rusak dan worker node sementara.
3. Drain node yang rusak sehingga resource pindah ke node sementara.
4. Reprovision node yang rusak dengan parameter yang benar.
5. Cordon node sementara sehingga resource pindah ke node yang diperbaiki.
6. Uncordon node lainnya.

> Prosedur ini fleksibel dan dapat diadaptasi untuk kasus reprovisioning node yang berbeda.

## Penjelasan

### Provisioning Node Sementara

Karena node sudah di-provision, Kubernetes tidak bisa begitu saja memperbaiki masalah dengan sendirinya.
Oleh karena itu, kita perlu menambahkan node sementara ini untuk memindahkan resource ke sini sementara.
Provision node sesuai dengan bagaimana Anda akan melakukannya di sistem Anda sendiri karena mungkin bervariasi.

### Cordoning Node

Cordoning node adalah menandai node sebagai unschedulable.
Ini tidak berlaku untuk resource yang telah dijadwalkan di sana.
Kita melakukan ini untuk menghindari resource pindah ke node yang tidak diinginkan.
Saya menggunakan `k9s`, tapi Anda bisa melakukan hal yang sama di `kubectl`.

```sh
kubectl get nodes
kubectl cordon NODE
```

### Draining Node

Draining adalah cordoning dengan langkah tambahan, yaitu "menguras" resource yaitu memindahkannya ke node lain.
Setelah menandai node sebagai unschedulable (cordoning), resource akan dipindahkan ke node yang tersedia.
Jika kita telah men-cordon node selain node sementara kita, itu harus pindah ke node sementara.

```sh
kubectl get nodes
kubectl drain NODE
```

### Reprovisioning Node

Dalam kasus saya, saya menyediakan node di subnet yang salah.
Tidak ada cara untuk memperbaiki node ini selain reprovisioning, oleh karena itu saya masuk ke cordoning dan draining node.
Langkah-langkah ini akan tidak relevan bagi Anda jika Anda tidak perlu reprovision node.

### Uncordoning Node

Seperti namanya, ini adalah kebalikan dari cordoning node.
Langkah ini membuat node dapat dijadwalkan lagi setelah Anda menyelesaikan proses migrasi.

```sh
kubectl get nodes
kubectl uncordon NODE
```

## Kesimpulan

Langkah-langkah ini dapat diikuti untuk memperbarui node yang rusak.
Langkah-langkah ini juga menyediakan kerangka kerja umum untuk memperbarui node yang rusak.
Dengan itu, saya harap Anda belajar sesuatu tentang Kubernetes 😀