"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const api_errors_1 = require("../lib/api.errors");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = require("jsonwebtoken");
function errorHandleMiddleware(err, _req, res, _next) {
    if (err instanceof api_errors_1.NotFoundError) {
        const error = {
            code: "404",
            title: "Not found",
            message: err.message,
        };
        return res.status(404).json(error);
    }
    if (err instanceof api_errors_1.BadRequestError) {
        const error = {
            code: "400",
            title: "Bad request",
            message: err.message,
        };
        return res.status(400).json(error);
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const error = {
            code: "422",
            title: "Validation error",
            message: err.message,
        };
        return res.status(422).json(error);
    }
    if (err instanceof zod_1.z.ZodError) {
        const error = {
            code: "422",
            title: "Validation error",
            message: err.errors[0].message,
        };
        return res.status(422).json(error);
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        const error = {
            code: "401",
            title: "Token expired",
            message: err.message,
        };
        return res.status(401).json(error);
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        const error = {
            code: "401",
            title: "Token error",
            message: err.message,
        };
        return res.status(401).json(error);
    }
    if (err instanceof api_errors_1.UnAuthorizedError) {
        const error = {
            code: "401",
            title: "Unauthorized",
            message: err.message,
        };
        return res.status(401).json(error);
    }
    if (err instanceof api_errors_1.FileUploadError) {
        const error = {
            code: "500",
            title: "File upload error",
            message: err.message,
        };
        return res.status(500).json(error);
    }
    const error = {
        code: "500",
        title: "Internal error",
        message: err.message,
    };
    return res.status(500).json(error);
}
exports.default = errorHandleMiddleware;
//# sourceMappingURL=error-handle.middleware.js.map