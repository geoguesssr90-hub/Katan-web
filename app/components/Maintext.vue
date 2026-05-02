<script setup>

</script>

<template>
    <ul class="page">
        <li class="li">はじめに</li>
        <Descriptions e="start"/>
        <li class="li">目的</li>
        <Descriptions e="proposal" />
        <li class="li">ポイント</li>
        <Descriptions e="points" />
    </ul>
</template>

<style scoped>

.li{
    font-size:30px
}

.page{ 
    margin:10px;
    padding:20px;
    color:black;
    font-family: "リュウミン R-KL", "Ryumin Regular KL", "游明朝", "YuMincho", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", serif;
}

</style>