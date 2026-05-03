<script setup>
</script>

<template>
<div id="header-wrap" style="top:0px; left:0px;">
    <div id="header-area" class="Headers">
        <header id="header-content">
            <div class="header-logo">
                <div class="inner">
                カタン公式ルール（非公式団体）
                <BBadge>New</BBadge>
                </div>
            </div>
        </header>
    </div>
</div>
</template>

<style scoped>
#header-wrap{
    position: sticky;
}
#header-content{
    flex-shrink: 0;
    background-color: #57b0d9;
    margin:0;
    padding:0;
    font-size: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

}

#header-content.scrolled{
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.header-logo{   
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(16px, 5vw, 40px);
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.inner{
color:white;
font-family: noto-sans, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
border-bottom: 5px solid #3eb370;
flex-shrink: 0;
}
</style>