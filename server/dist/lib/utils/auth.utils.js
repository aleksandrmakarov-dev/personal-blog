"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_config_1 = __importDefault(require("../../config/app.config"));
async function hashPassword(password) {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    return hashedPassword;
}
async function verifyPassword(password, passwordHash) {
    const isPasswordCorrect = await bcrypt_1.default.compare(password, passwordHash);
    return isPasswordCorrect;
}
function generateToken() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, app_config_1.default.accessToken.secretKey, {
        expiresIn: app_config_1.default.accessToken.ttl,
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, app_config_1.default.accessToken.secretKey);
}
exports.default = {
    generateToken,
    generateAccessToken,
    verifyAccessToken,
    hashPassword,
    verifyPassword,
};
//# sourceMappingURL=auth.utils.js.map