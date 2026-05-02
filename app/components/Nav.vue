<script setup>
const taps=ref(['新規登録','色々'])
const urls=ref(['##','###'])
</script>


<template>
<nav id="nav" class="navbar navbar-expand-sm navbar-dark">
    <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/"><i class="bi bi-house-door" style="font-size: 2rem;"></i></NuxtLink>
        <button class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li v-for = "(tap,index) in taps" :key="tap" class="nav-item active">
                    <NuxtLink class="nav-link" :to="urls[index]">{{ tap }}</NuxtLink>
                </li>
                    <Drop
                    title="エクスポーto" 
                    :texts="['aiueo','kakikukeko']"
                    :urls="['#','##']"
                    />
            </ul>
        </div>
    </div>
</nav>    
</template>


<style scoped>

:deep(#navbarNav){
    text-align: right;
    margin:0;
    padding:10px;
}

.nav-item{
    padding:0px;
}

.dropdown-menu{
    text-align:right;
    background-color: #1b4506;
}

#nav{
    margin:0 !important;
    padding:9px;
    background-color: #1b4506 !important;
}


</style>