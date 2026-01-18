export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    'radix-vue/nuxt',
  ],
  devtools: {
    enabled: true,
  },
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
        { property: 'og:locale', content: 'en_US' },
      ],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/styles/main.css',
    'katex/dist/katex.min.css',
  ],
  site: {
    url: 'https://mkamadeus.dev',
    name: 'mkamadeus.dev',
    description: 'mkamadeus\' personal website.',
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'html',
          },
        },
        highlight: {
          theme: 'github-dark',
          langs: ['hcl', 'sh', 'bash', 'cpp', 'yaml', 'jsx', 'vue', 'json', 'ts', 'js', 'python'],
        },
      },
    },
    renderer: {
      alias: {
        p: 'p',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        blockquote: 'blockquote',
        code: 'code',
        pre: 'pre',
        ul: 'ul',
        ol: 'ol',
        li: 'li',
        a: 'a',
        img: 'img',
        strong: 'strong',
        em: 'em',
        hr: 'hr',
        table: 'table',
        thead: 'thead',
        tbody: 'tbody',
        tr: 'tr',
        th: 'th',
        td: 'td',
      },
    },
  },
  ignore: [
    '**/extensions/**',
    '**/uploads/**',
    '**/database/**',
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
  ],
  compatibilityDate: '2026-01-15',
  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false,
      routes: [
        '/blogs',
      ],
    },
  },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: true,
      typescript: true,
    },
  },
  i18n: {
    baseUrl: 'https://mkamadeus.dev',
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.yaml',
      },
      {
        code: 'id',
        language: 'id-ID',
        name: 'Bahasa Indonesia',
        file: 'id.yaml',
      },
      {
        code: 'ja',
        language: 'ja-JP',
        name: '日本',
        file: 'ja.yaml',
      },
      {
        code: 'ko',
        language: 'ko-KR',
        name: '한국어',
        file: 'ko.yaml',
      },
    ],
  },
})
