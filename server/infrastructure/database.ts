import BetterSqliteDatabase from "better-sqlite3"
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely"
import type { Database } from "~/server/schema"

const config = useRuntimeConfig()

const dialect = new SqliteDialect({
  database: new BetterSqliteDatabase(config.databaseUrl, {
    fileMustExist: true,
  }),
})

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
})
