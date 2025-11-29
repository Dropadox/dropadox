import { eq } from 'drizzle-orm';
import { users } from '../database/schema';
import { User } from '../utils/useDrizzle';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { email, username, password } = body;

    if (!username && !email) {
        throw createError({
            status: 400,
            statusText: "An email or username must be provided."
        })
    }

    if (!password) {
        throw createError({
            status: 400,
            statusText: "A password must be provided!"
        })
    }

    let user: User | undefined | null = null;
    if (username) {
        user = await useDrizzle()
            .select()
            .from(users)
            .where(eq(users.name, username))
            .get();
    }

    if (email) {
        user = await useDrizzle()
            .select()
            .from(users)
            .where(eq(users.email, email))
            .get();
    }

    if (!user) {
        throw createError({
            status: 404,
            statusText: "User could not be found!"
        })
    }

    const verificiation = await bcrypt.compare(String(password), user.password ?? '')
    if (!verificiation) {
        throw createError({
            status: 400,
            statusText: "Password is not correct."
        })
    }
 
    const token = jwt.sign({
        username: user.name,
        emailAddress: user.email,
        id: user.id
    }, process.env.JSON_SECRET_KEY!, { expiresIn: "48h" })

    return { token }
});