---
blog: true
title: Setup Control Plane in AWS EC2 Instance
description: Setting up control plane using kubeadm following LFS258 course and related documentations.
author: mkamadeus
date: 2023-08-21
duration: 1
---

:TableOfContents

## Context

I am currently attending an online course to get certified in the Certified Kubernetes Administrator (CKA) test.
One of the first labs were very interesting; that is to set up the control plane node manually.
I usually rely on `k3s` or managed services to set up Kubernetes, not really knowing what happens behind the scenes.

In this short writing, I would like to guide you through the step whilst explaining what each step does.
The setup process will be done using `kubeadm`.

## Requirements

I am using an AWS EC2 instance for this with an Ubuntu 22.04 image.
The guide recommends using an instance with 2 vCPUs and 8G of RAM.
If you do not have one or do not want to afford one, using VMs such as VirtualBox might work as well as long as you have a beefy machine.

A good understanding of Linux is expected.
We will be running a handful of commands since most likely we are going to set up via SSH.

## Steps

### Provision an Instance

> As mentioned previously, this step is optional.
> Adding insights here on this step.

I followed the instructions and provisioned an EC2 instance.
I used the `t3.large` as it fits the requirements of the tutorial.
You might not need an instance that large, but since this is going to be used throughout the course I might as well use the appropriate capacity and maybe use it for something else.

The guide also suggests to remove all firewalls for the sake of this tutorial.
It is insecure, but I allowed all ingress and egress connection from any port and any source (`0.0.0.0/0`).

I was feeling lazy so I did not create an Infrastructure as Code (IaC) setup for this so I did this through console.
I might do this and import stuff in the future since I will be adding stuff along the course.

### Initial Configuration

After provisioning the instance, several things need to be done since this is a fresh instance.
Before doing these steps, you will need to execute this as root, so you should type in `sudo -i`
Here are the shell commands being executed.

```sh
# usual stuff, install deps
apt-get update && apt-get upgrade -y
apt install curl apt-transport-https vim git wget gnupg2 software-properties-common lsb-release ca-certificates uidmap -y

# disable stuff if haven't
swapoff -a

# ensuring modules are loaded
modprobe overlay
modprobe br_netfilter

# modify kubernetes.conf with these values
cat << EOF | tee /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# apply config changes to kernel
sysctl --system
```

In this step, we basically prepare the instance for it to be installed with Kubernetes.
We installed dependencies that Kubernetes might use during the installation process and during runtime.
In addition to that, we disabled swap and loaded the required modules for the kernel to use.
After modifying some values under `/etc/sysctl.d/kubernetes.conf`, we applied the changes to the kernel by running `sysctl --system`.

### Installing `containerd`

