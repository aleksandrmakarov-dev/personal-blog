"use strict";
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
const app_config_1 = require("../config/app.config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, app_config_1.cloudinaryConfigure)();
const app = (0, express_1.default)();
(0, mongoose_1.connectToDb)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    preflightContinue: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/posts", post_routes_1.default);
app.use("/api/tags", tag_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/files", file_routes_1.default);
app.use("/", (_req, res) => res.send("Server is working!"));
app.use(error_handle_middleware_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map