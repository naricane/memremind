import { defineConfig } from "drizzle-kit";
import { required } from "./src/common";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: required(process.env, "DB_FILE_NAME"),
    },
});
