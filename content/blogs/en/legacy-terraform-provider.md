---
blog: true
title: Updating Legacy Terraform Provider
description: Short guide on updating legacy Terraform provider and project.
author: mkamadeus
date: 2023-12-02
duration: 1
---

::TableOfContents
::

## Background

Working on stuff, I found out that there are some legacy projects that still use Terraform 0.12, which is far behind feature-wise with the latest Terraform project.
This is a short guide on how to update the legacy Terraform provider and project.

## Upgrading the Project

### Bumping Versions in the project

We need to update the provider version. This is done by updating the `required_providers` block in the `terraform` block.

```hcl
terraform {
  version = "~> 1.5.7" # update this

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.2.2" # update this
    }
  }
}
```

After initializing the project by running `terraform init`, you might get an error message like this:

```
Error: Invalid legacy provider address

This configuration or its associated state refers to the unqualified provider
"aws".

You must complete the Terraform 0.13 upgrade process before upgrading to later
versions.
```

### Upgrading Terraform Provider State

Prior message means there are some providers that are outdated.
Because we skipped the upgrade process from Terraform 0.13, we need to upgrade the state manually.

Run the following command to upgrade the state:

```bash
terraform state replace-provider registry.terraform.io/-/aws registry.terraform.io/hashicorp/aws
```

There will a be prompt to confirm.
To skip the prompt, you can use the `-auto-approve` flag.

If the process is successful, continue ahead with initializing the project by running `terraform init`.

## My Taskfile

Since I found myself doing this a lot, I got the need to automate the process.
I use [Taskfile](https://taskfile.dev) to automate the process of updating the project.
Using Taskfile's global tasks feature, I can run this in any directory/project.
I also added some cleanups and validations to ensure project longetivity 🙂

Here's the Taskfile that I use:

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
