"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTagListParamsSchema = exports.GetTagParamsSchema = void 0;
const zod_1 = require("zod");
exports.GetTagParamsSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1),
});
exports.GetTagListParamsSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).optional(),
    limit: zod_1.z.coerce.number().min(5).optional(),
    query: zod_1.z.string().optional(),
    orderBy: zod_1.z.string().optional(),
});
//# sourceMappingURL=get-tag.schema.js.map