import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const checkFileType = (file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else cb("Not valid image file");
};

const upload = multer({
    storage,
});

router.post("/", upload.single("image"), (req, res) => {
    if (req.file) {
        res.status(200).json({
            message: "Image uploaded successfully",
            image: `${req.file.path}`,
        });
    } else {
        res.status(404);
        throw new Error("Request Object's file object undefined");
    }
});

export default router;
