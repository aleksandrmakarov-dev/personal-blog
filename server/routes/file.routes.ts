import express from "express";
import fileController from "../controllers/file.controller";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), fileController.upload);

export default router;
