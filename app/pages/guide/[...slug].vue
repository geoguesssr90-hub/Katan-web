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

/* --- Markdown 本文(prose)の可読性スタイル ---
   ContentRenderer の出力は動的なので :deep() でスコープ内から届かせる。
   すべて .guide-body 配下に限定し、他ページには影響しない。 */
.guide-body {
  /* PC: 1行を日本語35〜40文字程度に抑える読書幅。rem 上限＋幅autoなので
     狭い画面では親幅いっぱい(=はみ出さない)に収まる。 */
  max-width: 36rem;
  margin: 0 auto;
  color: #212529;
  font-size: 1.05rem;
  line-height: 1.9;
  overflow-wrap: break-word;
}

/* 見出し: リンク色の継承を断ち、濃い色・下線なし・サイズ差を明確に */
.guide-body :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  line-height: 1.4;
  margin: 0 0 0.8em;
}

.guide-body :deep(h2) {
  font-size: 1.4rem;
  font-weight: 700;
  color: #343a40;
  line-height: 1.4;
  margin: 2em 0 0.6em;
  padding-bottom: 0.2em;
  border-bottom: 1px solid #e9ecef;
}

.guide-body :deep(h3) {
  font-size: 1.15rem;
  font-weight: 700;
  color: #495057;
  line-height: 1.5;
  margin: 1.6em 0 0.5em;
}

/* 見出し内アンカー(自動生成)はリンク色を継承させず本文色に */
.guide-body :deep(h1 a),
.guide-body :deep(h2 a),
.guide-body :deep(h3 a) {
  color: inherit;
  text-decoration: none;
}

/* 段落: 行間は .guide-body から継承し、段落間に十分な余白 */
.guide-body :deep(p) {
  margin: 0 0 1.8em;
}

/* リスト: 本文と同じ行間・余白 */
.guide-body :deep(ul),
.guide-body :deep(ol) {
  margin: 0 0 1.8em;
  padding-left: 1.5em;
}

.guide-body :deep(li) {
  margin: 0.2em 0;
}

/* 本文中の実リンクは従来どおりリンクらしく(見出しと区別) */
.guide-body :deep(p a),
.guide-body :deep(li a) {
  color: #0d6efd;
  text-decoration: underline;
}

/* スマホ(狭い画面): 横の余白は増やさず(.guide-page の左右16pxのみ)、
   文字をわずかに小さく・行間1.8で1行あたりの文字数を確保する */
@media (max-width: 480px) {
  .guide-body {
    font-size: 1rem;
    line-height: 1.8;
  }

  .guide-body :deep(p) {
    margin: 0 0 1.5em;
  }

  .guide-body :deep(h1) {
    font-size: 1.6rem;
  }

  .guide-body :deep(h2) {
    font-size: 1.25rem;
  }

  .guide-body :deep(h3) {
    font-size: 1.1rem;
  }
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
