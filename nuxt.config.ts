// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  modules: ['@bootstrap-vue-next/nuxt',
            '@vercel/analytics',],
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
      ]


    }
  }
})
