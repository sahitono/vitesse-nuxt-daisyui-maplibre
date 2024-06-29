// @ts-check
import { FlatCompat } from "@eslint/eslintrc"
import antfu from "@antfu/eslint-config"
import nuxt from "./.nuxt/eslint.config.mjs"

const compat = new FlatCompat()

export default nuxt(
  antfu(
    {
      stylistic: {
        quotes: "double",
      },
      ignores: [
        "commitlint.config.js",
      ],
      unocss: false,
      formatters: true,
      rules: {
        "style/arrow-parens": ["error", "always"],
        "curly": ["error", "all"],
        "antfu/top-level-function": ["off"],
      },
    },
  ),
  ...compat.config({
    extends: ["plugin:tailwindcss/recommended"],
    rules: {
      "tailwindcss/no-custom-classname": "off",
    },
  }),
)
