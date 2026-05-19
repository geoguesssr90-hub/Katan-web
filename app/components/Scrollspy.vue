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
              @click.prevent="scrollTo(section.id)"
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

const HEADER_OFFSET = 72 + 15// nav-sticky の top と同じ値

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: y, behavior: 'smooth' })
}
</script>

<style scoped>
#container-area {
  padding: 0 1rem;
}

/* 目次をスクロールしても追従させる */
#nav-sticky {
    position: sticky;
    top: 72px;      /* ヘッダーがある場合はその高さに合わせる */
    border-left: 1px solid #dee2e6;  /* 左に区切り線 */
    padding-left: 1rem;
}

@media(min-width:768px){
    #nav-sticky{
        font-size:small;
    }

    #right-box{
      padding:40px
    }
}

@media(max-width:767px){
    #nav-sticky{
        font-size:7px;
        padding:0 !important;
    }

    #left-box{
        padding:0;
    }

    #right-box{
      padding:25px;
    }
}

/* コンテンツ側はスクロールさせない（ページ全体でスクロール） */
#right-box {    
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