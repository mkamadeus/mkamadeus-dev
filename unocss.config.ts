import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  defineConfig,
} from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetTypography({
      cssExtend: {
        h1: { "font-family": "'Inter', sans-serif" },
        p: { "font-family": "'Inter', sans-serif" },
        code: {
          "font-family": "'Ubuntu Mono', monospace",
          background: "#AAAAAA",
        },
      },
    }),
  ],
  rules: [
    ["font-header", { "font-family": "'Inter', sans-serif" }],
    ["font-body", { "font-family": "'Ubuntu Mono', monospace" }],
  ],
  theme: {
    animation: {
      keyframes: {
        wiggle:
          "{0%, 100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) }}",
      },
      duration: {
        wiggle: "1s",
      },
      timingFns: {
        wiggle: "ease-in-out",
      },
    },
  },
  include: [/\.ts$/, /\.vue$/, /\.vue\?vue/],
  exclude: [/unocss\.config\.ts$/],
});
