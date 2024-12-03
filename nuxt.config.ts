import { appDescription } from "./constants"

export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/eslint",
    // "radix-vue/nuxt",
  ],

  plugins: [
    "~/plugins/forbidden-handler",
  ],

  ssr: true,

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
          sizes: "any",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/nuxt.svg",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: appDescription,
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
    },
  },

  css: [
    "~/assets/styles/main.css",
  ],

  colorMode: {
    preference: "forest",
    fallback: "forest",
    dataValue: "theme",
    classSuffix: "",
  },

  runtimeConfig: {
    databaseUrl: "",
    secret: "",
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: "2024-11-04",

  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      ignore: ["/", "/hi"],
    },
  },

  auth: {
    provider: {
      type: "local",
      endpoints: {
        getSession: { path: "/currentUser" },
        signIn: {
          path: "/signin",
          method: "post",
        },
      },
      pages: {
        login: "/protected",
      },
      refresh: {
        isEnabled: true,
        endpoint: {
          path: "/refresh",
          method: "post",
        },
        signInResponseRefreshTokenPointer: "/token/refreshToken",
        refreshRequestTokenPointer: "/token/refreshToken",
        maxAgeInSeconds: 24 * 60 * 60,
      },
      token: {
        maxAgeInSeconds: 60 * 5,
        sameSiteAttribute: "lax",
        signInResponseTokenPointer: "/token/accessToken",
      },
      session: {
        dataType: {
          username: "string",
          roleName: "string",
          isAdmin: "boolean",
        },
      },
    },
    globalAppMiddleware: true,
    session: {
      enableRefreshPeriodically: 1000 * 60 * 3,
      enableRefreshOnWindowFocus: true,
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
})
