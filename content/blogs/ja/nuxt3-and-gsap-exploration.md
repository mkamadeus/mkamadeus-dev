---
blog: true
title: Nuxt 3とGSAPの探求
description: サイトでのアニメーションにNuxt 3とGSAPを使用した私の探求。
author: mkamadeus
date: 2024-03-03
duration: 3
---

::TableOfContents
::

しばらくNuxt 3を使用しており、サイトをアニメーション化するさまざまな方法を探求してきました。
以前はCSSアニメーションとトランジションを利用していましたが、スケーラブルで保守可能ではありませんでした。

GSAPがWebでのアニメーション（GoogleやAppleなどの大企業でも）で使用されることで知られていることを思い出しました。
テストする時間があったので、私がWebサイトプロジェクトで使用しているメインフレームワークであるNuxt 3とGSAPを統合してみました。
試してみて、Nuxt 3でどのように動作するかを確認することにしました。

## GSAPのインストール

インストールプロセスは非常に簡単です。
Nuxt 3で他のパッケージをインストールするのと変わりません。
パッケージマネージャーによって、以下のコマンドは異なる場合があります。

```bash
pnpm add -D gsap
```

## GSAPとNuxt 3の統合

> TL;DR: GSAPを初期化し、グローバルに利用可能にするプラグインを作成しました。

理論的には、GSAPは以下のように各コンポーネントでインポートすることで、コンポーネント内で直接使用できます：

```ts
import { gsap } from 'gsap';
```

GSAPドキュメントを読んでいると、GSAPには複雑なアニメーションを作成するために使用できる強力なプラグインがあることがわかりました。
ドキュメントによると、アニメーション全体で使用する前に一度インスタンス化する必要があります。
したがって、GSAPフォーラムの1つでも提案されているように、代わりにNuxt 3プラグインシステム（`plugins/`下）を使用することにしました。
そうすることで、GSAPインスタンスをアプリケーション全体でグローバルに利用可能にし、どのGSAPプラグインが使用されているかを明確にできます。

`plugins`ディレクトリに新しいファイルを作成し、`gsap.ts`と名前を付けて、以下のコードを追加しました：

```ts
import { gsap } from 'gsap'

// import your plugins here
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'

export default defineNuxtPlugin(() => {

  // register the plugins
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CSSPlugin)

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
```

> 理論的には、GSAPはDOM要素が操作可能になったときにのみロードされ使用されるため、代わりに`gsap.client.ts`を使用することもできます。

## Nuxt 3でのGSAPの使用

プラグインが作成された後、コンポーネントでGSAPを使用できるようになりました。
Nuxtのプラグインシステムの素晴らしい点は、各コンポーネントでインポートすることなく、GSAPインスタンスを直接参照できることです。
コンポーネントの`script`タグ下で、以下のようにGSAPを使用できます：

```ts
const { $gsap } = useNuxtApp()
```

ここでの`$gsap`は、私が作成した前のプラグインによって提供されます。
その後、`$gsap`を使用してコンポーネント内でアニメーションを作成できます。

GSAPドキュメントを再度確認すると、GSAPには`gsap.Context`があり、コンポーネント内でアニメーションのライフサイクルを制御するベストプラクティスとして使用すべきであることがわかりました。
コンポーネントがDOMからアンマウントされた直後に、メモリリークを防ぐためにアニメーションをクリーンアップする必要があります。
`gsap.Context`を使用することで、`kill()`メソッドを呼び出すことでこれらを簡単に処理できます。

```ts
let ctx: gsap.Context

onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(element.value!, { autoAlpha: 1 })
    tl.fromTo(element.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.play()
  }, wrapper.value!)
})

onUnmounted(() => {
  ctx.kill()
})
```

私が行ったすべての簡略版は次のとおりです：

```vue
<script setup lang="ts">
const element = ref()
const { $gsap } = useNuxtApp()

let ctx: gsap.Context

onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.set(element.value!, { autoAlpha: 1 })
    tl.fromTo(element.value!, { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
    tl.play()
  }, wrapper.value!)
})

onUnmounted(() => {
  ctx.kill()
})
</script>

<template>
  <div>
    <div ref="element">
      Lorem Ipsum Dolor Sit Amet
    </div>
  </div>
</template>
```

## 結論

しばらくGSAPを使用しており、アニメーション作成のための優れたツールだと言えます。
このサイトでは、GSAPを利用してページへのテキストエントリをアニメーション化するためのシンプルなアニメーションをシーケンスしました。
将来的には、より複雑なアニメーションを探求し、より多くのGSAPプラグインを利用して、特に大規模なプロジェクトや3D空間でより複雑なアニメーションを作成できることを願っています🚀