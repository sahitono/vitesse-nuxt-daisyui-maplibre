import { match } from "ts-pattern"
import { badGateway } from "~/server/infrastructure/errors"

export const getRefreshTokenMaxAge = () => {
  const age = match(useRuntimeConfig().public.auth.provider)
    .with(({ type: "refresh" }), (p) => {
      return p.refreshToken.maxAgeInSeconds
    })
    .otherwise(() => undefined)

  if (age == null) {
    throw badGateway("invalid config")
  }

  return age
}
