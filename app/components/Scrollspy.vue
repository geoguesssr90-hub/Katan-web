<template>
  <BContainer v-if="!isMobile" id="container-area" fluid>
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

  <div v-else class="mobile-accordion">
    <p class="toc-title">{{ title }}</p>
    <div v-for="section in sections" :key="section.id" class="accordion-item">
      <button
        type="button"
        class="accordion-header"
        :aria-expanded="activeSection === section.id"
        @click="toggleSection(section.id)"
      >
        <span>{{ section.label }}</span>
        <span class="accordion-icon">{{ activeSection === section.id ? '▲' : '▼' }}</span>
      </button>
      <div class="accordion-panel" v-show="activeSection === section.id">
        <slot :name="section.id" />
      </div>
    </div>
  </div>
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

// スマホ版は目次+全セクション表示だと画面が狭くなるので、
// タップしたセクションだけ開くアコーディオン表示に切り替える
const isMobile = ref(false)
const activeSection = ref<string | null>(null)

function updateIsMobile() {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

function toggleSection(id: string) {
  activeSection.value = activeSection.value === id ? null : id
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

/* スマホ版: 目次は縦一列、選択したセクションだけ開くアコーディオン */
.mobile-accordion{
    padding: 0 8px;
}

.accordion-item{
    border-bottom: 1px solid #dee2e6;
}

.accordion-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 4px;
    background: none;
    border: none;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    color: #333;
}

.accordion-icon{
    font-size: 11px;
    color: #666;
}

.accordion-panel{
    padding: 4px 4px 12px;
}
</style>