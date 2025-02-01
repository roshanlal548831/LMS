import express from "express";
import { upload } from "../middleware/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
    try {
        const result = await uploadMedia(req.file.path)
        res.status(200).json({
            message: "file uploaed successfully.",
            data: result,
            success: true
        })
    } catch (error) {
        console.log("thi si serror ======>", error)
        res.status(500).json({
            success: false,
            message: "Error uploading file!"
        })
    }
});

export default router