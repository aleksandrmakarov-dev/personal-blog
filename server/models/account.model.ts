import mongoose, { Document, Model, Schema, Types, model } from "mongoose";

interface IAccount {
  user: mongoose.Types.ObjectId;
  provider: string;
  refreshToken: string;
  expires: Date;
  created: Date;
  createdByIp: string;
  replacedBy: mongoose.Types.ObjectId;
  revokedByIp?: string;
  revoked?: Date;
}

// account instance methods
interface IAccountMethods {}

// account static methods
interface IAccountModel extends Model<IAccount, {}, IAccountMethods> {
  findByRefreshToken: (refreshToken: string) => Promise<
    | (Document<unknown, {}, IAccount> &
        Omit<
          IAccount & {
            _id: Types.ObjectId;
          },
          never
        > &
        IAccountMethods)
    | null
  >;
}

const AccountSchema = new Schema<IAccount, IAccountModel, IAccountMethods>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  provider: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expires: { type: Date },
  created: { type: Date, default: Date.now },
  createdByIp: { type: String },
  replacedBy: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  revokedByIp: { type: String },
  revoked: { type: Date },
});

// methods

AccountSchema.static(
  "findByRefreshToken",
  async function (refreshToken: string) {
    return await this.findOne({ refreshToken: refreshToken });
  }
);

AccountSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const AccountModel = model<IAccount, IAccountModel>("Account", AccountSchema);

export default AccountModel;
