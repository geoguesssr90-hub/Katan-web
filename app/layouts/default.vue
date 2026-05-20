<template>
  <header class="sticky-top">
    <Menu />
  </header>

  <main id="main">
    <NuxtPage />
  </main>

  <footer>
    <Footer />
  </footer>

  <Totop />
</template>

<script setup lang="ts">
import '@/assets/css/pageTop.css'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'カタンについて（非公式団体）',
        url: 'https://catan-web-one.vercel.app/',
        inLanguage: 'ja',
        description: 'カタンのルール、カタンルール詳細'
      })
    }
  ]
})

</script>