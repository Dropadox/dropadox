import { uploads } from "./schema";
import { sql, eq } from "drizzle-orm";
import { useDrizzle } from "../utils/useDrizzle";

export async function getUserStorageBytes(userId: string) {
  const db = useDrizzle();

  const result = await db
    .select({
      total: sql<number>`COALESCE(SUM(${uploads.size}), 0)`
    })
    .from(uploads)
    .where(eq(uploads.userId, userId));

  return result[0]?.total ?? 0;
}

