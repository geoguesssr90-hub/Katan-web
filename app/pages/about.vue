<template>
  <div>
    <Scrollspy :title="title" :sections="sections">
        <template #section1><Descriptions e="about-start" /></template>
        <template #section2><Descriptions e="about-rule" /></template>       
    </Scrollspy>
    <NuxtLink to="/">カタンについて</NuxtLink>
  </div>
</template>

<script setup lang="ts">

import Scrollspy from '~/components/Scrollspy.vue'

const title = 'カタンルール説明'
const sections = [
    {id:'section1', label:'ルール概要'},
    {id:'section2', label:'ルールのはじめ'}
]

useHead({
  title:'カタンルール説明',
  meta: [
    {name: 'description', content: 'カタンルール概要、カタンルール詳細'},
    {property: 'og:url', content: 'https://catan-web-one.vercel.app/about'},
    {property: 'og:title', content: 'カタンルール説明 | カタン非公式団体'}
  ]
})

</script>