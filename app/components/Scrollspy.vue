<template>
  <BContainer id="container-area" fluid>
    <BRow>
      <!-- コンテンツ（左・広い） -->
      <BCol cols="9" id="right-box">
        <div ref="scrollContent">
          <h4 id="section1">はじめに</h4>
          <p><Descriptions e="start"/></p>

          <h4 id="section2">目的</h4>
          <p><Descriptions e="proposal"/></p>

          <h4 id="section3">ポイント</h4>
          <p><Descriptions e="points"/></p>
        </div>
      </BCol>

      <!-- 目次（右・細い） -->
      <BCol cols="3" id="left-box">
        <div id="nav-sticky">
          <BNav ref="navTarget" pills vertical>
            <p class="toc-title">カタンについて</p>
            <hr />
            <BNavItem href="#section1" @click="scrollIntoView">はじめに</BNavItem>
            <BNavItem href="#section2" @click="scrollIntoView">目的</BNavItem>
            <BNavItem href="#section3" @click="scrollIntoView">ポイント</BNavItem>
          </BNav>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useScrollspy } from 'bootstrap-vue-next'

const scrollContent = useTemplateRef('scrollContent')
const navTarget = useTemplateRef('navTarget')

const { scrollIntoView } = useScrollspy(scrollContent, navTarget)
</script>

<style scoped>
#container-area {
  padding: 0 1rem;
}

/* 目次をスクロールしても追従させる */
#nav-sticky {
    position: sticky;
    top: 56px;        /* ヘッダーがある場合はその高さに合わせる */
    font-size: small;
    border-left: 1px solid #dee2e6;  /* 左に区切り線 */
    padding-left: 1rem;
}

/* コンテンツ側はスクロールさせない（ページ全体でスクロール） */
#right-box {
  padding: 1rem;
}

.toc-title{
    font-size: 100%;
    font-weight: bold;
    color: #333;
    margin: 10%;
    margin-bottom: 0;
}
</style>