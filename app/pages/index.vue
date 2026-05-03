<script setup>
  import '@/assets/css/pageTop.css'

</script>

<template>


  <body>
  <div id="containment-area">
    <div id="content-area">
      <Header/>
      <Menu /> 
      <main id="main-area">
        <div class="container">
          <div class="row">
          <h1 class="h1">
            <div class="top">
            </div>
            <div>
              <Scrollspy />
              <BListGroup>
                <BListGroupItem href="#" variant="primary">TOPへ</BListGroupItem>
              </BListGroup>
              <NuxtPage />
              <NuxtLink to="/about">カタンルール説明</NuxtLink> 
            </div>
          </h1>
        </div>
      </div>

      </main>
    </div> 
  </div>
</body>

</template>
