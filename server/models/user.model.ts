import mongoose, { Document, Model, Schema, Types, model } from "mongoose";
const mongooseSlugUpdater = require("mongoose-slug-updater");

// user schema
interface IUser {
  name: string;
  bio?: string;
  email: string;
  image?: string;
  passwordHash?: string;
  emailVerified?: boolean;
  created: Date;
  updated?: Date;
  slug: string;
  roles: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
  likedPosts: mongoose.Types.ObjectId[];
  accounts: mongoose.Types.ObjectId[];
}

interface IUserAccount {
  id: string;
  name: string;
  email: string;
  image?: string;
  roles: mongoose.Types.ObjectId[];
}

// user instance methods
interface IUserMethods {
  toUserAccount: () => IUserAccount;
}

// user static methods
interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByEmail(email: string): Promise<
    | (Document<unknown, {}, IUser> &
        Omit<
          IUser & {
            _id: Types.ObjectId;
          },
          never
        > &
        IUserMethods)
    | null
  >;
}

const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
  name: { type: String },
  bio: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  passwordHash: { type: String },
  emailVerified: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  slug: { type: String, slug: "email", slugPaddingSize: 4, unique: true },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});

// methods

UserSchema.method("toUserAccount", function () {
  const userAccout: IUserAccount = {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    image: this.image,
    roles: this.roles,
  };

  return userAccout;
});

// statics
UserSchema.static("findByEmail", async function (email: string) {
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

const UserModel = model<IUser, IUserModel>("User", UserSchema);

export default UserModel;
