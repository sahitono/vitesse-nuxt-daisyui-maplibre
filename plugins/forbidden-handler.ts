export default defineNuxtPlugin({
  name: "forbidden handler",
  order: 0,
  enforce: "pre",
  hooks: {
    "app:error": (err) => {
      return err
    },
  },
  setup(n) {
  },
})
