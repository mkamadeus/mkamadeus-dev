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
		head: {
			viewport: 'width=device-width,initial-scale=1',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
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
        code: 'ja',
        name: 'Japanese',
        file: 'ja.yaml',
      },
      {
        code: 'ko',
        name: 'Korean',
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
