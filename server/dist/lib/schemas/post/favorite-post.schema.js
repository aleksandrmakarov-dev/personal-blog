"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnfavortiePostParamsSchema = exports.FavoritePostParamsSchema = void 0;
const zod_1 = require("zod");
exports.FavoritePostParamsSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1),
});
exports.UnfavortiePostParamsSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1),
});
//# sourceMappingURL=favorite-post.schema.js.map