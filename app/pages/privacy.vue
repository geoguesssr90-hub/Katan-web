<template>
  <div class="container py-5">
    <h1 class="mb-4">プライバシーポリシー</h1>

    <section class="mb-4">
      <h2 class="h5">運営者について</h2>
      <p>本サイト「カタンについて（非公式団体）」は、カタンに関する情報を提供する非公式の個人サイトです。</p>
    </section>

    <section class="mb-4">
      <h2 class="h5">Cookieおよびアクセス解析について</h2>
      <p>
        本サイトでは、アクセス状況を把握するためにGoogle Analytics（Google LLC）を使用しています。
        Google AnalyticsはCookieを使用して情報を収集しますが、個人を特定する情報は含まれません。
      </p>
      <p>
        収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます。<br>
        詳細は
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Googleプライバシーポリシー
        </a>
        をご確認ください。
      </p>
      <p>
        Cookieの使用を拒否する場合は、ブラウザの設定からCookieを無効にすることができます。
      </p>
    </section>

    <section class="mb-4">
      <h2 class="h5">免責事項</h2>
      <p>
        本サイトはカタンの非公式ファンサイトです。
        掲載情報の正確性には努めていますが、内容の完全性・正確性を保証するものではありません。
        本サイトの情報を利用したことによる損害について、運営者は一切の責任を負いません。
      </p>
    </section>

    <section class="mb-4">
      <h2 class="h5">著作権について</h2>
      <p>
        本サイトのコンテンツの著作権は運営者に帰属します。
        無断転載・複製はご遠慮ください。
        なお、カタンに関する商標・著作権はCatan GmbHおよび各権利者に帰属します。
      </p>
    </section>

    <section class="mb-4">
      <h2 class="h5">プライバシーポリシーの変更</h2>
      <p>
        本ポリシーは必要に応じて予告なく変更することがあります。
        最新の内容は本ページにてご確認ください。
      </p>
    </section>

    <p class="text-muted small">制定日：{{ today }}</p>
  </div>
</template>

<script setup>
const today = new Date().toLocaleDateString('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

useHead({
    title: 'プライバシーポリシー',
    meta: [
        {name: 'description', content: 'プライバシーポリシーページ'},
        {property: 'og:url', content: 'https://catan-web-one.vercel.app/privacy'},
        {property: 'og:title', content: 'プライバシーポリシー | カタン非公式団体'}
    ]
})
</script>