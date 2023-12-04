"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const express_utils_1 = require("../lib/utils/express.utils");
const auth_utils_1 = __importDefault(require("../lib/utils/auth.utils"));
const api_errors_1 = require("../lib/api.errors");
const account_model_1 = __importDefault(require("../models/account.model"));
const request_ip_1 = __importDefault(require("request-ip"));
const app_config_1 = __importDefault(require("../config/app.config"));
const sign_in_validation_1 = require("../lib/schemas/user/sign-in.validation");
const sign_up_validation_1 = require("../lib/schemas/user/sign-up.validation");
async function signUp(req, res) {
    const { name, email, password } = sign_up_validation_1.SignUpWithPasswordBodySchema.parse(req.body);
    const foundUser = await user_model_1.default.findByEmail(email);
    if (foundUser) {
        throw new api_errors_1.BadRequestError("User already exists");
    }
    const passwordHash = await auth_utils_1.default.hashPassword(password);
    const role = app_config_1.default.default.admin.emails.includes(email)
        ? "admin"
        : "user";
    await user_model_1.default.create({
        name: name,
        email: email,
        created: Date.now(),
        passwordHash: passwordHash,
        emailVerified: true,
        role: role,
    });
    return (0, express_utils_1.Message)(res, "User registered", "Check your email for verification letter!", 201);
}
async function signInWithPassword(req, res) {
    const { email, password } = sign_in_validation_1.SignInWithPasswordBodySchema.parse(req.body);
    const foundUser = await user_model_1.default.findByEmail(email);
    if (!foundUser) {
        throw new api_errors_1.NotFoundError(`User with email ${email} not found`);
    }
    if (!foundUser.passwordHash) {
        throw new api_errors_1.BadRequestError("If you have signed up with social media, please sign in with it");
    }
    const isPasswordCorrect = await auth_utils_1.default.verifyPassword(password, foundUser.passwordHash);
    if (!isPasswordCorrect) {
        throw new api_errors_1.BadRequestError("Invaid email or password");
    }
    const refreshToken = auth_utils_1.default.generateToken();
    const ipAddress = request_ip_1.default.getClientIp(req);
    const refreshTokenExpires = app_config_1.default.refreshToken.expires();
    const createdAccount = await account_model_1.default.create({
        user: foundUser._id,
        refreshToken: refreshToken,
        created: Date.now(),
        createdByIp: ipAddress,
        provider: "password",
        expires: refreshTokenExpires,
    });
    if (!createdAccount) {
        throw new api_errors_1.InternalError("Something went wrong");
    }
    const accessToken = auth_utils_1.default.generateAccessToken({
        id: foundUser._id.toString(),
        role: foundUser.role,
    });
    res.cookie(app_config_1.default.refreshToken.cookie.name, refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: refreshTokenExpires,
    });
    res.cookie(app_config_1.default.accessToken.cookie.name, accessToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: app_config_1.default.accessToken.expires(),
    });
    const userAccount = foundUser.toUserAccount();
    return (0, express_utils_1.Ok)(res, userAccount);
}
async function refreshToken(req, res) {
    const refreshToken = req.cookies[app_config_1.default.refreshToken.cookie.name];
    if (!refreshToken) {
        throw new api_errors_1.UnAuthorizedError("Refresh token not found");
    }
    const foundAccount = await account_model_1.default.findByRefreshToken(refreshToken);
    if (!foundAccount) {
        throw new api_errors_1.UnAuthorizedError("Invalid refresh token");
    }
    if (foundAccount.expires < new Date()) {
        throw new api_errors_1.UnAuthorizedError("Refresh token expired");
    }
    if (foundAccount.revoked) {
        throw new api_errors_1.UnAuthorizedError("Refresh token revoked");
    }
    if (foundAccount.replacedBy) {
        throw new api_errors_1.UnAuthorizedError("Refresh token replaced");
    }
    const foundUser = await user_model_1.default.findById(foundAccount.user);
    if (!foundUser) {
        throw new api_errors_1.NotFoundError("User not found");
    }
    const accessToken = auth_utils_1.default.generateAccessToken({
        id: foundUser._id.toString(),
        role: foundUser.role,
    });
    res.cookie(app_config_1.default.accessToken.cookie.name, accessToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 15 * 60 * 1000),
    });
    const userAccount = foundUser.toUserAccount();
    return (0, express_utils_1.Ok)(res, userAccount);
}
async function signOut(_req, res) {
    res.clearCookie(app_config_1.default.refreshToken.cookie.name);
    res.clearCookie(app_config_1.default.accessToken.cookie.name);
    return (0, express_utils_1.Message)(res, "Signed out", "Signed out successfully", 200);
}
exports.default = {
    signUp,
    signInWithPassword,
    refreshToken,
    signOut,
};
//# sourceMappingURL=user.controller.js.map