import { hash } from "argon2"
import { eq } from "drizzle-orm"
import { uuidv7 } from "uuidv7"
import { useDb } from "~~/server/infrastructure/db"
import { refreshTokens } from "~~/server/infrastructure/db/schema"
import { badGateway } from "~~/server/infrastructure/errors"

const REFRESH_TOKEN_EXPIRED = 60 * 60 * 24

export const createRefreshToken = async (jti: string, accessTokenExpired: number, refreshTokenExpired: number = REFRESH_TOKEN_EXPIRED) => {
  const token = uuidv7()
  const result = await useDb().transaction(async (tx) => {
    await tx.delete(refreshTokens).where(eq(refreshTokens.token, jti)).execute()
    const hashed = await hash(token, { parallelism: 1, type: 2, memoryCost: 19456, timeCost: 2, hashLength: 16 })
    return await tx.insert(refreshTokens).values({
      jti,
      token: hashed,
      exp: accessTokenExpired!,
      expiredAt: (Date.now() / 1000) + refreshTokenExpired,
    }).returning().execute()
  })

  if (result.length === 0) {
    badGateway()
  }

  return result[0]
}
