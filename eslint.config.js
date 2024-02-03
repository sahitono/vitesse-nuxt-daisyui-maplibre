import antfu from "@antfu/eslint-config"

export default antfu(
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
)
