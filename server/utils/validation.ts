import type { ZodObject, ZodRawShape } from "zod"
import { badRequest } from "~/server/infrastructure/errors"

export const parseOrThrow = <Z extends ZodRawShape, D>(zodObject: ZodObject<Z>, data: D) => {
  const { success } = zodObject.safeParse(data)
  if (!success) {
    throw badRequest()
  }
}
