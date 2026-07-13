import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, _from, savedPosition) {
    // ブラウザの戻る/進むは従来どおり位置を復元
    if (savedPosition) return savedPosition
    // ページ内アンカーへの遷移はその要素へ
    if (to.hash) return { el: to.hash }
    // 新しいページへの遷移は即座に最上部から表示する。
    // Bootstrap(reboot)が :root { scroll-behavior: smooth } を設定しており、
    // behavior 未指定(auto)だと下から上へスライドするアニメーションになって
    // IntersectionObserver が全要素を可視と誤判定する。'instant' を明示して
    // CSS の scroll-behavior に関係なく即座に最上部へ配置する。
    return { top: 0, left: 0, behavior: 'instant' }
  },
} satisfies RouterConfig
