// CSS
import "@unocss/reset/tailwind.css";
import "uno.css";

// ROUTER
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// MAIN APP
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount("#app");
