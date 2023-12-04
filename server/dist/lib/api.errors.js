"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadError = exports.UnAuthorizedError = exports.InternalError = exports.BadRequestError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends Error {
}
exports.BadRequestError = BadRequestError;
class InternalError extends Error {
}
exports.InternalError = InternalError;
class UnAuthorizedError extends Error {
}
exports.UnAuthorizedError = UnAuthorizedError;
class FileUploadError extends Error {
}
exports.FileUploadError = FileUploadError;
//# sourceMappingURL=api.errors.js.map