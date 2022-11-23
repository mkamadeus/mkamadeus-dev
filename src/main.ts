import { ViteSSG } from "vite-ssg";

// CSS
import "@unocss/reset/tailwind.css";
import "uno.css";
import "~/styles/main.css";
import "highlight.js/styles/github-dark.css";

// ROUTER
// import { createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);

// MAIN APP
import App from "./App.vue";

export const createApp = ViteSSG(App, { routes });
