<template>

<BButton 
class="btn" 
v-show="buttonActive" 
@click="pageTop"
><i class="bi bi-chevron-up"></i></BButton>

</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'

const buttonActive = ref(false)

const pageTop = () => {
    window.scrollTo({ top :0, behavior: 'smooth'})
}

const scrollWindow = () => {
    buttonActive.value = window.scrollY >=100
}

onMounted(() => {
    window.addEventListener('scroll',scrollWindow)
})

onUnmounted(() => {
    window.removeEventListener('scroll',scrollWindow)
})

</script>

<style scoped>

.btn{
    position: fixed;
}

@media(min-width:768px){
    .btn{
        bottom:0px;
        right:200px;
    }
}

@media(max-width:767px){
    .btn{
        bottom:0px;
        right:50px;
    }
}

</style>