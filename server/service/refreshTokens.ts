import { hash } from "argon2"
import { v4 } from "uuid"
import { db } from "~/server/infrastructure/database"
import { badGateway } from "~/server/infrastructure/errors"

export const createRefreshToken = async (jti: string, exp: number) => {
  const token = v4()
  const result = await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("refresh_tokens").where("jti", "=", jti).execute()
    const hashed = await hash(token, { parallelism: 1, type: 2, memoryCost: 19456, timeCost: 2, hashLength: 16 })

    return await trx.insertInto("refresh_tokens").values({
      jti,
      token: hashed,
      exp: exp!,
      expiredAt: (Date.now() / 1000) + 60 * 60 * 24,
    }).returning("id").execute()
  })

  if (result.length === 0) {
    badGateway()
  }

  return token
}
