import jwt from "jsonwebtoken"
import * as uuid from "uuid"
import type { Maybe } from "~/types/utility"

export interface AccessTokenPayload {
  username: string
  roleName: Maybe<string>
  isAdmin: Maybe<boolean>
}

export const generateAccessToken = (user: AccessTokenPayload, jti?: string) => {
  return jwt.sign(user, useRuntimeConfig().secret, {
    expiresIn: 60 * 5,
    jwtid: jti ?? uuid.v4(),
  })
}
