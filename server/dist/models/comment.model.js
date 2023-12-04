"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    body: { type: String, trim: true, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
    },
    children: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
});
CommentSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const CommentModel = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = CommentModel;
//# sourceMappingURL=comment.model.js.map