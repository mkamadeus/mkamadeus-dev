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
        "h1,h2,h3": { "font-family": "'Inter', sans-serif", color: "#ddd" },
        p: {
          "font-family": "'Inter', sans-serif",
          color: "#bbb",
          "line-height": "1.75",
        },
        span: { color: "#bbb" },
        blockquote: {
          "font-style": "normal",
          color: "#bbb",
          "border-left": "0.25em solid #7d7d7d4d",
        },
        pre: {
          "font-family": "'Ubuntu Mono', monospace",
          margin: "0",
          padding: "0",
          "border-radius": "0.5rem",
        },
        a: {
          color: "#ddd",
          "text-decoration-style": "dotted",
          cursor: "pointer",
        },
        code: {
          "font-family": "'Ubuntu Mono', monospace",
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
  include: [/\.ts$/, /\.vue$/, /\.vue\?vue/, /\.md/],
  exclude: [/unocss\.config\.ts$/],
});
