import { defineConfig } from "drizzle-kit";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.local" });

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
