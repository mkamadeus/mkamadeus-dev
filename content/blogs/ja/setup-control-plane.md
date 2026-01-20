---
blog: true
title: AWS EC2インスタンスでのコントロールプレーンのセットアップ
description: LFS258コースと関連ドキュメントに従って、kubeadmを使用してコントロールプレーンをセットアップします。
author: mkamadeus
date: 2023-08-21
duration: 6
---

:TableOfContents

## コンテキスト

現在、Certified Kubernetes Administrator（CKA）として認定されるためのオンラインコースを受講しています。
最初のラボの1つは非常に興味深いものでした；コントロールプレーンノードを手動でセットアップすることが含まれていました。
通常、Kubernetesをセットアップするために`k3s`やマネージドサービスに依存しており、舞台裏で何が起こっているかを実際には知りませんでした。

この短い記事では、各ステップの目的を説明しながら、ステップを案内したいと思います。
セットアッププロセスは`kubeadm`を使用して行われます。

## 要件

Ubuntu 22.04イメージでAWS EC2インスタンスを使用しています。
ガイドでは、2つのvCPUと8GのRAMを持つインスタンスの使用を推奨しています。
持っていない場合や余裕がない場合、強力なマシンを持っている限り、VirtualBoxなどのVMを使用することも可能です。

Linuxの良い理解が期待されます。
SSH経由でセットアップする可能性が高いため、いくつかのコマンドを実行します。

## ステップ

### インスタンスのプロビジョニング

> 前述のように、このステップはオプションです。
> このステップについての洞察を追加します。

指示に従ってEC2インスタンスをプロビジョニングしました。
チュートリアルの要件を満たすため、`t3.large`インスタンスタイプを使用しました。
それほど大きなインスタンスは必要ないかもしれませんが、これはコース全体で使用されるため、適切な容量を使用し、他の目的にも使用することにしました。

ガイドでは、このチュートリアルのためにすべてのファイアウォールを削除することも提案しています。
安全ではありませんが、任意のポートと任意のソース（`0.0.0.0/0`）からのすべてのイングレスとエグレス接続を許可しました。

怠惰だったので、これのためのInfrastructure as Code（IaC）セットアップを作成せず、コンソールを通じて行いました。
コースに沿ってより多くのものを追加するため、将来的にIaCをセットアップし、物事をインポートするかもしれません。

### 初期設定

インスタンスをプロビジョニングした後、これは新しいインスタンスであるため、いくつかのことを行う必要があります。
これらのステップを実行する前に、rootとして実行する必要があります。
`sudo -i`と入力する必要があります。
実行する必要があるシェルコマンドは次のとおりです。

```sh
# usual stuff, install dependencies
apt-get update && apt-get upgrade -y
apt install curl apt-transport-https vim git wget gnupg2 software-properties-common lsb-release ca-certificates uidmap -y

# disable swap if not done already
swapoff -a

# ensure modules are loaded
modprobe overlay
modprobe br_netfilter

# modify kubernetes.conf with these values
cat << EOF | tee /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# apply config changes to the kernel
sysctl --system

```
このステップでは、Kubernetesのインストールのためにインスタンスを準備しています。
Kubernetesがインストールプロセス中およびランタイムで使用する可能性のある依存関係をインストールしています。
さらに、スワップを無効にし、カーネルが使用するために必要なモジュールをロードしています。
`/etc/sysctl.d/kubernetes.conf`下のいくつかの値を変更した後、`sysctl --system`を実行してカーネルに変更を適用します。

### `containerd`のインストール

