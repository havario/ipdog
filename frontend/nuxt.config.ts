// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",

  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8080",
    },
  },

  nitro: {
    routeRules: {
      "/api": { proxy: "http://localhost:8080/" },
    },
  },

  app: {
    head: {
      title: "IP Geolocation",
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }, { charset: "utf-8" }],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" },
      ],
    },
  },
});
