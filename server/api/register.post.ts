import bcrypt from "bcryptjs";
import { users } from "../database/schema";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { username, password, email } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await useDrizzle().insert(users).values({
        name: username,
        password: hashedPassword,
        email: email
    }).returning().get();

    return { newUser };
});