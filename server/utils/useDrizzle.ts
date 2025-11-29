import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../database/schema";

export const tables = schema;

let db: ReturnType<typeof drizzle> | null = null;

export function useDrizzle() {
  if (!db) {
    const client = createClient({
      url: process.env.DB_FILE_NAME!,
    });

    db = drizzle(client, { schema });
  }
  return db;
}

export type User = typeof schema.users.$inferSelect;
export type Upload = typeof schema.uploads.$inferSelect;