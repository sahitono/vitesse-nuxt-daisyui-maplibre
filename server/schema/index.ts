import type { RefreshTokensTable } from "~/server/schema/refreshTokens"
import type { RolesTable } from "~/server/schema/roles"
import type { UsersTable } from "~/server/schema/users"

export type { RefreshTokens } from "~/server/schema/refreshTokens"
export type { RolesTable } from "~/server/schema/roles"
export type { UsersTable } from "~/server/schema/users"

export interface Database {
  users: UsersTable
  roles: RolesTable
  refresh_tokens: RefreshTokensTable
}
