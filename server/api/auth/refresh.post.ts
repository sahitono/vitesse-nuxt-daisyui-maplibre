import z from "zod"
import { verify } from "argon2"
import type { JwtPayload } from "jsonwebtoken"
import { decode } from "jsonwebtoken"
import { parseOrThrow } from "~/server/utils/validation"
import { db } from "~/server/infrastructure/database"
import { ErrorMessage, unauthorized } from "~/server/infrastructure/errors"
import { createAccessToken } from "~/server/service/createAccessToken"
import { findUserByUsername } from "~/server/service/users"
import { createRefreshToken } from "~/server/service/refreshTokens"
import { getSessionOrThrow } from "~/server/service/getSessionOrThrow"
import { getRefreshTokenMaxAge } from "~/server/infrastructure/config/getRefreshTokenMaxAge"
import { getAccessTokenMaxAge } from "~/server/infrastructure/config/getAccessTokenMaxAge"

const RefreshPayload = z.object({
  refreshToken: z.string(),
})

export default defineEventHandler(async (event) => {
  const {
    jti,
    username,
  } = await getSessionOrThrow(event)
  const payload = await readBody<{
    refreshToken: string
  }>(event)
  parseOrThrow(RefreshPayload, payload)

  const refreshToken = await db
    .selectFrom("refresh_tokens").selectAll()
    .where("jti", "=", jti!)
    .execute()

  if (refreshToken.length === 0) {
    unauthorized(ErrorMessage.INVALID_REFRESH_TOKEN)
  }

  const tokenSame = await verify(refreshToken[0].token, payload.refreshToken)
  const tokenExpired = refreshToken[0].expiredAt < (Date.now() / 1000)

  if (!tokenSame || tokenExpired) {
    unauthorized(ErrorMessage.INVALID_REFRESH_TOKEN)
  }

  const user = await findUserByUsername(username)
  const accessToken = createAccessToken({
    username: user[0].username,
    roleName: user[0].name,
    isAdmin: user[0].isAdmin === 1,
  }, getAccessTokenMaxAge(), jti)
  const { exp: newExp } = decode(accessToken) as JwtPayload

  const newRefreshToken = await createRefreshToken(
    jti,
    newExp!,
    getRefreshTokenMaxAge(),
  )

  return {
    token: {
      accessToken,
      refreshToken: newRefreshToken.token,
    },
  }
})
