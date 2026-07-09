<template>
  <div>
    <h1 class="page-title">盤面で遊んでみる</h1>
    <CatanPlayBoard />
    <NuxtLink to="/">カタンについて</NuxtLink>
  </div>
</template>

<script setup lang="ts">

useHead({
  title: '盤面で遊んでみる',
  meta: [
    {name: 'description', content: 'カタンの盤面で開拓地の配置とサイコロを実際に試せるページ'},
    {property: 'og:url', content: 'https://catan-web-one.vercel.app/play'},
    {property: 'og:title', content: '盤面で遊んでみる | カタン非公式団体'}
  ]
})

</script>

<style scoped>

.page-title{
    text-align: center;
    font-size: 22px;
    margin: 16px 0;
}

</style>
