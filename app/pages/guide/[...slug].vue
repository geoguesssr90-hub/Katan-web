<template>
  <div class="guide-page">
    <ContentRenderer v-if="current" :value="current" class="guide-body" />
    <div v-else class="guide-missing">
      <p>ガイドが見つかりませんでした。</p>
      <NuxtLink :to="firstPath">最初のページへ</NuxtLink>
    </div>

    <nav v-if="current" class="guide-nav">
      <NuxtLink v-if="prev" :to="prev.path" class="guide-nav-link guide-nav-prev">
        前へ<span class="guide-nav-title">{{ prev.title }}</span>
      </NuxtLink>
      <span v-else class="guide-nav-spacer"></span>

      <span class="guide-nav-position">{{ position }} / {{ list.length }}</span>

      <NuxtLink v-if="next" :to="next.path" class="guide-nav-link guide-nav-next">
        次へ<span class="guide-nav-title">{{ next.title }}</span>
      </NuxtLink>
      <span v-else class="guide-nav-spacer"></span>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// ガイド全記事を取得し、frontmatter の order で並べる
const { data: docs } = await useAsyncData('guide-all', () =>
  queryCollection('guide').all()
)

const list = computed(() =>
  [...(docs.value ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
)

const currentIndex = computed(() =>
  list.value.findIndex(d => d.path === route.path)
)
const current = computed(() => list.value[currentIndex.value] ?? null)
const position = computed(() => currentIndex.value + 1)
const prev = computed(() =>
  currentIndex.value > 0 ? list.value[currentIndex.value - 1] : null
)
const next = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < list.value.length - 1
    ? list.value[currentIndex.value + 1]
    : null
)
const firstPath = computed(() => list.value[0]?.path ?? '/')

useHead(() => ({
  title: current.value ? `${current.value.title} | 初心者ガイド` : '初心者ガイド',
}))
</script>

<style scoped>
.guide-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.guide-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 40px;
  padding-top: 16px;
  border-top: 1px solid #dee2e6;
}

.guide-nav-link {
  display: flex;
  flex-direction: column;
  max-width: 40%;
  color: #0d6efd;
  text-decoration: none;
  font-weight: bold;
}

.guide-nav-next {
  text-align: right;
}

.guide-nav-title {
  font-weight: normal;
  font-size: 13px;
  color: #555;
}

.guide-nav-position {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.guide-nav-spacer {
  flex: 1;
}

.guide-missing {
  text-align: center;
  color: #666;
}
</style>
