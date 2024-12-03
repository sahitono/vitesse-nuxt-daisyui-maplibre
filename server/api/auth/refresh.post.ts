import type { JwtPayload } from "jsonwebtoken"
import { verify } from "argon2"
import { decode } from "jsonwebtoken"
import z from "zod"
import { getAccessTokenMaxAge } from "~~/server/infrastructure/config/getAccessTokenMaxAge"
import { getRefreshTokenMaxAge } from "~~/server/infrastructure/config/getRefreshTokenMaxAge"
import { useDb } from "~~/server/infrastructure/db"
import { badRequest, ErrorMessage, unauthorized } from "~~/server/infrastructure/errors"
import { createAccessToken } from "~~/server/service/createAccessToken"
import { getSessionOrThrow } from "~~/server/service/getSessionOrThrow"
import { createRefreshToken } from "~~/server/service/refreshTokens"
import { findUserByUsername } from "~~/server/service/users"
import { parseOrThrow } from "~~/server/utils/validation"

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

  const refreshToken = await useDb().query.refreshTokens.findFirst({ where: (rt, { eq }) => eq(rt.jti, jti) }).execute()

  if (refreshToken == null) {
    unauthorized(ErrorMessage.INVALID_REFRESH_TOKEN)
  }

  const tokenSame = await verify(refreshToken!.token, payload.refreshToken)
  const tokenExpired = refreshToken!.expiredAt < (Date.now() / 1000)

  if (!tokenSame || tokenExpired) {
    unauthorized(ErrorMessage.INVALID_REFRESH_TOKEN)
  }

  const rows = await findUserByUsername(username)
  if (rows == null) {
    badRequest("user not exist")
  }

  const accessToken = createAccessToken({
    username: rows!.user_account.username,
    roleName: rows!.role?.name,
    isAdmin: rows!.role?.name === "admin",
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
