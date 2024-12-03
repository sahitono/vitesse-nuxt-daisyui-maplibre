import type { Maybe } from "~~/types/utility"
import jwt from "jsonwebtoken"
import * as uuid from "uuid"

export interface AccessTokenPayload {
  username: string
  roleName: Maybe<string>
  isAdmin: Maybe<boolean>
}

export const createAccessToken = (user: AccessTokenPayload, expiresIn: number, jti?: string) => {
  return jwt.sign(user, useRuntimeConfig().secret, {
    expiresIn,
    jwtid: jti ?? uuid.v4(),
  })
}
