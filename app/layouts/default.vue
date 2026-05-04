<template>

<header class="sticky-top"><Menu /></header> 

  <div id="containment-area">
    <div id="content-area"> 
      <main id="main-area">
        <div class="container">
          <div class="row">
          <div class="h1">
            <div class="top">
            </div>
            <div>
              <div id="scroll"><Scrollspy /></div>
              <BListGroup>
                <BListGroupItem href="#" variant="primary">TOPへ</BListGroupItem>
              </BListGroup>
              <NuxtPage />
              <NuxtLink to="/about">カタンルール説明</NuxtLink> 
            </div>
        </div>
        </div>
      </div>
      </main>
    </div> 
  </div>
</template>


<script setup lang="ts">
import '@/assets/css/pageTop.css'
import * as bootstrap from 'bootstrap'
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let scrollspy: bootstrap.ScrollSpy | null = null

const initScrollspy = () => {
  scrollspy?.dispose()
  setTimeout(() => {
    scrollspy = new bootstrap.ScrollSpy(document.body, {
      target: '#toc-nav',
      smoothScroll: true,
      rootMargin: '0px 0px -40%',
    })
  }, 100)
}

watch(() => route.path, initScrollspy)
onMounted(initScrollspy)
onUnmounted(() => scrollspy?.dispose())
</script>