import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";
import autoimport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import markdown from "vite-plugin-md";
import pages from "vite-plugin-pages";

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
    pages({ extensions: ["vue", "md"] }),
    markdown(),
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
