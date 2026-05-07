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
</template>

<script setup lang="ts">
import '@/assets/css/pageTop.css'
</script>

<style scoped>

#main{
    background-color: #f8f9fa;
}

</style>