import jwt from 'jsonwebtoken';
import { UserPayload } from '~~/shared/types/UserPayload';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';
import { User } from './useDrizzle';

export function getUserPayload(token: string): UserPayload {
    const userPayload = jwt.verify(token, process.env.JSON_SECRET_KEY!);

    return userPayload as UserPayload;
}

export async function getUserFromPayload(userPayload: UserPayload) {
    const user = await useDrizzle().select().from(users)
        .where(eq(users.id, Number(userPayload.id))).get();

    return user;
}