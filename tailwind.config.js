import { addDynamicIconSelectors } from "@iconify/tailwind"
import themes from "daisyui/src/theming/themes"

export const plugins = [
  require("daisyui"),
  addDynamicIconSelectors({
    prefix: "i"
  })
]
export const daisyui = {
  themes: [
    {
      light: {
        ...themes.dark
      }
    },
    "dark"
  ]
}
