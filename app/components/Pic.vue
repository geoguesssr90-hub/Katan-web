<script setup>

import img1 from '@/assets/images/catan-1.jpg'
import img2 from '@/assets/images/catan-2.jpg'
import img3 from '@/assets/images/catan-3.jpg'

</script>

<template>
    <BCarousel
    ref="myCarousel"
    :interval="5000"
    controls
    indicators
    ride="carousel"
    >
    <BCarouselSlide class="img" :img-src="img1" />
    <BCarouselSlide class="img" :img-src="img2"/>
    <BCarouselSlide class="img" :img-src="img3"/>
    </BCarousel>
</template>

<style scoped>

.img{
    width:100%;
    height:500px;
}

</style>