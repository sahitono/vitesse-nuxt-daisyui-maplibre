import { tryit } from "radash"
import type { EventHandlerRequest, H3Event } from "h3"
import jwt from "jsonwebtoken"
import { ErrorMessage, forbidden } from "~/server/infrastructure/errors"
import type { JwtContent } from "~/server/model/JwtContent"

export const getSessionOrThrow = async (event: H3Event<EventHandlerRequest>) => {
  const cookies = parseCookies(event)
  const jwtToken = cookies?.["auth:token"] ?? (await getRequestHeader(event, "authorization"))

  const [err, token] = tryit(jwt.verify)(jwtToken.replace("Bearer ", "").trim(), useRuntimeConfig().secret)
  if (err != null) {
    throw forbidden(ErrorMessage.INVALID_ACCESS_TOKEN)
  }

  if (event == null || token == null) {
    throw forbidden(ErrorMessage.INVALID_ACCESS_TOKEN)
  }

  return {
    ...(token as JwtContent),
    token: jwtToken,
  }
}
