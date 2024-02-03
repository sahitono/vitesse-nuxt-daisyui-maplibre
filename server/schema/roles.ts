import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export interface RolesTable {
  id: Generated<number>
  name: string
  isAdmin: 0 | 1
  createdAt: ColumnType<Date, string | undefined, never>
}

export type Roles = Selectable<RolesTable>
export type NewRoles = Insertable<RolesTable>
export type UpdateRoles = Updateable<RolesTable>
