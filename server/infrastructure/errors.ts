export enum ErrorMessage {
  PROXY_NAME_EXIST = "proxy name already exist",
  INVALID_SECRET_KEY = "invalid secret key",
  MISSING_SECRET_KEY = "missing secret key",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",
  INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
  EXPIRED_ACCESS_TOKEN = "EXPIRED_ACCESS_TOKEN",
}

export const badRequest = (message: string = "Bad Request") => {
  throw createError({
    statusCode: 400,
    message,
  })
}

export const unprocessableEntity = (message: string = "Unprocessable Entity") => {
  throw createError({
    statusCode: 422,
    message,
  })
}

export const notFound = (message: string = "Not Found") => {
  throw createError({
    statusCode: 404,
    message,
  })
}

export const badGateway = (message: string = "Bad Gateway") => {
  throw createError({
    statusCode: 500,
    message,
  })
}

export const unauthorized = (message: string = "Unauthorized") => {
  throw createError({
    statusCode: 401,
    message,
  })
}

export const forbidden = (message: string = "Forbidden") => {
  throw createError({
    statusCode: 403,
    message,
  })
}
