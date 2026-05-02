<template>
    <div id="div">
  <BContainer>
    <BRow>
      <BCol cols="4">
        <BNav
          ref="navTarget"
          pills
          vertical
        >
          <BNavItem
            href="#custom-intro"
            @click="scrollIntoView"
            >はじめに</BNavItem
          >
          <BNavItem
            href="#custom-main"
            @click="scrollIntoView"
            >目的</BNavItem
          >
          <BNavItem
            href="#custom-sidebar"
            @click="scrollIntoView"
            >ポイント</BNavItem
          >
        </BNav>
      </BCol>
      <BCol cols="8">
        <div
          ref="content"
          style="height: 300px; overflow-y: auto; border: 1px solid #dee2e6; padding: 1rem"
        >
          <div
            id="custom-intro"
            class="content-section"
          >
            <h4>はじめに</h4>
            <p>
                <Descriptions e="start"/>
            </p>
          </div>
          <div
            id="custom-main"
            class="content-section"
          >
            <h4>目的</h4>
            <p>
                <Descriptions e="proposal"/>
            </p>
          </div>
          <div
            id="custom-sidebar"
            class="content-section"
          >
            <h4>ポイント</h4>
            <p>
                <Descriptions e="points"/>
            </p>
          </div>
        </div>
      </BCol>
    </BRow>
  </BContainer>
  </div>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'



const content = useTemplateRef('content')
const navTarget = useTemplateRef('navTarget')

const {scrollIntoView} = useScrollspy(content, navTarget, {
  contentQuery: '.content-section[id]',
})
</script>

<style scoped>
#div{
    height:auto;
    width:auto;
}
</style>