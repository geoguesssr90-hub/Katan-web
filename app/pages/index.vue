<template>
  <div id="div">
    <Scrollspy :title="title" :sections="sections">
        <template #section1><Descriptions e="start" /></template>
        <template #section2><Descriptions e="proposal" /></template>
        <template #section3><Descriptions e="points" /></template>
        <template #section4><Descriptions e="turn" /></template>
        <template #section5><CatanBoard /></template>
    </Scrollspy>
    <NuxtLink to="/about">カタンルール説明</NuxtLink>
    <br />
    <NuxtLink to="/play">開拓地を置いて遊んでみる</NuxtLink>
    <br />
    <NuxtLink to="/guide/intro">はじめてカタンを遊ぶ</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Scrollspy from '@/components/Scrollspy.vue'
import Descriptions from '~/components/Descriptions.vue';

const title='カタンについて'
const sections = [
    {id:'section1', label: 'はじめに',},
    {id:'section2', label:'目的',},
    {id:'section3', label:'ポイント',},
    {id:'section4', label:'ターンの流れ'},
    {id:'section5', label:'カタンボード'}
]

useHead({
  title:'カタンについて',
  meta: [
    {name:'description', content: 'カタンのルール、カタンポイント'},
    {property: 'og:url', content: 'https://catan-web-one.vercel.app/'},
    {property: 'og:title', content: 'カタンについて | カタン非公式団体'}
  ]
})

</script>
