<script setup>
defineProps({
    e:String
})
</script>
<template>
<div class="div" v-if = "e === 'start'">
    <p>
        カタン(正式名:カタンの開拓者たち)は3~4人でプレイするボードゲームです。<br />島を開拓して資源を集め、建物を建てながら勝利点を10点集めた人が勝ちです。
    </p>
</div>
<div class="div" v-if = "e === 'proposal'">
    <div>
        <p>
        島は六角形のタイルで構成されています。<br />
        タイルの種類は
        </p>
        <ul>
            <li>森</li>
            <li>丘</li>
            <li>牧草地</li>
            <li>畑</li>
            <li>山</li>
        </ul>
        <p>
        の5種類で、それぞれ木材・レンガ・羊毛・穀物・鉄鉱石という資源に対応しています。各タイルには数字が書かれていて、毎ターンサイコロを振り、その目の数字のタイルに隣接する建物を持っているプレイヤーが資源をもらえます。
        </p>
    </div>
</div>

<div class="div" v-if="e==='turn'">
    <p>
        まずサイコロを振って全員が資源をもらいます。次に他のプレイヤーと資源を交換する交渉ができます。最後に資源を使って道・開拓地・都市・発展カードを建設して終わりです。
    </p>
</div>

<div class="div" v-if = "e === 'points'">
    
        <ul>
            <li>開拓地：1P</li>
            <li>都市：2P</li>
            <li>最長交易路：2P</li>
            <li>最大騎士力：2P</li>
            <li>勝利点カード：1P</li>
        </ul>
        <p>
            さらに一番長い道を持つ人がもらえる「最長街道」が2点<br />
            騎士カードを最も多く使った人がもらえる「最大騎士力」が2点<br />
            発展カードの中に勝利点カードが含まれている場合もあります。
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
        font-size:14px;
        margin:4px;
        margin-top:1px;
        padding:4px;
        padding-top:1px;
        line-height: 1.8;
    }
}


</style>