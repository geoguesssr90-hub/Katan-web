// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-19',
  nitro:{
    preset:'vercel-static'
  },
  ssr:false,

  site: {
  url: 'https://catan-web-one.vercel.app',
  name: 'カタンについて（非公式団体）',
  },


  modules: ['@bootstrap-vue-next/nuxt',
            '@vercel/analytics',
          '@vercel/speed-insights',
        'nuxt-gtag',
      '@nuxtjs/sitemap',],
  css: ['bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],



  gtag: {id: 'G-SQS5BFD87G' },
  

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
