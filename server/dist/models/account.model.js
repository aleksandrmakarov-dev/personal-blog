"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    provider: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expires: { type: Date },
    created: { type: Date, default: Date.now },
    createdByIp: { type: String },
    replacedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
    },
    revokedByIp: { type: String },
    revoked: { type: Date },
});
AccountSchema.static("findByRefreshToken", async function (refreshToken) {
    return await this.findOne({ refreshToken: refreshToken });
});
AccountSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const AccountModel = (0, mongoose_1.model)("Account", AccountSchema);
exports.default = AccountModel;
//# sourceMappingURL=account.model.js.map