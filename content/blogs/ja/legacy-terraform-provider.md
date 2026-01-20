---
blog: true
title: レガシーTerraformプロバイダーの更新
description: レガシーTerraformプロバイダーとプロジェクトの更新に関する短いガイド。
author: mkamadeus
date: 2023-12-02
duration: 1
---

::TableOfContents
::

## 背景

作業中に、まだTerraform 0.12を使用しているレガシープロジェクトがあることを発見しました。これは最新のTerraformプロジェクトと比べて機能面で大きく遅れています。
これはレガシーTerraformプロバイダーとプロジェクトを更新する方法についての短いガイドです。

## プロジェクトのアップグレード

### プロジェクト内のバージョンの更新

プロバイダーのバージョンを更新する必要があります。これは`terraform`ブロック内の`required_providers`ブロックを更新することで行います。

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

`terraform init`を実行してプロジェクトを初期化した後、次のようなエラーメッセージが表示される場合があります：

```
Error: Invalid legacy provider address

This configuration or its associated state refers to the unqualified provider
"aws".

You must complete the Terraform 0.13 upgrade process before upgrading to later
versions.
```

### Terraformプロバイダー状態のアップグレード

前のメッセージは、古いプロバイダーがあることを意味します。
Terraform 0.13からのアップグレードプロセスをスキップしたため、状態を手動でアップグレードする必要があります。

次のコマンドを実行して状態をアップグレードします：

```bash
terraform state replace-provider registry.terraform.io/-/aws registry.terraform.io/hashicorp/aws
```

確認のプロンプトが表示されます。
プロンプトをスキップするには、`-auto-approve`フラグを使用できます。

プロセスが成功した場合、`terraform init`を実行してプロジェクトの初期化を続行してください。

## 私のTaskfile

これを頻繁に行うことがわかったので、プロセスを自動化する必要がありました。
プロジェクトの更新プロセスを自動化するために[Taskfile](https://taskfile.dev)を使用しています。
Taskfileのグローバルタスク機能を使用することで、任意のディレクトリ/プロジェクトでこれを実行できます。
また、プロジェクトの長期的な維持を確保するために、いくつかのクリーンアップと検証も追加しました🙂

私が使用しているTaskfileは次のとおりです：

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