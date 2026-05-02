<template>
  <BContainer>
    <BRow>
      <BCol cols="4">
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
      <BCol cols="8">
        <div
          ref="scrollContent"
          style="height: 300px; overflow-y: auto; border: 1px solid #dee2e6; padding: 1rem"
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

