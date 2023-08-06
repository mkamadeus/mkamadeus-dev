import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
// import shiki from 'shiki';

// const highlighter = await shiki.getHighlighter({theme: 'github-dark'})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/styles/katex.css',
    '~/assets/styles/main.css',
    '~/assets/styles/markdown.css',
  ],
  modules:[
    '@nuxt/content',
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@vite-pwa/nuxt'
  ],
  components: [
    {path: '~/components', pathPrefix: false},
  ],
  devServerHandlers: [],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
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
        { property: 'og:locale', content: 'en_US' },
      ]   
    }
  },
  i18n: {
    langDir: './locales',
    lazy: true,
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.yaml',
      },
      {
        code: 'id',
        name: 'Bahasa Indonesia',
        file: 'id.yaml',
      },
      {
        code: 'ja',
        name: '日本',
        file: 'ja.yaml',
      },
      {
        code: 'ko',
        name: '한국어',
        file: 'ko.yaml',
      },
    ],
  },
  content: {
    markdown: {
      remarkPlugins: [
        'remark-math',
        'remark-toc'
      ],
      rehypePlugins: {
        'rehype-katex': {
          output: 'html' // the default value is 'htmlAndMathml'
        }
      }
    },
    highlight: {
      theme: 'github-dark'
    }
  },
  devtools: {
    enabled: true,
  },
})
