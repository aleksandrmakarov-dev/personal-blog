"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseSlugUpdater = require("mongoose-slug-updater");
const mongoose_1 = __importStar(require("mongoose"));
const PostSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date },
    image: { type: String },
    readingTime: { type: Number, default: 0 },
    slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    favorites: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
PostSchema.method("addToPostFavorites", async function (userId) {
    var _a;
    if (!((_a = this.favorites) === null || _a === void 0 ? void 0 : _a.includes(userId))) {
        await this.updateOne({ $push: { favorites: userId } });
    }
});
PostSchema.method("removeFromPostFavorites", async function (userId) {
    var _a;
    if ((_a = this.favorites) === null || _a === void 0 ? void 0 : _a.includes(userId)) {
        await this.updateOne({ $pull: { favorites: userId } });
    }
});
PostSchema.method("isFavorite", function (userId) {
    var _a;
    return (_a = this.favorites) === null || _a === void 0 ? void 0 : _a.includes(new mongoose_1.default.Types.ObjectId(userId));
});
PostSchema.plugin(mongooseSlugUpdater);
PostSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const PostModel = (0, mongoose_1.model)("Post", PostSchema);
exports.default = PostModel;
//# sourceMappingURL=post.model.js.map