---
blog: true
title: Setup Control Plane di AWS EC2 Instance
description: Menyiapkan control plane menggunakan kubeadm mengikuti kursus LFS258 dan dokumentasi terkait.
author: mkamadeus
date: 2023-08-21
duration: 6
---

:TableOfContents

## Konteks

Saya saat ini menghadiri kursus online untuk menjadi tersertifikasi sebagai Certified Kubernetes Administrator (CKA).
Salah satu lab pertama sangat menarik; itu melibatkan pengaturan control plane node secara manual.
Saya biasanya mengandalkan `k3s` atau managed service untuk mengatur Kubernetes, tanpa benar-benar tahu apa yang terjadi di balik layar.

Dalam artikel singkat ini, saya ingin memandu Anda melalui langkah-langkah sambil menjelaskan tujuan dari setiap langkah.
Proses setup akan dilakukan menggunakan `kubeadm`.

## Persyaratan

Saya menggunakan AWS EC2 instance untuk ini dengan image Ubuntu 22.04.
Panduan merekomendasikan menggunakan instance dengan 2 vCPU dan 8G RAM.
Jika Anda tidak memilikinya atau tidak mampu membelinya, menggunakan VM seperti VirtualBox mungkin juga bisa bekerja, selama Anda memiliki mesin yang powerful.

Pemahaman yang baik tentang Linux diharapkan.
Kita akan menjalankan beberapa perintah, karena kita kemungkinan akan mengatur melalui SSH.

## Langkah-langkah

### Provision Instance

> Seperti yang disebutkan sebelumnya, langkah ini opsional.
> Menambahkan wawasan di sini tentang langkah ini.

Saya mengikuti instruksi dan menyediakan EC2 instance.
Saya menggunakan tipe instance `t3.large` karena memenuhi persyaratan tutorial.
Anda mungkin tidak memerlukan instance sebesar itu, tapi karena ini akan digunakan sepanjang kursus, saya memutuskan untuk menggunakan kapasitas yang sesuai dan mungkin menggunakannya untuk tujuan lain juga.

Panduan juga menyarankan menghapus semua firewall demi tutorial ini.
Ini tidak aman, tapi saya mengizinkan semua koneksi ingress dan egress dari port apa pun dan sumber apa pun (`0.0.0.0/0`).

Saya merasa malas, jadi saya tidak membuat setup Infrastructure as Code (IaC) untuk ini; saya melakukannya melalui console.
Saya mungkin akan mengatur IaC dan mengimpor hal-hal di masa depan, karena saya akan menambahkan lebih banyak hal sepanjang kursus.

### Konfigurasi Awal

Setelah menyediakan instance, beberapa hal perlu dilakukan, karena ini adalah instance yang fresh.
Sebelum melakukan langkah-langkah ini, Anda perlu menjalankan ini sebagai root.
Anda harus mengetik `sudo -i`.
Berikut adalah perintah shell yang perlu dijalankan.

```sh
# hal biasa, install dependencies
apt-get update && apt-get upgrade -y
apt install curl apt-transport-https vim git wget gnupg2 software-properties-common lsb-release ca-certificates uidmap -y

# disable swap jika belum dilakukan
swapoff -a

# pastikan modul dimuat
modprobe overlay
modprobe br_netfilter

# modifikasi kubernetes.conf dengan nilai-nilai ini
cat << EOF | tee /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# terapkan perubahan config ke kernel
sysctl --system

```
Dalam langkah ini, kita mempersiapkan instance untuk instalasi Kubernetes.
Kita menginstal dependencies yang mungkin digunakan Kubernetes selama proses instalasi dan saat runtime.
Selain itu, kita menonaktifkan swap dan memuat modul yang diperlukan untuk kernel.
Setelah memodifikasi beberapa nilai di bawah `/etc/sysctl.d/kubernetes.conf`, kita menerapkan perubahan ke kernel dengan menjalankan `sysctl --system`.

### Menginstal `containerd`

