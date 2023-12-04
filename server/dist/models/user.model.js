"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongooseSlugUpdater = require("mongoose-slug-updater");
const UserSchema = new mongoose_1.Schema({
    name: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    passwordHash: { type: String },
    emailVerified: { type: Boolean, default: false },
    created: { type: Date, default: Date.now() },
    updated: { type: Date },
    slug: { type: String, slug: "email", slugPaddingSize: 4, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    favoritePosts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    followingTags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    accounts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Account",
        },
    ],
});
UserSchema.method("toUserAccount", function () {
    const userAccout = {
        id: this._id.toString(),
        name: this.name,
        email: this.email,
        image: this.image,
        role: this.role,
    };
    return userAccout;
});
UserSchema.method("addFavoritePost", async function (postId) {
    var _a;
    if (!((_a = this.favoritePosts) === null || _a === void 0 ? void 0 : _a.includes(postId))) {
        await this.updateOne({ $push: { favoritePosts: postId } });
    }
});
UserSchema.method("removeFavoritePost", async function (postId) {
    var _a;
    if ((_a = this.favoritePosts) === null || _a === void 0 ? void 0 : _a.includes(postId)) {
        await this.updateOne({ $pull: { favoritePosts: postId } });
    }
});
UserSchema.method("addFollowingTag", async function (tagId) {
    var _a;
    if (!((_a = this.followingTags) === null || _a === void 0 ? void 0 : _a.includes(tagId))) {
        await this.updateOne({ $push: { followingTags: tagId } });
    }
});
UserSchema.method("removeFollowingTag", async function (tagId) {
    var _a;
    if ((_a = this.followingTags) === null || _a === void 0 ? void 0 : _a.includes(tagId)) {
        await this.updateOne({ $pull: { followingTags: tagId } });
    }
});
UserSchema.method("addPost", async function (postId) {
    var _a;
    if (!((_a = this.posts) === null || _a === void 0 ? void 0 : _a.includes(postId))) {
        await this.updateOne({ $push: { posts: postId } });
    }
});
UserSchema.method("removePost", async function (postId) {
    var _a;
    if ((_a = this.posts) === null || _a === void 0 ? void 0 : _a.includes(postId)) {
        await this.updateOne({ $pull: { posts: postId } });
    }
});
UserSchema.static("findByEmail", async function (email) {
    return await this.findOne({ email: email });
});
UserSchema.plugin(mongooseSlugUpdater);
UserSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.passwordHash;
        delete returnedObject.__v;
    },
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map