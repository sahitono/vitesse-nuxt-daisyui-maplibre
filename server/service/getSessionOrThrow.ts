import { tryit } from "radash"
import type { EventHandlerRequest, H3Event } from "h3"
import jwt from "jsonwebtoken"
import { ErrorMessage, unauthorized } from "~/server/infrastructure/errors"
import type { JwtContent } from "~/server/model/JwtContent"
import { isExpired } from "~/server/utils/isExpired"

export const getSessionOrThrow = async (event: H3Event<EventHandlerRequest>) => {
  const cookies = parseCookies(event)
  const jwtToken = cookies?.["auth:token"] ?? (getRequestHeader(event, "authorization"))
  // const jwtToken2 = await getToken({ event })
  //
  const [err, token] = tryit(jwt.verify)(jwtToken.replace("Bearer ", "").trim(), useRuntimeConfig().secret)
  if (err != null || event == null || token == null) {
    throw unauthorized(ErrorMessage.INVALID_ACCESS_TOKEN)
  }
  const typedToken = token as JwtContent
  if (isExpired(typedToken.exp)) {
    throw unauthorized(ErrorMessage.EXPIRED_ACCESS_TOKEN)
  }

  return {
    ...(token as JwtContent),
    token: jwtToken,
  }
}
