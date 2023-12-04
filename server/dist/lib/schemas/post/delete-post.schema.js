"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostParamsSchema = void 0;
const zod_1 = require("zod");
exports.DeletePostParamsSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1),
});
//# sourceMappingURL=delete-post.schema.js.map