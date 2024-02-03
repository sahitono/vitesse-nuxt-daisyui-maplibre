import { wrapSuccess } from "~/server/model"

export default defineEventHandler(async () => {
  return wrapSuccess({ ok: true })
})
