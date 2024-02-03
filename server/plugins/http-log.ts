import { get } from "radash"
import consola from "consola"

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("request", (event) => {
    // @ts-expect-error add extender later
    event.startedAt = Date.now()
  })

  nitro.hooks.hook("afterResponse", (event) => {
    const elapsed = Date.now() - get(event, "startedAt", 0)
    consola.info(
      `${new Date(get(event, "startedAt", 0)).toISOString()} ${event.node.res.statusCode} ${event.method}: ${
        event.path
      } in ${elapsed} ms`,
    )
  })

  // nitro.hooks.hook("error", (event) => {
  //   if (event.message === ErrorMessage.INVALID_REFRESH_TOKEN) {
  //     console.log("errorzzz")
  //     console.log(event)
  //   }
  // })
})
