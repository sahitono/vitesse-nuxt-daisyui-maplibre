import type { UsersTable } from "~/server/schema/users"
import type { RolesTable } from "~/server/schema/roles"
import type { RefreshTokensTable } from "~/server/schema/refreshTokens"

export type { UsersTable } from "~/server/schema/users"
export type { RolesTable } from "~/server/schema/roles"
export type { RefreshTokens } from "~/server/schema/refreshTokens"

export interface Database {
  users: UsersTable
  roles: RolesTable
  refresh_tokens: RefreshTokensTable
}
