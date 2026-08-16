import "dotenv/config"

import { defineConfig } from "drizzle-kit"

const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL_UNPOOLED or DATABASE_URL. Configure Neon credentials before running Drizzle Kit.",
  )
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: databaseUrl,
  },
})
