import jwt from 'jsonwebtoken';
import { uploads } from '~~/server/database/schema';
import { eq } from 'drizzle-orm';
import { getUserFromPayload, getUserPayload } from '~~/server/utils/getUser';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { token } = body;

    if (!token) {
        throw createError({
            statusText: "No token provided",
            status: 400,
        })
    }

    const userPayload = getUserPayload(token);
    const user = await getUserFromPayload(userPayload);

    if (!user) {
        throw createError({
            statusText: "No user found.",
            status: 404
        });
    }

    const userUploads = await useDrizzle().select().from(uploads)
        .where(eq(uploads.userId, user.id.toString()))
        .all()

    return { userUploads }
});