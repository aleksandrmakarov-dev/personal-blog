import mongoose, { Model, Schema, model } from "mongoose";

interface IAccount {
  user: mongoose.Types.ObjectId;
  provider: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: string;
  scope: string;
  revoked?: Date;
}

interface IAccountMethods {}

interface IAccountModel extends Model<IAccount, {}, IAccountMethods> {}

const AccountSchema = new Schema<IAccount, IAccountModel, IAccountMethods>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  provider: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Number, required: true },
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

const AccountModel = model<IAccount, IAccountModel>("Account", AccountSchema);

export default AccountModel;
