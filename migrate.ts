import "dotenv/config"
import * as path from "node:path"
import { promises as fs } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"
import { Kysely, type Migration, type MigrationProvider, Migrator, SqliteDialect } from "kysely"
import { get } from "radash"

import consola from "consola"
import Database from "better-sqlite3"

import { run } from "kysely-migration-cli"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class ESMFileMigrationProvider implements MigrationProvider {
  readonly relativePath: string

  constructor(relativePath: string) {
    this.relativePath = relativePath
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {}
    // const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
    const resolvedPath = path.resolve(__dirname, this.relativePath)
    const files = await fs.readdir(resolvedPath)

    for (const fileName of files) {
      const importPath = path.relative(".", path.join(this.relativePath, fileName)).replaceAll("\\", "/")
      consola.info(importPath)
      consola.info(this.relativePath)
      const migration = await import(`./${importPath}`)
      const migrationKey = fileName.substring(0, fileName.lastIndexOf("."))

      migrations[migrationKey] = migration
    }

    return migrations
  }
}

// For ESM environment
const migrationFolder = new URL("./migrations", import.meta.url).pathname

const db = new Kysely<typeof Database>({
  dialect: new SqliteDialect({
    // eslint-disable-next-line node/prefer-global/process
    database: new Database(get(process.env, "NUXT_DATABASE_URL", "")),
  }),
})

const migrator = new Migrator({
  db,
  provider: new ESMFileMigrationProvider("./migrations"),
})

run(db, migrator, migrationFolder)
