import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";
import autoimport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import markdown from "vite-plugin-md";
import pages from "vite-plugin-pages";
import layouts from "vite-plugin-vue-layouts";

// MARKDOWN-IT PLUGINS
import shiki from "markdown-it-shiki";
import latex from "markdown-it-latex";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    pages({
      extensions: ["vue", "md"],
      extendRoute: (route, parent) => {
        console.log(route, parent);
        if (route.path.indexOf("/blog") === 0 && route.path !== "/blog") {
          return {
            ...route,
            meta: { layout: "blog" },
          };
        }
      },
    }),
    layouts(),
    markdown({
      markdownItOptions: {
        typographer: true,
      },
      markdownItSetup: (md) => {
        md.use(shiki);
        md.use(latex);
      },
    }),
    autoimport({
      dts: "src/autoimports.d.ts",
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ["vue", "vue-router"],
    }),
    components({
      dts: "src/components.d.ts",
      dirs: ["src/components"],
    }),
    unocss({
      configFile: "unocss.config.ts",
    }),
  ],
});
