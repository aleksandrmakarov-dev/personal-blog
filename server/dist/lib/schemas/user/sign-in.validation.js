"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInWithPasswordBodySchema = void 0;
const zod_1 = require("zod");
exports.SignInWithPasswordBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(50),
});
//# sourceMappingURL=sign-in.validation.js.map