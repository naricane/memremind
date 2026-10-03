import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messages = sqliteTable("messages", {
    id: integer().primaryKey({ autoIncrement: true }),
    role: text({ enum: ["user", "assistant"] }).notNull(),
    content: text().notNull(),
    createdAt: text("created_at").notNull(),
});
