import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  tokenType: { type: String, required: true },
  scope: { type: String, required: true },
  revoked: { type: Date },
});

AccountSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

type Account = InferSchemaType<typeof AccountSchema>;

const AccountModel =
  mongoose.models.Account || model<Account>("Account", AccountSchema);

export default AccountModel;
