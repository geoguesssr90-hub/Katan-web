<template>
  <div>
    <Scrollspy :title="title" :sections="sections">
        <template #section1><Descriptions e="about-start" /></template>       
    </Scrollspy>
    <NuxtLink to="/">カタンについて</NuxtLink>
  </div>
</template>

<script setup lang="ts">

import Scrollspy from '~/components/Scrollspy.vue'

const title = 'カタンルール説明'
const sections = [
    {id:'section1', label:'ルール概要'}
]

</script>