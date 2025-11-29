import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
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

export const userSettings = sqliteTable("userSettings", {
    id: int("id").primaryKey({ autoIncrement: true }),
    userID: text("user_id").references(() => users.id),
    colorMode: text("color_mode").default('light'),
})