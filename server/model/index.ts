export interface BaseResponse<T, M = void> {
  status: "success" | "fail"
  data: T
  meta?: M
}

export const wrapSuccess = <T, M = void>(data: T, metadata?: M): BaseResponse<T, M> => ({
  status: "success",
  data,
  meta: metadata,
})

export const wrapFail = <T>(data: T): BaseResponse<T> => ({
  status: "fail",
  data,
})
