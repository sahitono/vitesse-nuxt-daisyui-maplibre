import type { InferSelectModel } from "drizzle-orm/table"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { uuidv7 } from "uuidv7"
import { roles } from "./roles"

export const users = sqliteTable("user_account", {
  id: text().primaryKey().$defaultFn(() => {
    return uuidv7()
  }),
  username: text().unique().notNull(),
  password: text().notNull(),
  createdAt: integer({ mode: "timestamp" }),
  roleId: integer().notNull().references(() => roles.id, { onDelete: "cascade" }),
})

export type UserModel = InferSelectModel<typeof users>
