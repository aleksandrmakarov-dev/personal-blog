"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("../database/mongoose");
const post_routes_1 = __importDefault(require("../routes/post.routes"));
const tag_routes_1 = __importDefault(require("../routes/tag.routes"));
const error_handle_middleware_1 = __importDefault(require("../middleware/error-handle.middleware"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const file_routes_1 = __importDefault(require("../routes/file.routes"));
const app_config_1 = __importStar(require("../config/app.config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, app_config_1.cloudinaryConfigure)();
const app = (0, express_1.default)();
(0, mongoose_1.connectToDb)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ credentials: true, origin: app_config_1.default.default.allowedOrigins }));
app.use((0, cookie_parser_1.default)());
app.use("/api/posts", post_routes_1.default);
app.use("/api/tags", tag_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/files", file_routes_1.default);
app.use("/", (_req, res) => res.send("Server is working!"));
app.use(error_handle_middleware_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map