"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
router.post("/sign-up", user_controller_1.default.signUp);
router.post("/sign-in/password", user_controller_1.default.signInWithPassword);
router.post("/refresh-token", user_controller_1.default.refreshToken);
router.post("/sign-out", user_controller_1.default.signOut);
exports.default = router;
//# sourceMappingURL=user.routes.js.map