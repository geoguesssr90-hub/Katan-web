<script setup>
  import '@/assets/css/pageTop.css'

</script>

<template>
  <div id="containment-area">
    <div id="content-area">
      <Header />
      <Nav />
      <main id="main-area">
        <div class="container">
          <div class="row">
          <h1 class="h1">
            <div class="top">
              <Drop class="top"
              :texts="['はじめに','目的','ポイント']"
              :urls="['#','##','###']"
              title="ルール"
               />
            </div>
            <div>
              <Maintext />
            </div>
          </h1>
        </div>
      </div>

      </main>
    </div> 
  </div>
</template>
