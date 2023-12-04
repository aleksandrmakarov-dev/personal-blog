"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = require("../lib/api.errors");
const cloudinary_1 = __importDefault(require("cloudinary"));
const express_utils_1 = require("../lib/utils/express.utils");
const app_config_1 = __importDefault(require("../config/app.config"));
async function upload(req, res) {
    const file = req.file;
    if (!file) {
        throw new api_errors_1.NotFoundError("No file provided");
    }
    try {
        const uploadedFile = await cloudinary_1.default.v2.uploader.upload(app_config_1.default.upload.path.local(file.filename), {
            folder: app_config_1.default.upload.path.cloud,
            type: "upload",
        });
        const fileDTO = {
            name: uploadedFile.original_filename,
            size: uploadedFile.bytes,
            type: uploadedFile.format,
            url: uploadedFile.secure_url,
        };
        return (0, express_utils_1.Ok)(res, fileDTO);
    }
    catch (error) {
        const apiError = error;
        throw new api_errors_1.FileUploadError(apiError.message);
    }
}
exports.default = {
    upload,
};
//# sourceMappingURL=file.controller.js.map