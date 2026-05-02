<script setup>
  import '@/assets/css/pageTop.css'

</script>

<template>
  <head>
    <meta name=”viewport” content="width=device-width, initial-scale=1"> 
  </head>
  <div id="containment-area">
    <div id="content-area">
      <Header/>
      <Nav />     
      <BCarousel
        ref="myCarousel"
        :interval="10000"
        controls
        indicators
        ride="carousel"
      >
        <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=25" />
        <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=26" />
        <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=27" />
      </BCarousel>
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

</template>
