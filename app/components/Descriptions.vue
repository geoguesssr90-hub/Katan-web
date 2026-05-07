<script setup>
defineProps({
    e:String
})
</script>
<template>
<div class="div" v-if = "e === 'start'">
    <p>
    ようこそ、未開の島「カタン」へ！<br />
    あなたと仲間の探検者たちは、六角形の地形が広がる無人の島を見渡し、この独特な土地がそれぞれの新しい生活の場になることに気づきます。<br />
    あいうえお<br />
    かきくけこ<br />
    さしすせそ<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    </p>
</div>
<div class="div" v-if = "e === 'proposal'">
    <p>
    自分の手番中に、最初に10ポイントに到達したプレイヤーが勝利します。<br />建設によって勝利店を獲得します<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    あいうえお<br />
    </p>
</div>

<div class="div" v-if = "e === 'points'">
    
        <ul>
            <li>開拓地：1P</li>
            <li>都市：2P</li>
            <li>最長交易路：2P</li>
            <li>最大騎士力：2P</li>
            <li>勝利店カード：1P</li>
        </ul>
        <p>
                    あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
            あいうえお<br />
    </p>
</div>
<div class="div" v-if = "e === 'about-start'">
    <p>
        ルールの説明をこれからしていきます
    </p>
</div>
<div class="div" v-if = "e === 'about-rule'">
    <p>
        ルールは誰かが10点を獲得するまで続けて、10点獲得した人が誰か現れたら、その時点で終わりです。
    </p>
</div>
</template>

<style scoped>

@media(min-width:768px){

.div{
    height:100%;
    font-size:20px;
    margin:15px;
    margin-top:2px;
    padding:10px;
    padding-top:2px;
    line-height: 1.8;
    max-width: 700px;
}

}

@media(max-width:767px){
    .div{
        height:100%;
        font-size:10px !important;
        margin:4px;
        margin-top:1px;
        padding:4px;
        padding-top:1px;
    }
}


</style>