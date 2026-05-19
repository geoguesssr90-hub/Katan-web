// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro:{
    preset:'vercel-static'
  },
  modules: ['@bootstrap-vue-next/nuxt',
            '@vercel/analytics',
          '@vercel/speed-insights'],
  css: ['bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  

  app: {
    head: {
      title:'カタンについて（非公式団体）',
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js' },
        { src: "https://www.googletagmanager.com/gtag/js?id=G-SQS5BFD87G",
          async: true
        },
        {
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SQS5BFD87G');
          `,
          type: 'text/javascript'
        }
      ],

      meta:[
        {charset: 'utf-8'},
        {name:"viewport", content: 'width=device-width, height=device-height, initial-scale=1'},
        { name: 'description', content: 'カタンのルール、遊び方の紹介ページ' },
        { name: 'robots', content: 'index, follow' },
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
