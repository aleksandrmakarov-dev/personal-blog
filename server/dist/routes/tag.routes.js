"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = __importDefault(require("../controllers/tag.controller"));
const role_protect_middleware_1 = __importDefault(require("../middleware/role-protect.middleware"));
const user_extract_middleware_1 = __importDefault(require("../middleware/user-extract.middleware"));
const router = (0, express_1.Router)();
const onlyAdmin = (0, role_protect_middleware_1.default)(["admin"]);
const anyUser = (0, role_protect_middleware_1.default)(["admin", "user"]);
const extractUser = (0, user_extract_middleware_1.default)();
router.get("/", extractUser, tag_controller_1.default.getList);
router.post("/", onlyAdmin, tag_controller_1.default.create);
router.get("/slug/:identifier", extractUser, tag_controller_1.default.getBySlug);
router.put("/follow/id/:identifier", anyUser, tag_controller_1.default.follow);
router.delete("/follow/id/:identifier", anyUser, tag_controller_1.default.unfollow);
exports.default = router;
//# sourceMappingURL=tag.routes.js.map