import { type Kysely, sql } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  await sql`PRAGMA journal_mode=WAL`.execute(db)

  await db.schema.createTable("roles").ifNotExists().addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text", (col) => col.unique().notNull())
    .addColumn("is_admin", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute()

  await db.schema.createTable("users")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("username", "text", (col) => col.unique().notNull())
    .addColumn("password", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn("role_id", "integer", (col) => col.notNull())
    .execute()

  await db.schema
    .createTable("refresh_tokens")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("jti", "text", (col) => col.unique().notNull())
    .addColumn("exp", "integer", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.unique().notNull())
    .addColumn("expired_at", "integer", (col) => col.notNull())
    .execute()

  await db.schema.createIndex("idx_refresh_token__all")
    .on("refresh_tokens")
    .columns(["jti", "expired_at"])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("refresh_tokens").cascade().execute()
  await db.schema.dropTable("roles").cascade().execute()
}
