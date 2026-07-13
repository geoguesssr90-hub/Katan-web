<template>
  <div class="guide-page">
    <ContentRenderer
      v-if="current"
      :value="current"
      class="guide-body"
      :class="{ 'guide-anim': animReady }"
    />
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

// --- スクロール連動フェードイン ---
// prerender されたHTMLでも本文が読めるよう、非表示の初期状態(opacity:0)は
// JSがここで guide-anim クラスを付けた後にのみ適用される(CSS側参照)。
// prefers-reduced-motion の環境では何もせず通常表示のまま。
const animReady = ref(false)
let observer: IntersectionObserver | null = null

function observeGuideElements() {
  if (!observer) return
  observer.disconnect()
  nextTick(() => {
    // scrollBehavior によるスクロール位置のリセット(最上部へ)が描画に
    // 反映される前に observe すると、遷移直後の一瞬のスクロール位置で
    // 全要素が可視と誤判定される。rAF を2回挟み、位置確定後に観測を開始する。
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const els = document.querySelectorAll(
          '.guide-body p, .guide-body h2, .guide-body h3'
        )
        els.forEach(el => {
          // Vue がDOMノードを再利用すると前ページで付けた表示済みクラスが
          // 残るため、観測し直す前に一度クリアする。ページ内のスクロールでは
          // この関数は呼ばれないので「一度表示されたら再アニメーションしない」
          // 挙動は維持される(表示後は unobserve 済み)。
          el.classList.remove('guide-anim-in')
          observer!.observe(el)
        })
      })
    })
  })
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('guide-anim-in')
          observer!.unobserve(entry.target)
        }
      }
    },
    // 要素の上端が画面下端から少し入った時点で発火。
    // threshold ではなく rootMargin を使うことで、縦に長い段落でも
    // 「一定割合見えるまで非表示のまま」になるのを避ける。
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  )

  animReady.value = true
  observeGuideElements()
})

// 前へ/次へでページが切り替わると本文DOMが差し替わるので観測し直す
watch(() => route.path, () => observeGuideElements())

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
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

/* --- スクロール連動フェードイン ---
   .guide-anim はJSがマウント後に付与するクラス。JSが無効/失敗した場合や
   prefers-reduced-motion 環境では付与されず、本文は最初から通常表示。
   transform と opacity のみをアニメーションし、レイアウトは動かさない。 */
.guide-body.guide-anim :deep(p),
.guide-body.guide-anim :deep(h2),
.guide-body.guide-anim :deep(h3) {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.guide-body.guide-anim :deep(p.guide-anim-in),
.guide-body.guide-anim :deep(h2.guide-anim-in),
.guide-body.guide-anim :deep(h3.guide-anim-in) {
  opacity: 1;
  transform: none;
}

/* JS側でも guide-anim の付与自体を止めているが、CSS単体でも保険を掛ける */
@media (prefers-reduced-motion: reduce) {
  .guide-body.guide-anim :deep(p),
  .guide-body.guide-anim :deep(h2),
  .guide-body.guide-anim :deep(h3) {
    opacity: 1;
    transform: none;
    transition: none;
  }
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
