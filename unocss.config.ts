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
        "h1,h2,h3": {
          "font-family": "'Inter', sans-serif",
        },
        h1: { color: "#ddd", margin: "0 0 0.5em", "font-weight": "800" },
        h2: {
          color: "#bbb",
          "font-weight": "500",
          "font-size": "1.5em",
          margin: "0 0 0.5em",
        },
        h3: {
          color: "#bbb",
          "font-weight": "500",
          "font-size": "1.2em",
          margin: "0 0 0.5em",
        },
        ".table-of-contents": {
          "margin-bottom": "2em",
          "margin-left": "-1em",
        },
        ".table-of-contents ul": {
          margin: "0",
          "list-style-type": "none",
        },
        ".table-of-contents a": {
          "font-weight": "400",
          "font-size": "0.8em",
        },
        ul: {
          "margin-top": "0",
        },
        "ol *": {
          color: "#bbb",
        },
        "ul *": {
          color: "#bbb",
        },
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
          "margin-bottom": "2em",
        },
        figure: {
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
        },
        "figure > img": {
          "margin-bottom": "0.5em",
        },
        figcaption: {
          color: "#ddd",
          "font-size": "0.8em",
        },
      },
    }),
  ],
  rules: [
    ["font-sans", { "font-family": "'Inter', sans-serif" }],
    ["font-body", { "font-family": "'Inter', sans-serif" }],
    ["font-mono", { "font-family": "'Ubuntu Mono', monospace" }],
  ],
  shortcuts: {
    link: "text-#888 hover:text-#ddd transition-all transition-duration-150 underline underline-dotted",
    header: "font-sans font-800 text-4xl lg:text-9xl text-#ddd",
  },
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
