export const isExpired = (timeInSecond?: number): boolean => {
  if (timeInSecond == null) {
    return true
  }
  return timeInSecond < (Date.now() / 1000)
}
