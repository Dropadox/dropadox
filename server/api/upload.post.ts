import multer from "multer";
import { defineEventHandler, readMultipartFormData } from "h3";
import path from "path";
import fs from "fs";
import { Upload } from '../utils/useDrizzle';
import { uploads } from "../database/schema";
import jwt from 'jsonwebtoken';
import { UserPayload } from "~/shared/types/UserPayload";
import { getUserStorageBytes } from "../database/userStorage";

const MAX_BYTES = Number(process.env.MAX_USER_STORAGE_BYTES);
const upload = multer({ dest: "uploads/" })

export default defineEventHandler(async (event) => {
    const formdata = await readMultipartFormData(event);

    if (!formdata) {
        return { error: "failded to grab form data" };
    }
    
    const file = formdata.find(item => item.name === "file");

    if (!file) {
        return { error: "failed to get file" }
    }
    //if(!file.filename){
    //    return {error:"file has no filename"};
    //}
    const uuid = crypto.randomUUID();
    const filename = uuid + "." + file.filename; 

    const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        filename
    );

    const token = formdata.find(item => item.name === "token")?.data.toString();

    if (!token) {
        throw createError({
            statusText: "No token found",
            status: 400
        })
    }
    
    const userPayload = jwt.verify(token, process.env.JSON_SECRET_KEY!) as UserPayload;

    console.log(`MAX_BYTES:${MAX_BYTES}`);
    console.log(`userid:${userPayload.id}`)
    console.log(`getUserStorageBytes:${await getUserStorageBytes(String(userPayload.id))}`);
    if (await getUserStorageBytes(String(userPayload.id)) >= MAX_BYTES){
        console.log("storage capacity reached");
        throw createError({
          statusCode: 413,
          statusMessage: "MAXIMUM_STORAGE_REACHED",   // ← your custom flag/message
          data: {
              maxBytes: MAX_BYTES
          }
        });
    }
    fs.writeFileSync(uploadPath, file.data);



    const upload = await useDrizzle().insert(uploads)
        .values({
            userId: String(userPayload.id),
            filePath: uploadPath,
            privacyFlag: "private",
            size: file.data.byteLength,

        }).returning().get()



    return {
        upload,
        name: file.filename,
        type: file.type,
        size: file.data.length
    };

})
