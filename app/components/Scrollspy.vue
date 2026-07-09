<template>
  <BContainer id="container-area" fluid>
    <BRow>
      <BCol :cols="isMobile ? 12 : 9" id="right-box">
        <div ref="scrollContent">
          <template v-for="section in sections" :key="section.id">
            <h4 :id="section.id">{{ section.label }}</h4>
            <slot :name="section.id" />
          </template>
        </div>
      </BCol>

      <BCol v-if="!isMobile" cols="3" id="left-box">
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

  <!-- スマホ版: 本文は常に表示し、目次はボタンで開閉するメニューにする -->
  <template v-if="isMobile">
    <button type="button" class="toc-fab" @click="menuOpen = !menuOpen">
      <span class="toc-fab-icon">{{ menuOpen ? '✕' : '☰' }}</span>
      目次
    </button>

    <div v-if="menuOpen" class="toc-overlay" @click="menuOpen = false"></div>

    <nav class="toc-menu" :class="{ 'toc-menu--open': menuOpen }">
      <p class="toc-title">{{ title }}</p>
      <hr />
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#${section.id}`"
        class="toc-menu-item"
        @click.prevent="selectSection(section.id)"
      >
        {{ section.label }}
      </a>
    </nav>
  </template>
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

// スマホ版は目次サイドバーが本文を圧迫するので、
// 本文は常に表示したまま目次はボタンで開閉するメニューにする
const isMobile = ref(false)
const menuOpen = ref(false)

function updateIsMobile() {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

function selectSection(id: string) {
  menuOpen.value = false
  scrollTo(id)
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})
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

/* スマホ版: 目次を開くためのボタン（右下固定） */
.toc-fab{
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 1050;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border: none;
    border-radius: 24px;
    background-color: #0d6efd;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.toc-fab-icon{
    font-size: 16px;
    line-height: 1;
}

/* メニュー背後のオーバーレイ（タップで閉じる） */
.toc-overlay{
    position: fixed;
    inset: 0;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.4);
}

/* 目次メニュー本体（右からスライドイン） */
.toc-menu{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1045;
    width: 70%;
    max-width: 280px;
    height: 100%;
    padding: 16px;
    background-color: #fff;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.25s ease;
    overflow-y: auto;
}

.toc-menu--open{
    transform: translateX(0);
}

.toc-menu-item{
    display: block;
    padding: 12px 8px;
    border-bottom: 1px solid #eee;
    color: #333;
    text-decoration: none;
    font-size: 15px;
}

.toc-menu-item:hover{
    background-color: #f5f5f5;
}
</style>