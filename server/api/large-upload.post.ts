import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { uploads } from "../database/schema";
import { UserPayload } from "~/shared/types/UserPayload";

const CHUNK_DIR = path.join(process.cwd(), "uploads/chunks");
const FINAL_DIR = path.join(process.cwd(), "uploads");

export default defineEventHandler(async (event) => {
  // make sure folders exist
  fs.mkdirSync(FINAL_DIR, { recursive: true });
  fs.mkdirSync(CHUNK_DIR, { recursive: true });


  const formdata = await readMultipartFormData(event);

  if (!formdata) {
    throw createError({ statusCode: 400, statusMessage: "no formdata" });
  }

  const token = formdata.find(f => f.name === "token")?.data.toString();
  const fileName = formdata.find(f => f.name === "fileName")?.data.toString();
  const uploadIdField = formdata.find(f => f.name === "uploadId")?.data.toString();
  const chunkIndex = Number(formdata.find(f => f.name === "chunkIndex")?.data.toString());
  const totalChunks = Number(formdata.find(f => f.name === "totalChunks")?.data.toString());
  const chunk = formdata.find(f => f.name === "chunk");

  if (!token || !fileName || !chunk || Number.isNaN(chunkIndex) || Number.isNaN(totalChunks)) {
    throw createError({ statusCode: 400, statusMessage: "missing fields" });
  }

  const user = jwt.verify(token, process.env.JSON_SECRET_KEY!) as UserPayload;

  const uploadId = uploadIdField || crypto.randomUUID();
  const tempPath = path.join(CHUNK_DIR, `${uploadId}.part`);

  // append chunk
  fs.appendFileSync(tempPath, chunk.data);

  const isLast = chunkIndex === totalChunks - 1;

  //only go past this point if all chunks are done
  if (!isLast) {
    return {
      ok: true,
      uploadId,
      complete: false
    };
  }

  // finalize file
  const safeName = fileName.replace(/[^\w.\-]/g, "_");
  const finalName = `${crypto.randomUUID()}.${safeName}`;
  const finalPath = path.join(FINAL_DIR, finalName);

  fs.renameSync(tempPath, finalPath);

  const stats = fs.statSync(finalPath);

  const upload = await useDrizzle()
    .insert(uploads)
    .values({
      userId: String(user.id),
      filePath: path.join("uploads", finalName),
      privacyFlag: "private",
      size: stats.size,
    })
    .returning()
    .get();

  return {
    ok: true,
    uploadId,
    complete: true,
    upload,
  };
});


