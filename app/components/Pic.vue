<script setup>

import img1 from '@/assets/images/catan-1.jpg'
import img2 from '@/assets/images/catan-2.jpg'
import img3 from '@/assets/images/catan-3.jpg'

</script>

<template>
    <BCarousel
    ref="myCarousel"
    :interval="10000"
    controls
    indicators
    ride="carousel"
    >
    <BCarouselSlide :img-src="img1" />
    <BCarouselSlide :img-src="img2"/>
    <BCarouselSlide :img-src="img3"/>
    </BCarousel>
</template>