"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToTagDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mapToTagDTO = (tag, userId) => {
    var _a, _b, _c;
    return {
        id: tag._id.toString(),
        name: tag.name,
        slug: tag.slug,
        postsCount: ((_a = tag.posts) === null || _a === void 0 ? void 0 : _a.length) || 0,
        followersCount: ((_b = tag.followings) === null || _b === void 0 ? void 0 : _b.length) || 0,
        isFollowing: userId
            ? (_c = tag.followings) === null || _c === void 0 ? void 0 : _c.includes(new mongoose_1.default.Types.ObjectId(userId))
            : false,
    };
};
exports.mapToTagDTO = mapToTagDTO;
//# sourceMappingURL=tag.types.js.map