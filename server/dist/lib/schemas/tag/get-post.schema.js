"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostListParamsSchema = exports.GetPostParamsSchema = void 0;
const zod_1 = require("zod");
exports.GetPostParamsSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1),
});
exports.GetPostListParamsSchema = zod_1.z.object({
    populate: zod_1.z.string().optional(),
    paged: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
    limit: zod_1.z.coerce.number().min(5).optional(),
    query: zod_1.z.string().optional(),
    orderBy: zod_1.z.string().optional(),
});
//# sourceMappingURL=get-post.schema.js.map