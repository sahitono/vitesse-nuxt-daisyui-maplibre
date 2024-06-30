import { match } from "ts-pattern"
import { badGateway } from "~/server/infrastructure/errors"

export const getAccessTokenMaxAge = (): number => {
  const age = match(useRuntimeConfig().public.auth.provider)
    .with(({ type: "refresh" }), (p) => {
      return p.token.maxAgeInSeconds
    })
    .otherwise(() => null)

  if (age == null) {
    throw badGateway("invalid config")
  }

  return age
}