Quoting [Kubernetes' official documentation](https://kubernetes.io/):

> *Kubernetes is an open-source **container orchestration** system...*

Hence, we will need a runtime/engine to run the containers in.
Quoting [`containerd`'s official documentation](https://containerd.io/):

> *An industry-standard **container runtime** with an emphasis on simplicity, robustness and portability*

In the past, people have been using `docker`, but it was replaced in Kubernetes v1.20.
This brought some confusions to users, but at the end nothing really changed how we use Kubernetes.
Nowadays, `containerd` is widely used among users even cloud providers.

Below are the commands executed to install `containerd`:

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

# set up default config
containerd config default | tee /etc/containerd/config.toml

# since we're using systemd, change this line in the config
sed -e 's/SystemdCgroup = false/SystemdCgroup = true/g' -i /etc/containerd/config.toml

# restart containerd to reload config
systemctl restart containerd
```

Using these commands, we are adding the keyring to enable us to install `containerd`.
After setting up the default config, since I am using Ubuntu and using `systemd`, I changed the line in the config.
A service restart for `containerd` is required after a configuration change.

### Installing `kubeadm`, `kubelet`, `kubectl`

For those who are new to Kubernetes, here are what each component installed is used for:

- `kubeadm` : a CLI tool to prepare a Kubernetes Node.
- `kubelet` : an agent that runs on each Kubernetes node.
- `kubectl` : a CLI tool to connect to a Kubernetes cluster.

To install those tools, you can simply use these shell commands:

```sh
# !!NOTE!! Following the docs for the steps below
# https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#dpkg-k8s-package-repo

# add new repo for k8s
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# install required packages
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

> The use of `apt-mark hold` here is for the sake of the tutorial/guide since in a later exercise I'll be upgrading the cluster.

### Getting `calico` Manifest

In order for containers to communicate with each other, they need to have connectivity with each other by creating a network.
However, since we are running containers on a machine, we will need to simulate the network.
That is where Container Network Interface (CNI) comes in, which is to handle anything related to connectivity in our cluster (pod-to-pod, pod-to-service, pod-to-external, etc.).

The YAML manifest is available on [`calico`'s GitHub](https://github.com/projectcalico/calico).

```sh
wget https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml
```

After getting the YAML manifest, the next step would be to check the contents of it to get the default IPv4 pool used by `calico`.
Try to search it using `vim` or anything that you are used to.
You can see it in these lines:

```yaml
- name: CALICO_IPV4POOL_CIDR
  value: "192.168.0.0/16" # <--- this
```

This value (`192.168.0.0/16`) will be useful later on to set up our cluster.

### Setting Up Control Plane using `kubeadm`

> *Here comes the interesting part 🤓*

After all of those preparation are made, it is time to actually start setting up our control plane node.

First, we need to get our host's IP address.
You can get the value by typing either `hostname -i` or `ip addr show`.

Using the obtained value, add an entry under `/etc/hosts` and map it to `k8scp`.
This is used as an internal hostname resolver, in other words to resolve this node by name locally.
Add a line on top of the  `/etc/hosts` file such as `xxx.xxx.xxx.xxx k8scp`.

Next, create an additional file named `kubeadm-config.yaml`.
Here are the contents:

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: stable
controlPlaneEndpoint: "k8scp:6443" # referring to self, resolved in `/etc/hosts`
networking:
  podSubnet: 192.168.0.0/16 # match with calico's config
```

This file is used by `kubeadm` to bootstrap the cluster.
Make sure the `controlPlaneEndpoint` contains your written hostname in `/etc/hosts`.
Also make sure the value of `networking.podSubnet` matches what you set for `calico`'s IPv4 pool if you had changed it.

After checking, run this command. `tee` is used to pipe the output into a file for review if needed.

```sh
kubeadm init --config=kubeadm-config.yaml --upload-certs | tee kubeadm-init.out
```

Since we are done with administrative duties, always a good step to go out from the `root` user.

```sh
exit
```

### Checking Cluster 

After running the previous command, there should be some instructions printed out.
The instructions guides you on how we can access the cluster.

The guide/tutorial has provided me with a set of commands which are a modified version of the output.
These commands simply copy the file from the `root` user and giving the ownership to the copied file to our user.

```sh
# copy generated kubeconfig file for non-root user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# print out kubeconfig
less .kube/config
```

You can now try to do some basic commands, such as `kubectl get nodes` to preview the nodes that is part of your newly created cluster.
Since we are only provisioning the control plane, there should only be one node shown!

### Installing `calico`

Before finishing the guide, `calico` will be installed.
Here are the commands:

```sh
# copy calico manifest from root/sudo user
sudo cp /root/calico.yaml .

# apply calico manifest
kubectl apply -f calico.yaml
```

## Final Thoughts

> *And we are done!* 🎉

I think the setup process was very interesting and very insightful to know how managed service in the background are created.
It also sparks my mind on how tools such as `kubespray` are created and thought about, because based on these steps, I strongly believed that these processes are highly automatable.

In the next guide, I'll continue on with joining a new (worker) node into this cluster.

