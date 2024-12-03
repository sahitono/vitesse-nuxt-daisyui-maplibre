import * as process from "node:process"
import * as dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config()

function getEnv(key: string): string {
  const value = process.env[key]
  if (value == null) {
    throw new Error(`Environment variable ${key} not found`)
  }
  return value
}

export default defineConfig({
  schema: "./server/infrastructure/db/schema/index.ts",
  out: "./server/infrastructure/db/migrations",
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: getEnv("NUXT_DATABASE_URL"),
  },
})
