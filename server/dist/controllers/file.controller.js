"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = require("../lib/api.errors");
const cloudinary_1 = __importDefault(require("cloudinary"));
const express_utils_1 = require("../lib/utils/express.utils");
const app_config_1 = __importDefault(require("../config/app.config"));
const streamifier_1 = __importDefault(require("streamifier"));
async function upload(req, res) {
    const file = req.file;
    if (!file) {
        throw new api_errors_1.NotFoundError("No file provided");
    }
    const fileStream = streamifier_1.default.createReadStream(file.buffer);
    const uploadStream = await cloudinary_1.default.v2.uploader.upload_stream({
        folder: app_config_1.default.upload.path.cloud,
        type: "upload",
    }, (error, uploadedFile) => {
        if (error) {
            throw new api_errors_1.FileUploadError(error.message);
        }
        if (!uploadedFile) {
            throw new api_errors_1.FileUploadError("No file uploaded");
        }
        const fileDTO = {
            name: uploadedFile.original_filename,
            size: uploadedFile.bytes,
            type: uploadedFile.format,
            url: uploadedFile.secure_url,
        };
        return (0, express_utils_1.Ok)(res, fileDTO);
    });
    fileStream.pipe(uploadStream);
}
exports.default = {
    upload,
};
//# sourceMappingURL=file.controller.js.map