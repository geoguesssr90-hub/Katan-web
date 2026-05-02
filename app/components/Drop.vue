<script setup>
defineProps({
    texts:Array,
    title:String,
    urls:Array
})
</script>

<template>
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false"
        href="#">{{ title }}</a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <NuxtLink v-for="(text,index) in texts" :key="text" class="dropdown-item" :to="urls[index]">{{ text }}</NuxtLink>
    </div>
</li>
</template>

<style scoped>

#drop{
    text-align:right;
    background-color:#1b4506;
}

</style>