import { omit, tryit } from "radash"
import { getSessionOrThrow } from "~/server/service/getSessionOrThrow"
import { findUserByUsername } from "~/server/service/users"
import { badRequest } from "~/server/infrastructure/errors"

export default defineEventHandler(async (event) => {
  const session = await getSessionOrThrow(event)

  const [err] = await tryit(findUserByUsername)(session.username)
  if (err) {
    badRequest()
  }

  return omit(session, ["token"])
})
