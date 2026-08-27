import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "database/prisma/schema.prisma",
  migrations: {
    path: "database/prisma/migrations",
    seed: "tsx database/seeds/index.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
