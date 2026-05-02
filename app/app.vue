<script setup>
  import '@/assets/css/pageTop.css'

</script>

<template>
  <div id="containment-area">
    <div id="content-area">
      <Header />
      <Nav />
      <main id="main-area">
        <div>
          <h1 class="h1">カタンルール紹介</h1>
          <ul class="page">
            <li>カタンとは</li>
            <Aboutkatan />
            <li>ゲームの進め方</li>
          </ul>
        </div>
      </main>
    </div> 
  </div>
</template>
