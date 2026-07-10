// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-19',
  nitro:{
    preset:'vercel-static',
    // 既存ページは SPA(ssr:false の島)でHTMLが空シェルのため、クローラが
    // ガイドのリンクを辿れない。SEO対象のガイド5ページを明示列挙して
    // 静的HTMLにプリレンダリングする。
    prerender: {
      routes: [
        '/guide/intro',
        '/guide/setup',
        '/guide/turn',
        '/guide/tips',
        '/guide/start',
      ],
    },
  },
  // グローバルは SSR 有効。Nuxt のハイブリッドは「global ssr:true → 特定ルート
  // だけ ssr:false」の方向しかできないため、ガイドを prerender するにはこの向き
  // にする必要がある。既存ページは下の routeRules で ssr:false=SPA のまま維持。
  ssr:true,

  // ガイドだけ prerender(SSRで本文入り静的HTML)。既存ページは ssr:false の島
  // としてクライアント描画のまま = 盤面のランダム生成もクライアントのみで不整合なし。
  routeRules: {
    '/': { ssr: false },
    '/about': { ssr: false },
    '/play': { ssr: false },
    '/privacy': { ssr: false },
    '/guide/**': { prerender: true },
  },

  site: {
  url: 'https://catan-web-one.vercel.app',
  name: 'カタンについて（非公式団体）',
  },


  modules: ['@bootstrap-vue-next/nuxt',
            '@vercel/analytics',
          '@vercel/speed-insights',
        'nuxt-gtag',
      '@nuxtjs/sitemap',
      '@nuxt/content',],
  css: ['bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],



  gtag: {id: 'G-SQS5BFD87G' },

  // Nuxt Content: use Node's built-in node:sqlite (Node >= 22) so no
  // native better-sqlite3 build is needed on this machine.
  content: {
    experimental: { sqliteConnector: 'native' },
  },


  app: {
    head: {
      titleTemplate:'%s | カタン非公式団体',
      htmlAttrs: {lang: 'ja'},

      meta:[
        {charset: 'utf-8'},
        {name:"viewport", content: 'width=device-width, height=device-height, initial-scale=1'},
        { name: 'description', content: 'カタンのルール、遊び方の紹介ページ' },
        { name: 'robots', content: 'index, follow' },
        {name: "google-site-verification", content: "jyNNwGXVWYrjRyCEDqOi-k_acz6yFuPCIhcwyXUBba0" },
        // OGP
        { property: 'og:title', content: 'カタンについて（非公式団体）' },
        { property: 'og:description', content: 'カタンのルール、遊び方の紹介ページ' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://catan-web-one.vercel.app/' },
        { property: 'og:image', content: 'https://catan-web-one.vercel.app/ogp.png' },
        // Twitter/X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'カタンについて（非公式団体）' },
        { name: 'twitter:description', content: 'カタンのルール、遊び方の紹介ページ' },
        { name: 'twitter:image', content: 'https://catan-web-one.vercel.app/ogp.png' },
        {property: 'og:locale', content: 'ja_JP'}
      ]


    }
  }
})
