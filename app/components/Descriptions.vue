<script setup>
defineProps({
    e:String
})
</script>
<template>
<div class="div" v-if = "e === 'start'">
    <p>
    ようこそ、未開の島「カタン」へ！<br />
    あなたと仲間の探検者たちは、六角形の地形が広がる無人の島を見渡し、この独特な土地がそれぞれの新しい生活の場になることに気づきます。
    </p>
</div>
<div class="div" v-if = "e === 'proposal'">
    <p>
    自分の手番中に、最初に10ポイントに到達したプレイヤーが勝利します。</br>建設によって勝利店を獲得します
    </p>
</div>

<div class="div" v-if = "e === 'points'">
    <p>
        <ul>
            <li>開拓地：1P</li>
            <li>都市：2P</li>
            <li>最長交易路：2P</li>
            <li>最大騎士力：2P</li>
            <li>勝利店カード：1P</li>
        </ul>
    </p>
</div>
</template>

<style scoped>

.div{
    font-size:18px;
    margin:15px;
    margin-top:2px;
    padding:10px;
    padding-top:2px;
}

</style>