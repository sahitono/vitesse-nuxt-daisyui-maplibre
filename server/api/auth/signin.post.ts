import type { JwtContent } from "~~/server/model/JwtContent"
import { verify } from "argon2"
import { decode } from "jsonwebtoken"
import { uuidv7 } from "uuidv7"
import z from "zod"
import { getAccessTokenMaxAge } from "~~/server/infrastructure/config/getAccessTokenMaxAge"
import { getRefreshTokenMaxAge } from "~~/server/infrastructure/config/getRefreshTokenMaxAge"
import { badRequest } from "~~/server/infrastructure/errors"
import { createAccessToken } from "~~/server/service/createAccessToken"
import { createRefreshToken } from "~~/server/service/refreshTokens"
import { findUserByUsername } from "~~/server/service/users"
import { parseOrThrow } from "~~/server/utils/validation"

const SignInPayload = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
  const payload = await readBody<{
    username: string
    password: string
  }>(event)
  parseOrThrow(SignInPayload, payload)

  const rows = await findUserByUsername(payload.username)
  if (rows == null) {
    badRequest("user not exist")
  }

  const passwordSame: boolean = await verify(rows!.user_account.password, payload.password)
  if (!passwordSame) {
    badRequest("invalid password")
  }

  const user = {
    username: rows!.user_account.username,
    roleName: rows!.role?.name,
    isAdmin: rows!.role?.name === "admin",
  }

  const jti = uuidv7()
  const accessToken = createAccessToken(user, getAccessTokenMaxAge(), jti)

  const { exp } = decode(accessToken) as JwtContent
  const refreshToken = await createRefreshToken(jti, exp!, getRefreshTokenMaxAge())

  return {
    token: {
      accessToken,
      refreshToken: refreshToken.token,
    },
  }
})
