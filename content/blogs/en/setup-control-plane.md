---
blog: true
title: Setup Control Plane in AWS EC2 Instance
description: Setting up the control plane using kubeadm following LFS258 course and related documentations.
author: mkamadeus
date: 2023-08-21
duration: 6
---

:TableOfContents

## Context

I am currently attending an online course to become certified as a Certified Kubernetes Administrator (CKA).
One of the first labs was very interesting; it involved setting up the control plane node manually.
I usually rely on `k3s` or managed services to set up Kubernetes, without really knowing what happens behind the scenes.

In this short article, I would like to guide you through the steps while explaining the purpose of each step.
The setup process will be done using `kubeadm`.

## Requirements

I am using an AWS EC2 instance for this with an Ubuntu 22.04 image.
The guide recommends using an instance with 2 vCPUs and 8G of RAM.
If you do not have one or can not afford one, using VMs such as VirtualBox might work as well, as long as you have a powerful machine.

A good understanding of Linux is expected.
We will be running several commands, as we are likely going to set up via SSH.

## Steps

### Provision an Instance

> As mentioned previously, this step is optional.
> Adding insights here about this step.

I followed the instructions and provisioned an EC2 instance.
I used the `t3.large` instance type as it meets the requirements of the tutorial.
You might not need an instance that large, but since this will be used throughout the course, I decided to use the appropriate capacity and maybe use it for other purposes as well.

The guide also suggests removing all firewalls for the sake of this tutorial.
It's insecure, but I allowed all ingress and egress connections from any port and any source (`0.0.0.0/0`).

I was feeling lazy, so I did not create an Infrastructure as Code (IaC) setup for this; I did it through the console.
I might set up IaC and import things in the future, as I will be adding more stuff along the course.

### Initial Configuration

After provisioning the instance, several things need to be done, as this is a fresh instance.
Before doing these steps, you will need to execute this as root.
You should type in `sudo -i`.
Here are the shell commands that need to be executed.

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
In this step, we are preparing the instance for the installation of Kubernetes.
We are installing dependencies that Kubernetes might use during the installation process and at runtime.
Additionally, we are disabling swap and loading the required modules for the kernel to use.
After modifying some values under `/etc/sysctl.d/kubernetes.conf`, we apply the changes to the kernel by running `sysctl --system`.

### Installing `containerd`

Quoting [Kubernetes' official documentation](https://kubernetes.io/):

> *Kubernetes is an open-source **container orchestration** system...*

Hence, we will need a runtime/engine to run the containers.
Quoting [`containerd`'s official documentation](https://containerd.io/):

> *An industry-standard **container runtime** with an emphasis on simplicity, robustness, and portability.*

In the past, people used `docker`, but it was replaced in Kubernetes v1.20.
This brought some confusion to users, but ultimately, nothing changed in how we use Kubernetes.
Nowadays, `containerd` is widely used among users and even cloud providers.

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

# set up the default config
containerd config default | tee /etc/containerd/config.toml

# since we're using systemd, change this line in the config
sed -e 's/SystemdCgroup = false/SystemdCgroup = true/g' -i /etc/containerd/config.toml

# restart containerd to reload the config
systemctl restart containerd
```

Using these commands, we are adding the keyring to enable us to install `containerd`.
After setting up the default config, since I am using Ubuntu and `systemd`, I changed the line in the config.
A service restart for `containerd` is required after a configuration change.

### Installing `kubeadm`, `kubelet`, `kubectl`

For those who are new to Kubernetes, here is what each installed component is used for:

- `kubeadm`: a CLI tool to prepare a Kubernetes Node.
- `kubelet`: an agent that runs on each Kubernetes node.
- `kubectl`: a CLI tool to connect to a Kubernetes cluster.

To install those tools, you can use these shell commands:

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

> The use of `apt-mark hold` here is for the sake of the tutorial/guide, as in a later exercise, I'll be upgrading the cluster.

### Getting the `calico` Manifest

In order for containers to communicate with each other, they need to have connectivity with each other by creating a network.
However, since we are running containers on a machine, we will need to simulate the network.
This is where the Container Network Interface (CNI) comes in, which is used to handle anything related to connectivity in our cluster (pod-to-pod, pod-to-service, pod-to-external, etc.).

The YAML manifest is available on [`calico`'s GitHub](https://github.com/projectcalico/calico).

```sh
wget https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml

```
After obtaining the YAML manifest, the next step is to check its contents to get the default IPv4 pool used by `calico`.
You can search for it using `vim` or any text editor you are used to.
You can find it in these lines:

```yaml
- name: CALICO_IPV4POOL_CIDR
  value: "192.168.0.0/16" # <--- this
```

This value (`192.168.0.0/16`) will be useful later on for setting up our cluster.

### Setting Up the Control Plane using `kubeadm`

> *Here comes the interesting part 🤓*

After completing all of these preparations, it's time to start setting up our control plane node.

First, we need to get our host's IP address.
You can get the value by typing either `hostname -i` or `ip addr show`.

Using the obtained value, add an entry to `/etc/hosts` and map it to `k8scp`.
This is used as an internal hostname resolver, in other words, to resolve this node by name locally.
Add a line at the top of the `/etc/hosts` file like this: `xxx.xxx.xxx.xxx k8scp`.

Next, create an additional file named `kubeadm-config.yaml`.
Here is its content:

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: stable
controlPlaneEndpoint: "k8scp:6443" # referring to self, resolved in `/etc/hosts`
networking:
  podSubnet: 192.168.0.0/16 # match with calico's config

```
This file is used by `kubeadm` to bootstrap the cluster.
Ensure that `controlPlaneEndpoint` contains the hostname you wrote in `/etc/hosts`.
Also, make sure the value of `networking.podSubnet` matches what you set for `calico`'s IPv4 pool if you changed it.

After verifying, run this command.
The `tee` command is used to pipe the output into a file for review if needed.

```sh
kubeadm init --config=kubeadm-config.yaml --upload-certs | tee kubeadm-init.out

```
Since we are done with administrative tasks, it's a good step to exit from the `root` user.

```sh
exit

```
### Checking the Cluster

After running the previous command, there should be some instructions printed out.
The instructions guide you on how to access the cluster.

The guide/tutorial has provided me with a set of commands that are a modified version of the output.
These commands simply copy the file from the `root` user and give ownership of the copied file to our user.

```sh
# copy the generated kubeconfig file for the non-root user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# display the kubeconfig
less .kube/config
```

You can now try some basic commands, such as `kubectl get nodes`, to preview the nodes that are part of your newly created cluster.
Since we are only provisioning the control plane, there should only be one node shown!

### Installing `calico`

Before concluding the guide, let's install `calico`.

```sh
# copy the calico manifest from the root/sudo user
sudo cp /root/calico.yaml .

# apply the calico manifest
kubectl apply -f calico.yaml
```

## Final Thoughts

> *And we're done!* 🎉

I found the setup process very interesting and insightful.
It's enlightening to know how managed services in the background are created.
It also sparks my interest in how tools like `kubespray` are developed and thought out.
Based on these steps, I strongly believe that these processes are highly automatable.

In the next guide, I'll continue with adding a new (worker) node to this cluster.
