<template>

<BButton 
pill 
class="btn" 
v-show="buttonActive" 
@click="pageTop"
>トップへ</BButton>

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
        bottom:101px;
        right:100px;
    }
}

@media(max-width:767px){
    .btn{
        bottom:133px;
        right:50px;
        width:90px;
        height:30px;
    }
}

</style>