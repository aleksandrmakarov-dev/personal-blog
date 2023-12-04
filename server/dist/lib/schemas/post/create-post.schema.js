"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostBodySchema = void 0;
const zod_1 = require("zod");
exports.CreatePostBodySchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(150),
    description: zod_1.z.string().min(1).max(250),
    body: zod_1.z.string().min(1),
    image: zod_1.z.string().nullable(),
    tags: zod_1.z
        .array(zod_1.z.string())
        .min(1)
        .max(3, { message: "Tags must be between 1 and 3" }),
});
//# sourceMappingURL=create-post.schema.js.map