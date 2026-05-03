<script setup>
  import '@/assets/css/pageTop.css'

</script>

<template>
  <head>
        <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SQS5BFD87G"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-SQS5BFD87G');
    </script>
    <meta name=”viewport” content="width=device-width, initial-scale=1"> 
  </head>


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
