import type { InferSelectModel } from "drizzle-orm/table"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { uuidv7 } from "uuidv7"

export const roles = sqliteTable("role", {
  id: text().primaryKey().$defaultFn(() => {
    return uuidv7()
  }),
  name: text().unique(),
})

export type RoleModel = InferSelectModel<typeof roles>
