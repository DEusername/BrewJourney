import dotenv from "dotenv"
import { defineConfig, env } from "prisma/config"

dotenv.config({ path: "../.env.db" })

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: process.env["POSTGRES_URL"],
    },
});
