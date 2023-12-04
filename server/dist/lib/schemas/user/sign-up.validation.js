"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpWithPasswordBodySchema = void 0;
const zod_1 = require("zod");
exports.SignUpWithPasswordBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(50),
});
//# sourceMappingURL=sign-up.validation.js.map