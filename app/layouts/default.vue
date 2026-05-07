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
</script>