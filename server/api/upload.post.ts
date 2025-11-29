import multer from "multer";
import { defineEventHandler, readMultipartFormData } from "h3";

const upload = multer({ dest:"uploads/"})

export default defineEventHandler( async (event) => {
    const formdata = await readMultipartFormData(event); 
    
    if (!formdata){
        return {error:"failded to grab form data"};
    }
    const file = formdata.find(item => item.filename);

    if (!file){
        return {error:"failed to get file"}
    }

    return {
        name: file.filename,
        type: file.type,
        size: file.data.length
    };

})