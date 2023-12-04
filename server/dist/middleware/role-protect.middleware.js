"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../config/app.config"));
const api_errors_1 = require("../lib/api.errors");
const auth_utils_1 = __importDefault(require("../lib/utils/auth.utils"));
function roleProtectMiddleware(roles) {
    return function (req, _res, next) {
        if (!req.cookies) {
            throw new api_errors_1.UnAuthorizedError("No cookies found");
        }
        const accessToken = req.cookies[app_config_1.default.accessToken.cookie.name];
        if (!accessToken) {
            throw new api_errors_1.UnAuthorizedError("Access token not found");
        }
        const payload = auth_utils_1.default.verifyAccessToken(accessToken);
        if (!roles.includes(payload.role)) {
            throw new api_errors_1.UnAuthorizedError("You don't have permission to do this");
        }
        req.user = payload;
        next();
    };
}
exports.default = roleProtectMiddleware;
//# sourceMappingURL=role-protect.middleware.js.map