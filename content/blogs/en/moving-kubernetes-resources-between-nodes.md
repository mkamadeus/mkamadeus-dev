---
blog: true
title: Moving Kubernetes Resources Between Nodes
description: A short guide on how to move resources that has been provisioned inside Kubernetes in order to make changes to a node.
author: mkamadeus
date: 2022-11-27
duration: 2
---

::TableOfContents
::

## Background

I provisioned a new Kubernetes cluster for my work.
Using AWS Elastic Kubernetes Service and provided template, a cluster can be provisioned and set up with the apps required relatively quickly.
However, I noticed a configuration is wrong, particularly one of the node are not set properly.
I already set up the apps for autoscaling, disaster recovery, etc.
Instead of restarting my progress, I would like to keep the apps installed.

## Procedure

TLDR; the procedure to move resources from a node to another is as follows:

1. Provision a temporary worker node.
2. Cordon all nodes other than your broken node and the temporary worker node.
3. Drain the broken node so the resources move to the temporary node.
4. Reprovsion your broken node with correct parameters.
5. Cordon the temporary node so the resources move to the fixed node.
6. Uncordon the other nodes.

> This procedure is flexible and can be adapted to different cases of node reprovisioning.

## Explanation

### Provisioning Temporary Node

Since the node has already been provisioned, Kubernetes can't simply fix the problem by its own.
Hence, we need to add this temporary node in order to move the resources here temporarily.
Provision the node according to how you would do it in your own system since it may vary.

### Cordoning Nodes

Cordoning nodes is marking a node as unschedulable.
This doesn't apply to resources that has been scheduled there.
We do this to avoid resources moving into unwanted nodes.
I'm using `k9s`, but you can do the same in `kubectl`.

```sh
kubectl get nodes
kubectl cordon NODE
```

### Draining Nodes

Draining is cordoning with added step, which is to "drain" the resources i.e move it to another node.
After marking a node as unschedulable (cordoning), the resources will be moved to an available node.
If we have cordoned the nodes other than our temporary node, it should move to the temporary node.

```sh
kubectl get nodes
kubectl drain NODE
```

### Reprovisioning the Node

In my case, I provisioned the node in the wrong subnet.
No way to fix this node other than reprovisioning, hence why I got into cordoning and draining the nodes.
These steps would be irrelevant to you if you don't need to reprovision the node.

### Uncordoning the Node

As the name suggest, this is the opposite of cordoning a node.
This step makes the nodes schedulable again after you have finished the migration process.

```sh
kubectl get nodes
kubectl uncordon NODE
```

## Conclusion

These steps can be followed to update a broken node.
These steps also provide a general framework to update a broken node.
With that said, I hope you learned something on Kubernetes 😀
