import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetUno,
  defineConfig,
} from "unocss";
import { animatedUno } from 'animated-unocss'


export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Plus Jakarta Sans",
        body: "Inter",
        mono: "Ubuntu Mono",
      }
    }),
    animatedUno(),
  ],
  shortcuts: {
    link: "text-#888 hover:text-#ddd transition-all transition-duration-150 underline underline-dotted",
    header: "font-sans font-800 text-4xl lg:text-9xl text-#ddd",
    textInput: "rounded border border-#888 bg-transparent text-#ddd placeholder-#888 focus:outline-none focus:border-#ddd p-1",
  },
  theme: {
    colors: {
      black: '#0C0404'
    },
    animation: {
      keyframes: {
        wiggle: "{0%, 100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) }}",
        slideIn: "{0% { transform: translateY(20px) } 100% { transform: translateY(0) }}", 
      },
      duration: {
        wiggle: "1s",
      },
      timingFns: {
        wiggle: "ease-in-out",
      },
    },
  },
  content: {
    pipeline: {
      include: [/\.ts$/, /\.vue$/, /\.vue\?vue/, /\.md/],
      exclude: [/unocss\.config\.ts$/],
    }
  }
});
