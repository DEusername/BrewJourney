import dotenv from "dotenv"
import { defineConfig, env } from "prisma/config"

dotenv.config({ path: "./db/.env.db" })

console.log("POSTGRES_URL:", process.env.POSTGRES_URL);

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: process.env["POSTGRES_URL"],
    },
});
