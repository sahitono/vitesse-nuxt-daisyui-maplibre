import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

export const refreshTokens = sqliteTable("refresh_token", {
  jti: text("jti").notNull(),
  token: text("token").notNull(),
  exp: integer("exp").notNull(), // Storing expiration time as an integer (UNIX timestamp)
  expiredAt: integer("expired_at").notNull(), // Storing expiration timestamp as an integer
}, (table) => ({
  jtiExpiredIdx: uniqueIndex("idx_jti_expired").on(table.jti, table.expiredAt),
}))
