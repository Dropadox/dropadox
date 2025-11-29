import { defineEventHandler, sendStream, createError } from "h3";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";
import { uploads } from "../../database/schema"

export default defineEventHandler(async (event) => {
  const { filename } = event.context.params as { filename: string };


  const filePath = path.join(
    process.cwd(),
    "public/uploads",
    filename
  );

  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      statusMessage: "File not found"
    });
  }

  const stream = fs.createReadStream(filePath);
  return sendStream(event, stream);
});
