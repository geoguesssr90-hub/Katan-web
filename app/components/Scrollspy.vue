<template>
  <BContainer id="container-area" fluid>
    <BRow>
      <BCol cols="9" id="right-box">
        <div ref="scrollContent">
          <template v-for="section in sections" :key="section.id">
            <h4 :id="section.id">{{ section.label }}</h4>
            <slot :name="section.id" />
          </template>
        </div>
      </BCol>

      <BCol cols="3" id="left-box">
        <div id="nav-sticky">
          <BNav ref="navTarget" pills vertical>
            <p class="toc-title">{{ title }}</p>
            <hr />
            <BNavItem
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              @click="scrollIntoView"
            >
              {{ section.label }}
            </BNavItem>
          </BNav>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useScrollspy } from 'bootstrap-vue-next'

// ★ Props定義
const props = defineProps<{
  title: string
  sections: {
    id: string
    label: string
  }[]
}>()

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
  align-self: flex-start;
}

.toc-title{
    font-size: 100%;
    font-weight: bold;
    color: #333;
    margin: 10%;
    margin-bottom: 0;
}
</style>