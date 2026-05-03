<script setup>
  import '@/assets/css/pageTop.css'

</script>

<template>
  <head>
    <meta name=”viewport” content="width=device-width, initial-scale=1"> 
  </head>


  <body>
  <div id="containment-area">
    <div id="content-area">
      <Header/>
      <Menu />
      <Pic />    
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
            </div>
          </h1>
        </div>
      </div>

      </main>
    </div> 
  </div>
</body>

</template>
