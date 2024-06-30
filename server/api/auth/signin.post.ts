import z from "zod"
import * as uuid from "uuid"
import { verify } from "argon2"
import { decode } from "jsonwebtoken"
import { parseOrThrow } from "~/server/utils/validation"
import { badRequest } from "~/server/infrastructure/errors"
import { createAccessToken } from "~/server/service/createAccessToken"
import { findUserByUsername } from "~/server/service/users"
import { createRefreshToken } from "~/server/service/refreshTokens"
import type { JwtContent } from "~/server/model/JwtContent"
import { getRefreshTokenMaxAge } from "~/server/infrastructure/config/getRefreshTokenMaxAge"
import { getAccessTokenMaxAge } from "~/server/infrastructure/config/getAccessTokenMaxAge"

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

  const users = await findUserByUsername(payload.username)
  if (users.length !== 1) {
    badRequest("user not exist")
  }

  const passwordSame: boolean = await verify(users[0].password, payload.password)
  if (!passwordSame) {
    badRequest("invalid password")
  }

  const user = {
    username: users[0].username,
    roleName: users[0].name,
    isAdmin: users[0].isAdmin === 1,
  }

  const jti = uuid.v4()
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
