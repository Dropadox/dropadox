import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    password: text("password"),
    email: text("password"),
    createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
})

export const uploads = sqliteTable("uploads", {
    id: int("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").references(() => users.id),
    filePath: text("file_path"),
    privacyFlag: text("privacy_flag"),
    size: int("size").default(0),
    createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
})