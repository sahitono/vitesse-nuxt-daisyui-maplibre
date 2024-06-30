import { appDescription } from "./constants"

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    databaseUrl: "",
    secret: "",
  },
  modules: [
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/eslint",
  ],
  plugins: [
    "~/plugins/forbidden-handler",
  ],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
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

  typescript: {
    typeCheck: true,
    strict: true,
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

  auth: {
    provider: {
      type: "refresh",
      endpoints: {
        getSession: { path: "/currentUser" },
        refresh: {
          path: "/refresh",
          method: "post",
        },
        signIn: {
          path: "/signin",
          method: "post",
        },
      },
      pages: {
        login: "/protected",
      },
      token: {
        maxAgeInSeconds: 60 * 5,
        sameSiteAttribute: "lax",
        signInResponseTokenPointer: "/token/accessToken",
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/token/refreshToken",
        maxAgeInSeconds: 24 * 60 * 60,
      },
      sessionDataType: {
        username: "string",
        roleName: "string",
        isAdmin: "boolean",
      },
    },
    globalAppMiddleware: true,
    session: {
      enableRefreshPeriodically: 1000 * 60 * 3,
      enableRefreshOnWindowFocus: true,
    },
  },

  devtools: {
    enabled: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
