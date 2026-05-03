<template>
  <BContainer id="container-area">
    <BRow>
      <BCol cols="4" id="left-box">
        <BNav
          ref="navTarget"
          pills
          vertical
        >
          <BNavItem
            href="#section1"
            @click="scrollIntoView"
            >はじめに</BNavItem
          >
          <BNavItem
            href="#section2"
            @click="scrollIntoView"
            >目的</BNavItem
          >
          <BNavItem
            href="#section3"
            @click="scrollIntoView"
            >ポイント</BNavItem
          >
        </BNav>
      </BCol>
      <BCol cols="8" id="right-box">
        <div
          ref="scrollContent"
          style="height: 100%; overflow-y: auto; border: 1px solid #dee2e6; padding: 1rem"
        >
          <h4 id="section1">はじめに</h4>
          <p>
          <Descriptions e="start"/>
          </p>
          <h4 id="section2">目的</h4>
          <p>
          <Descriptions e="proposal"/>
          </p>
          <h4 id="section3">ポイント</h4>
          <p>
          <Descriptions e="points"/>
          </p>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'



const scrollContent = useTemplateRef('scrollContent')
const navTarget = useTemplateRef('navTarget')

const {scrollIntoView} = useScrollspy(scrollContent, navTarget)
</script>

<style scoped>

#left-box{
    font-size: small;
    width:20%;

}

#container-area{
    margin:10px;
    margin-left:0;
    margin-right:0;
    padding:10px;
    padding-left:0;
    padding-right:0;
    height:100%;
}

#right-box{
    height: 100%;
}

</style>