import { omit, tryit } from "radash"
import { badRequest } from "~~/server/infrastructure/errors"
import { getSessionOrThrow } from "~~/server/service/getSessionOrThrow"
import { findUserByUsername } from "~~/server/service/users"

export default defineEventHandler(async (event) => {
  const session = await getSessionOrThrow(event)

  const [err] = await tryit(findUserByUsername)(session.username)
  if (err) {
    badRequest()
  }

  return omit(session, ["token"])
})
