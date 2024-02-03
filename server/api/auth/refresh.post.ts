import z from "zod"
import { verify } from "argon2"
import type { JwtPayload } from "jsonwebtoken"
import { decode } from "jsonwebtoken"
import { parseOrThrow } from "~/server/utils/validation"
import { db } from "~/server/infrastructure/database"
import { ErrorMessage, forbidden } from "~/server/infrastructure/errors"
import { generateAccessToken } from "~/server/service/generateToken"
import { findUserByUsername } from "~/server/service/users"
import type { Maybe } from "~/types/utility"
import { createRefreshToken } from "~/server/service/refreshTokens"
import { getSessionOrThrow } from "~/server/service/getSessionOrThrow"

const RefreshPayload = z.object({
  refreshToken: z.string(),
})

export default defineEventHandler(async (event) => {
  const { jti, exp, username } = await getSessionOrThrow(event)
  const payload = await readBody<{
    refreshToken: string
  }>(event)
  parseOrThrow(RefreshPayload, payload)

  console.debug("rt1")
  const refreshToken = await db
    .selectFrom("refresh_tokens").selectAll()
    .where("jti", "=", jti!)
    .execute()

  if (refreshToken.length === 0) {
    // deleteCookie(event, "auth:refresh-token")
    // deleteCookie(event, "auth:token")
    forbidden(ErrorMessage.INVALID_REFRESH_TOKEN)
  }

  console.debug("rt2", payload.refreshToken)
  console.debug("rt2", jti)
  const tokenSame = await verify(refreshToken[0].token, payload.refreshToken)
  const tokenExpired = refreshToken[0].expiredAt < (Date.now() / 1000)

  if (!tokenSame || tokenExpired) {
    // deleteCookie(event, "auth:refresh-token")
    // deleteCookie(event, "auth:token")
    forbidden(ErrorMessage.INVALID_REFRESH_TOKEN)
  }

  console.debug("rt3")
  const user = await findUserByUsername(username)
  const accessToken = generateAccessToken({
    username: user[0].username,
    roleName: user[0].name,
    isAdmin: user[0].isAdmin === 1,
  }, jti)
  const { exp: newExp } = decode(accessToken) as JwtPayload

  const newRefreshToken: Maybe<string> = await createRefreshToken(jti, newExp!)

  return {
    token: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  }
})
