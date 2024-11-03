import antfu from "@antfu/eslint-config"
import { FlatCompat } from "@eslint/eslintrc"
import nuxt from "./.nuxt/eslint.config.mjs"

const compat = new FlatCompat()

export default nuxt(
  antfu(
    {
      formatters: true,
      rules: {
        "style/arrow-parens": ["error", "always"],
        "curly": ["error", "all"],
        "antfu/top-level-function": ["off"],
        "style/object-curly-spacing": ["error", "always"],
        "vue/no-multiple-template-root": ["off"],
      },
      stylistic: {
        quotes: "double",
      },
    },
    ...compat.config({
      extends: ["plugin:tailwindcss/recommended"],
      rules: {
        "tailwindcss/no-custom-classname": "off",
      },
    }),
    {
      rules: {
        "vue/no-multiple-template-root": ["off"],
        "vue/multi-word-component-names": ["warn"],
      },
    },
  ),
)
