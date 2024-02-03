import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export interface UsersTable {
  id: Generated<number>
  username: string
  password: string
  createdAt: ColumnType<Date, string | undefined, never>
  roleId: number
}

export type Users = Selectable<UsersTable>
export type NewUsers = Insertable<UsersTable>
export type UpdateUsers = Updateable<UsersTable>
