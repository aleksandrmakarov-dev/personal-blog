"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagBodySchema = void 0;
const zod_1 = require("zod");
exports.CreateTagBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
});
//# sourceMappingURL=create-tag.validation.js.map