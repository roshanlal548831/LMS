import DatauriParser from "datauri/parser.js";
import path from "path"

const getDataUri = (file) => {
    if(file){
        const parser = new DatauriParser();
        const extName = path.extname(file?.originalname).toString();
        // console.log("file uri =>",extName)
       return parser.format(extName,file?.buffer);
    }
 

}

export default getDataUri;