Mengutip [dokumentasi resmi Kubernetes](https://kubernetes.io/):

> *Kubernetes adalah sistem **orkestrasi kontainer** open-source...*

Oleh karena itu, kita akan memerlukan runtime/engine untuk menjalankan kontainer.
Mengutip [dokumentasi resmi `containerd`](https://containerd.io/):

> *Sebuah **container runtime** standar industri dengan penekanan pada kesederhanaan, ketahanan, dan portabilitas.*

Di masa lalu, orang menggunakan `docker`, tapi itu diganti di Kubernetes v1.20.
Ini membawa beberapa kebingungan kepada pengguna, tapi pada akhirnya, tidak ada yang berubah dalam cara kita menggunakan Kubernetes.
Saat ini, `containerd` banyak digunakan di antara pengguna dan bahkan cloud provider.

Di bawah ini adalah perintah yang dijalankan untuk menginstal `containerd`:

```sh
# tambahkan docker keyring untuk menginstal containerd
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# install containerd
apt-get update &&  apt-get install containerd.io -y

# setup config default
containerd config default | tee /etc/containerd/config.toml

# karena kita menggunakan systemd, ubah baris ini dalam config
sed -e 's/SystemdCgroup = false/SystemdCgroup = true/g' -i /etc/containerd/config.toml

# restart containerd untuk reload config
systemctl restart containerd
```

Menggunakan perintah ini, kita menambahkan keyring untuk memungkinkan kita menginstal `containerd`.
Setelah mengatur config default, karena saya menggunakan Ubuntu dan `systemd`, saya mengubah baris dalam config.
Restart service untuk `containerd` diperlukan setelah perubahan konfigurasi.

### Menginstal `kubeadm`, `kubelet`, `kubectl`

Untuk mereka yang baru mengenal Kubernetes, inilah untuk apa setiap komponen yang diinstal digunakan:

- `kubeadm`: alat CLI untuk mempersiapkan Kubernetes Node.
- `kubelet`: agen yang berjalan di setiap node Kubernetes.
- `kubectl`: alat CLI untuk terhubung ke cluster Kubernetes.

Untuk menginstal alat-alat tersebut, Anda dapat menggunakan perintah shell ini:

```sh
# !!CATATAN!! Ikuti docs untuk langkah-langkah di bawah ini
# https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#dpkg-k8s-package-repo

# tambahkan repo baru untuk k8s
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# install package yang diperlukan
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

> Penggunaan `apt-mark hold` di sini adalah untuk kepentingan tutorial/panduan, karena dalam latihan selanjutnya, saya akan mengupgrade cluster.

### Mendapatkan Manifest `calico`

Agar kontainer dapat berkomunikasi satu sama lain, mereka perlu memiliki konektivitas satu sama lain dengan membuat jaringan.
Namun, karena kita menjalankan kontainer di mesin, kita perlu mensimulasikan jaringan.
Di sinilah Container Network Interface (CNI) masuk, yang digunakan untuk menangani apa pun yang berkaitan dengan konektivitas dalam cluster kita (pod-to-pod, pod-to-service, pod-to-external, dll.).

Manifest YAML tersedia di [GitHub `calico`](https://github.com/projectcalico/calico).

```sh
wget https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml
```

Setelah mendapatkan manifest YAML, langkah selanjutnya adalah memeriksa isinya untuk mendapatkan IPv4 pool default yang digunakan oleh `calico`.
Anda dapat mencarinya menggunakan `vim` atau editor teks apa pun yang Anda gunakan.
Anda dapat menemukannya di baris-baris ini:

```yaml
- name: CALICO_IPV4POOL_CIDR
  value: "192.168.0.0/16" # <--- ini
```

Nilai ini (`192.168.0.0/16`) akan berguna nanti untuk mengatur cluster kita.

### Mengatur Control Plane menggunakan `kubeadm`

> *Di sinilah bagian yang menarik 🤓*

Setelah menyelesaikan semua persiapan ini, saatnya untuk mulai mengatur control plane node kita.

Pertama, kita perlu mendapatkan alamat IP host kita.
Anda bisa mendapatkan nilainya dengan mengetik `hostname -i` atau `ip addr show`.

Menggunakan nilai yang diperoleh, tambahkan entri ke `/etc/hosts` dan petakan ke `k8scp`.
Ini digunakan sebagai resolver hostname internal, dengan kata lain, untuk menyelesaikan node ini berdasarkan nama secara lokal.
Tambahkan baris di bagian atas file `/etc/hosts` seperti ini: `xxx.xxx.xxx.xxx k8scp`.

Selanjutnya, buat file tambahan bernama `kubeadm-config.yaml`.
Berikut isinya:

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: stable
controlPlaneEndpoint: "k8scp:6443" # merujuk ke diri sendiri, diselesaikan di `/etc/hosts`
networking:
  podSubnet: 192.168.0.0/16 # cocok dengan config calico
```

File ini digunakan oleh `kubeadm` untuk bootstrap cluster.
Pastikan bahwa `controlPlaneEndpoint` berisi hostname yang Anda tulis di `/etc/hosts`.
Juga, pastikan nilai `networking.podSubnet` cocok dengan apa yang Anda atur untuk IPv4 pool `calico` jika Anda mengubahnya.

Setelah memverifikasi, jalankan perintah ini.
Perintah `tee` digunakan untuk menyalurkan output ke file untuk review jika diperlukan.

```sh
kubeadm init --config=kubeadm-config.yaml --upload-certs | tee kubeadm-init.out
```

Karena kita sudah selesai dengan tugas administratif, ini adalah langkah yang baik untuk keluar dari user `root`.

```sh
exit
```

### Memeriksa Cluster

Setelah menjalankan perintah sebelumnya, seharusnya ada beberapa instruksi yang dicetak.
Instruksi memandu Anda tentang cara mengakses cluster.

Panduan/tutorial telah memberikan saya serangkaian perintah yang merupakan versi modifikasi dari output.
Perintah ini cukup menyalin file dari user `root` dan memberikan kepemilikan file yang disalin kepada user kita.

```sh
# salin file kubeconfig yang dihasilkan untuk user non-root
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# tampilkan kubeconfig
less .kube/config
```

Anda sekarang dapat mencoba beberapa perintah dasar, seperti `kubectl get nodes`, untuk melihat pratinjau node yang merupakan bagian dari cluster yang baru dibuat.
Karena kita hanya menyediakan control plane, seharusnya hanya ada satu node yang ditampilkan!

### Menginstal `calico`

Sebelum menyimpulkan panduan, mari kita instal `calico`.

```sh
# salin manifest calico dari user root/sudo
sudo cp /root/calico.yaml .

# terapkan manifest calico
kubectl apply -f calico.yaml
```

## Pemikiran Akhir

> *Dan kita selesai!* 🎉

Saya menemukan proses setup sangat menarik dan memberikan wawasan.
Sangat mencerahkan untuk mengetahui bagaimana managed service di latar belakang dibuat.
Ini juga memicu minat saya tentang bagaimana alat seperti `kubespray` dikembangkan dan dipikirkan.
Berdasarkan langkah-langkah ini, saya sangat percaya bahwa proses ini sangat dapat diotomatisasi.

Dalam panduan selanjutnya, saya akan melanjutkan dengan menambahkan node (worker) baru ke cluster ini.