[Kubernetesの公式ドキュメント](https://kubernetes.io/)から引用：

> *Kubernetesはオープンソースの**コンテナオーケストレーション**システムです...*

したがって、コンテナを実行するためのランタイム/エンジンが必要になります。
[`containerd`の公式ドキュメント](https://containerd.io/)から引用：

> *シンプルさ、堅牢性、ポータビリティに重点を置いた業界標準の**コンテナランタイム**。*

過去には、人々は`docker`を使用していましたが、Kubernetes v1.20で置き換えられました。
これはユーザーに混乱をもたらしましたが、最終的には、Kubernetesの使用方法に何も変わりませんでした。
現在、`containerd`はユーザーやクラウドプロバイダーの間で広く使用されています。

`containerd`をインストールするために実行されるコマンドは以下のとおりです：

```sh
# add docker keyrings to install containerd
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# install containerd
apt-get update &&  apt-get install containerd.io -y

# set up the default config
containerd config default | tee /etc/containerd/config.toml

# since we're using systemd, change this line in the config
sed -e 's/SystemdCgroup = false/SystemdCgroup = true/g' -i /etc/containerd/config.toml

# restart containerd to reload the config
systemctl restart containerd
```

これらのコマンドを使用して、`containerd`をインストールできるようにキーリングを追加しています。
デフォルト設定をセットアップした後、UbuntuとSystemdを使用しているため、設定の行を変更しました。
設定変更後は`containerd`のサービス再起動が必要です。

### `kubeadm`、`kubelet`、`kubectl`のインストール

Kubernetesに新しい人のために、インストールされた各コンポーネントが何に使用されるかを説明します：

- `kubeadm`: KubernetesノードをPrepareするためのCLIツール。
- `kubelet`: 各Kubernetesノードで実行されるエージェント。
- `kubectl`: Kubernetesクラスターに接続するためのCLIツール。

これらのツールをインストールするには、これらのシェルコマンドを使用できます：

```sh
# !!NOTE!! Follow the docs for the steps below
# https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#dpkg-k8s-package-repo

# add a new repo for k8s
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# install the required packages
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

> ここでの`apt-mark hold`の使用は、後の演習でクラスターをアップグレードするため、チュートリアル/ガイドのためのものです。

### `calico`マニフェストの取得

コンテナが互いに通信するためには、ネットワークを作成することで互いに接続性を持つ必要があります。
しかし、マシン上でコンテナを実行しているため、ネットワークをシミュレートする必要があります。
ここでContainer Network Interface（CNI）が登場し、クラスター内の接続性に関連するすべて（pod-to-pod、pod-to-service、pod-to-externalなど）を処理するために使用されます。

YAMLマニフェストは[`calico`のGitHub](https://github.com/projectcalico/calico)で利用可能です。

```sh
wget https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml
```

YAMLマニフェストを取得した後、次のステップは`calico`によって使用されるデフォルトのIPv4プールを取得するためにその内容を確認することです。
`vim`または慣れているテキストエディタを使用して検索できます。
これらの行で見つけることができます：

```yaml
- name: CALICO_IPV4POOL_CIDR
  value: "192.168.0.0/16" # <--- this
```

この値（`192.168.0.0/16`）は、後でクラスターをセットアップする際に役立ちます。

### `kubeadm`を使用したコントロールプレーンのセットアップ

> *ここからが興味深い部分です🤓*

これらすべての準備を完了した後、コントロールプレーンノードのセットアップを開始する時が来ました。

まず、ホストのIPアドレスを取得する必要があります。
`hostname -i`または`ip addr show`のいずれかを入力することで値を取得できます。

取得した値を使用して、`/etc/hosts`にエントリを追加し、`k8scp`にマップします。
これは内部ホスト名リゾルバーとして使用され、言い換えれば、このノードをローカルで名前で解決するためです。
`/etc/hosts`ファイルの上部に次のような行を追加します：`xxx.xxx.xxx.xxx k8scp`。

次に、`kubeadm-config.yaml`という名前の追加ファイルを作成します。
その内容は次のとおりです：

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: stable
controlPlaneEndpoint: "k8scp:6443" # referring to self, resolved in `/etc/hosts`
networking:
  podSubnet: 192.168.0.0/16 # match with calico's config
```

このファイルは`kubeadm`によってクラスターをブートストラップするために使用されます。
`controlPlaneEndpoint`に`/etc/hosts`に書いたホスト名が含まれていることを確認してください。
また、変更した場合は`networking.podSubnet`の値が`calico`のIPv4プールに設定したものと一致することを確認してください。

確認後、このコマンドを実行します。
`tee`コマンドは、必要に応じてレビューのために出力をファイルにパイプするために使用されます。

```sh
kubeadm init --config=kubeadm-config.yaml --upload-certs | tee kubeadm-init.out
```

管理タスクが完了したので、`root`ユーザーから退出するのが良いステップです。

```sh
exit
```

### クラスターの確認

前のコマンドを実行した後、いくつかの指示が印刷されているはずです。
指示は、クラスターにアクセスする方法を案内します。

ガイド/チュートリアルでは、出力の修正版であるコマンドセットが提供されています。
これらのコマンドは、単純に`root`ユーザーからファイルをコピーし、コピーされたファイルの所有権を私たちのユーザーに与えます。

```sh
# copy the generated kubeconfig file for the non-root user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# display the kubeconfig
less .kube/config
```

`kubectl get nodes`などの基本的なコマンドを試して、新しく作成されたクラスターの一部であるノードをプレビューできるようになりました。
コントロールプレーンのみをプロビジョニングしているため、表示されるノードは1つだけのはずです！

### `calico`のインストール

ガイドを終了する前に、`calico`をインストールしましょう。

```sh
# copy the calico manifest from the root/sudo user
sudo cp /root/calico.yaml .

# apply the calico manifest
kubectl apply -f calico.yaml
```

## 最終的な考え

> *そして完了です！*🎉

セットアッププロセスは非常に興味深く洞察に満ちていることがわかりました。
バックグラウンドでマネージドサービスがどのように作成されるかを知ることは啓発的です。
また、`kubespray`などのツールがどのように開発され、考え出されるかについての興味も湧きます。
これらのステップに基づいて、これらのプロセスは高度に自動化可能であると強く信じています。

次のガイドでは、このクラスターに新しい（ワーカー）ノードを追加することを続けます。