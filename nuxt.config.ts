export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    // '@vite-pwa/nuxt',
    '@nuxtjs/eslint-module',
    'radix-vue/nuxt'
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/styles/main.css',
    '~/assets/styles/markdown.css'
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'mkamadeus.dev',
      viewport: 'width=device-width,initial-scale=1',
      link: [{ rel: 'canonical', href: 'https://mkamadeus.dev/' }],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'mkamadeus\' personal website.' },
        { property: 'og:title', content: 'mkamadeus.dev' },
        { property: 'og:url', content: 'https://mkamadeus.dev' },
        { property: 'og:locale', content: 'en_US' }
      ]
    }
  },
  i18n: {
    lazy: true,
    langDir: './locales',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.yaml'
      },
      {
        code: 'id',
        name: 'Bahasa Indonesia',
        file: 'id.yaml'
      },
      {
        code: 'ja',
        name: '日本',
        file: 'ja.yaml'
      },
      {
        code: 'ko',
        name: '한국어',
        file: 'ko.yaml'
      }
    ]
  },
  content: {
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: {
        'rehype-katex': {
          output: 'html' // the default value is 'htmlAndMathml'
        }
      }
    },
    highlight: {
      theme: 'github-dark',
      preload: ['hcl', 'sh', 'bash', 'cpp', 'yaml', 'jsx', 'vue', 'json']
    }
  },
  devtools: {
    enabled: true
  },
  eslint: {
    lintOnStart: false
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: [
        '/blogs'
      ]
    }
  }
})
