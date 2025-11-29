import { eq } from "drizzle-orm";
import { uploads } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
    const fileId = getRouterParam(event, "fileId")?.toString();
    const { token } = await readBody(event);

    const userPayload = getUserPayload(token);

    const upload = await useDrizzle().select().from(uploads)
        .where(eq(uploads.id, parseInt(fileId ?? '-1')))
        .get();

    if (!upload) {
        throw createError({
            status: 404,
            statusText: "Invalid file. File: " + fileId 
        })
    }

    return { upload }
});