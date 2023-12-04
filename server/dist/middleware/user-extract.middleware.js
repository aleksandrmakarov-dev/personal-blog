"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../config/app.config"));
const auth_utils_1 = __importDefault(require("../lib/utils/auth.utils"));
function userExtractMiddleware() {
    return function (req, _res, next) {
        if (!req.cookies) {
            return next();
        }
        const accessToken = req.cookies[app_config_1.default.accessToken.cookie.name];
        if (!accessToken) {
            return next();
        }
        const payload = auth_utils_1.default.verifyAccessToken(accessToken);
        req.user = payload;
        next();
    };
}
exports.default = userExtractMiddleware;
//# sourceMappingURL=user-extract.middleware.js.map