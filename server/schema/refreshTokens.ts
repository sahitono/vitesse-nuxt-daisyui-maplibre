import type { Generated, Insertable, Selectable, Updateable } from "kysely"

export interface RefreshTokensTable {
  id: Generated<number>
  jti: string
  token: string
  exp: number
  expiredAt: number
}

export type RefreshTokens = Selectable<RefreshTokensTable>
export type NewRefreshTokens = Insertable<RefreshTokensTable>
export type UpdateRefreshTokens = Updateable<RefreshTokensTable>
