import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  defineConfig,
} from 'unocss'

export default defineConfig({
  safelist: [
    'i-carbon-application-web',
    'i-carbon-bot',
    'i-carbon-cognitive',
    'i-carbon-idea',
    'i-carbon-launch',
    'i-carbon-network-overlay',
    'i-carbon-qr-code',
    'i-carbon-search',
  ],
  presets: [
    presetAttributify(),
    presetWind4(),
    presetIcons(),
    presetTypography({
      cssExtend: {
        'h1, h2, h3': {
          'font-family': '"Plus Jakarta Sans", sans-serif',
          'scroll-behavior': 'smooth',
        },
        'h1 a, h2 a': {
          'margin': '1em 0 0.5em',
          'font-weight': 800,
          'font-size': '1em',
          'scroll-behavior': 'smooth',
        },
        'h3 a': {
          'font-weight': 600,
          'font-size': '0.9em',
          'margin': '0 0 0.5em',
          'scroll-behavior': 'smooth',
        },
        'p': {
          'font-family': '"Inter", sans-serif',
          'line-height': 1.75,
          'margin': '0 0 1em',
        },
        'code': {
          'font-family': '"Fira Code", monospace',
        },
        'blockquote': {
          'font-style': 'normal',
          'padding': '0 0 0 1em',
        },
        'ul': { 'margin-top': 0 },
        'a:not([rel])': {
          'text-decoration': 'none',
          'cursor': 'auto',
        },
        'a[rel="nofollow"]': {
          'text-decoration': 'underline',
          'text-decoration-style': 'dotted',
          'cursor': 'pointer',
        },
        'pre': {
          'font-family': '"Fira Code", monospace',
          'padding': '1rem',
          'border-radius': '0.5rem',
        },
        'p code, ul code, h1 code, h2 code, h3 code': {
          'padding': '0.25em',
          'border-radius': '0.25em',
        },
        'p code:before, p code:after, ul code:before, ul code:after, h1 code:before, h1 code:after, h2 code:before, h2 code:after, h3 code:before, h3 code:after': {
          content: 'none',
        },
        'figure': {
          'display': 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
          'margin': '0 0 1.5em',
        },
        'figure img': { 'margin-bottom': '0.5em' },
        'figure figcaption': { 'font-size': '0.8em' },
        '#toc': { 'font-size': '0.8em' },
        '#toc ol': { 'list-style': 'none', 'margin': 0 },
        '#toc a': {
          'text-decoration': 'underline',
          'text-decoration-style': 'dotted',
          'cursor': 'pointer',
          'scroll-behavior': 'smooth',
        },
      },
    }),
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: 'Plus Jakarta Sans',
            weights: [400, 500, 600, 700, 800, 900],
            italic: true,
          },
          {
            name: 'Noto Fonts',
            weights: [100, 200, 300, 400, 500, 600, 700, 800],
          },
        ],
        body: [
          {
            name: 'Inter',
            weights: [300, 400, 500, 600, 700, 800],
            italic: true,
          },
          {
            name: 'Noto Fonts',
            weights: [100, 200, 300, 400, 500, 600, 700, 800],
          },
        ],
        mono: [
          {
            name: 'Fira Code',
            weights: [300, 400, 500, 600, 700, 800],
          },
        ],
      },
    }),
  ],
  shortcuts: {
    link: 'text-#888 hover:text-#ddd transition-all transition-duration-150 underline underline-dotted',
    header: 'font-sans font-800 text-4xl lg:text-5xl text-#ddd',
    textInput: 'rounded border border-#888 bg-transparent text-#ddd placeholder-#888 focus:outline-none focus:border-#ddd p-1',
  },
  theme: {
    colors: {
      black: '#0C0404',
    },
  },
  content: {
    pipeline: {
      include: [/\.ts$/, /\.vue$/, /\.vue\?vue/, /\.md/, /\.yaml$/],
      exclude: [/unocss\.config\.ts$/],
    },
  },
})
