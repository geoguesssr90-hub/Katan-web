<script setup></script>

<template>
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
</template>