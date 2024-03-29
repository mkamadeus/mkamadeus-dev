import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetUno,
  defineConfig
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: 'Plus Jakarta Sans',
            weights: [400, 500, 600, 700, 800, 900],
            italic: true
          },
          {
            name: 'Noto Fonts',
            weights: [100, 200, 300, 400, 500, 600, 700, 800]
          }
        ],
        body: [
          {
            name: 'Inter',
            weights: [300, 400, 500, 600, 700, 800],
            italic: true
          },
          {
            name: 'Noto Fonts',
            weights: [100, 200, 300, 400, 500, 600, 700, 800]
          }
        ],
        mono: [
          {
            name: 'Fira Code',
            weights: [300, 400, 500, 600, 700, 800]
          }
        ]
      }
    })
  ],
  shortcuts: {
    link: 'text-#888 hover:text-#ddd transition-all transition-duration-150 underline underline-dotted',
    header: 'font-sans font-800 text-4xl lg:text-5xl text-#ddd',
    textInput: 'rounded border border-#888 bg-transparent text-#ddd placeholder-#888 focus:outline-none focus:border-#ddd p-1'
  },
  theme: {
    colors: {
      black: '#0C0404'
    }
  },
  content: {
    pipeline: {
      include: [/\.ts$/, /\.vue$/, /\.vue\?vue/, /\.md/],
      exclude: [/unocss\.config\.ts$/]
    }
  }
})
