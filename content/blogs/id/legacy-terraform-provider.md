---
blog: true
title: Memperbarui Legacy Terraform Provider
description: Panduan singkat tentang memperbarui legacy Terraform provider dan proyek.
author: mkamadeus
date: 2023-12-02
duration: 1
---

::TableOfContents
::

## Latar Belakang

Bekerja pada hal-hal, saya menemukan bahwa ada beberapa proyek legacy yang masih menggunakan Terraform 0.12, yang jauh tertinggal secara fitur dengan proyek Terraform terbaru.
Ini adalah panduan singkat tentang cara memperbarui legacy Terraform provider dan proyek.

## Mengupgrade Proyek

### Bumping Version dalam Proyek

Kita perlu memperbarui versi provider. Ini dilakukan dengan memperbarui blok `required_providers` dalam blok `terraform`.

```hcl
terraform {
  version = "~> 1.5.7" # perbarui ini

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.2.2" # perbarui ini
    }
  }
}
```

Setelah menginisialisasi proyek dengan menjalankan `terraform init`, Anda mungkin mendapat pesan error seperti ini:

```
Error: Invalid legacy provider address

This configuration or its associated state refers to the unqualified provider
"aws".

You must complete the Terraform 0.13 upgrade process before upgrading to later
versions.
```

### Mengupgrade Terraform Provider State

Pesan sebelumnya berarti ada beberapa provider yang sudah usang.
Karena kita melewati proses upgrade dari Terraform 0.13, kita perlu mengupgrade state secara manual.

Jalankan perintah berikut untuk mengupgrade state:

```bash
terraform state replace-provider registry.terraform.io/-/aws registry.terraform.io/hashicorp/aws
```

Akan ada prompt untuk konfirmasi.
Untuk melewati prompt, Anda bisa menggunakan flag `-auto-approve`.

Jika prosesnya berhasil, lanjutkan dengan menginisialisasi proyek dengan menjalankan `terraform init`.

## Taskfile Saya

Karena saya sering melakukan ini, saya perlu mengotomatisasi prosesnya.
Saya menggunakan [Taskfile](https://taskfile.dev) untuk mengotomatisasi proses memperbarui proyek.
Menggunakan fitur global task Taskfile, saya bisa menjalankan ini di direktori/proyek mana pun.
Saya juga menambahkan beberapa cleanup dan validasi untuk memastikan longevitas proyek 🙂

Berikut adalah Taskfile yang saya gunakan:

```yaml
version: '3'

tasks:
  terraform-update-provider-state:
    dir: '{{.USER_WORKING_DIR}}'
    cmds:
    - cmd: terraform init
      ignore_error: true
    - terraform state replace-provider -auto-approve registry.terraform.io/-/aws registry.terraform.io/hashicorp/aws
    - terraform providers lock -platform=linux_amd64 -platform=darwin_amd64
  terraform-validate:
    dir: '{{.USER_WORKING_DIR}}'
    cmds:
      - terraform init
      - tflint --fix
      - tflint
      - terraform fmt
      - terraform validate
  tf-update-provider:
    dir: '{{.USER_WORKING_DIR}}'
    cmds:
      - task: terraform-update-provider-state
      - task: terraform-validate
```