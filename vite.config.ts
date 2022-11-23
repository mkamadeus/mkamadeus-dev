/// <reference types="vite-ssg" />

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";
import autoimport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import markdown from "vite-plugin-vue-markdown";
import graymatter from "gray-matter";
import fs from "fs-extra";
import pages from "vite-plugin-pages";
import layouts from "vite-plugin-vue-layouts";

// MARKDOWN-IT PLUGINS
import highlightjs from "markdown-it-highlightjs";
import texmath from "markdown-it-texmath";
import katex from "katex";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-table-of-contents";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    pages({
      dirs: ["pages/"],
      extensions: ["vue", "md"],
      extendRoute: (route) => {
        if (route.component.endsWith(".md") && route.path != "/blog") {
          const md = fs.readFileSync(
            path.join(__dirname, route.component),
            "utf-8"
          );
          const { data } = graymatter(md);
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }

        if (route.path.startsWith("/blog") && route.path != "/blog") {
          route.meta = Object.assign(route.meta || {}, { layout: "blog" });
        }

        return route;
      },
    }),
    layouts({}),
    markdown({
      wrapperComponent: "markdown",
      headEnabled: true,
      markdownItOptions: {
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(highlightjs);
        md.use(texmath, {
          engine: katex,
        });
        md.use(anchor);
        md.use(toc, {
          includeLevel: [2, 3, 4],
        });
      },
    }),
    autoimport({
      dts: "autoimports.d.ts",
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/head"],
    }),
    components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "components.d.ts",
      dirs: ["src/components"],
    }),
    unocss({
      configFile: "unocss.config.ts",
      include: [/\.vue/, /\.md/, /\.ts/],
    }),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== "UNUSED_EXTERNAL_IMPORT") next(warning);
      },
    },
  },
  ssgOptions: {
    script: "async",
    formatting: "prettify",
  },
});
