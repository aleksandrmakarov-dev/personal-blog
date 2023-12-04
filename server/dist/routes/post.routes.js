"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const role_protect_middleware_1 = __importDefault(require("../middleware/role-protect.middleware"));
const user_extract_middleware_1 = __importDefault(require("../middleware/user-extract.middleware"));
const router = (0, express_1.Router)();
const onlyAdmin = (0, role_protect_middleware_1.default)(["admin"]);
const anyUser = (0, role_protect_middleware_1.default)(["admin", "user"]);
const extractUser = (0, user_extract_middleware_1.default)();
router.get("/", extractUser, post_controller_1.default.getList);
router.post("/", onlyAdmin, post_controller_1.default.create);
router.get("/slug/:identifier", post_controller_1.default.getBySlug);
router.put("/id/:identifier", onlyAdmin, post_controller_1.default.updateById);
router.delete("/id/:identifier", onlyAdmin, post_controller_1.default.deleteById);
router.put("/favorite/id/:identifier", anyUser, post_controller_1.default.favorite);
router.delete("/favorite/id/:identifier", anyUser, post_controller_1.default.unfavorite);
exports.default = router;
//# sourceMappingURL=post.routes.js.map