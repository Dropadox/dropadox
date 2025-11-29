import { defineEventHandler, sendStream, createError } from "h3";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";
import { uploads } from "../../database/schema";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };

  const db = useDrizzle();

  // 1) Lookup upload by ID
  const record = await db
    .select()
    .from(uploads)
    .where(eq(uploads.id, Number(id)))
    .get();

  console.log(record);
  if (!record) {
    throw createError({
      statusCode: 404,
      statusMessage: "Upload record not found"
    });
  }
  if (!record.filePath) {
  throw createError({
    statusCode: 404,
    statusMessage: "File path missing in database"
  });
  }

  // 2) Build file path from DB

  if (!fs.existsSync(record.filePath)) {
    throw createError({
      statusCode: 404,
      statusMessage: "File not found on disk"
    });
  }

  // 3) Stream file
  const stream = fs.createReadStream(record.filePath);
  return sendStream(event, stream);
});
