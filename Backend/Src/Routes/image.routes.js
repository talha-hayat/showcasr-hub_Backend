import multer from "multer";
import { storage } from "../Config/cloudinry.js";
import express from "express";

const upload = multer({storage: storage});

const router = express.Router();
router.post("/", upload.single("key"), (req, res) => {
    try {
        const ImageUrl = req.file.path;
        return res.status(201).json({
            message: "Image uploaded successfully",
            ImageUrl
        });
    } catch (error) {
        res.status(500).json({
            message: "Error processing image",
            error: error.message
        });
    }
});
export default router;

