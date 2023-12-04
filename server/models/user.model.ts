import mongoose, { Model, Document, Schema, Types, model } from "mongoose";
const mongooseSlugUpdater = require("mongoose-slug-updater");

// user schema
export interface IUser {
  id: string;
  name: string;
  bio?: string;
  email: string;
  image?: string;
  passwordHash?: string;
  emailVerified?: boolean;
  created: Date;
  updated?: Date;
  slug: string;
  role: string;
  posts: mongoose.Types.ObjectId[];
  favoritePosts: mongoose.Types.ObjectId[];
  followingTags: mongoose.Types.ObjectId[];
  accounts: mongoose.Types.ObjectId[];
}

interface IUserAccount {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

// user instance methods
interface IUserMethods {
  toUserAccount: () => IUserAccount;
  addFavoritePost: (postId: mongoose.Types.ObjectId) => Promise<void>;
  removeFavoritePost: (postId: mongoose.Types.ObjectId) => Promise<void>;
  addFollowingTag: (tagId: mongoose.Types.ObjectId) => Promise<void>;
  removeFollowingTag: (tagId: mongoose.Types.ObjectId) => Promise<void>;
  addPost: (postId: mongoose.Types.ObjectId) => Promise<void>;
  removePost: (postId: mongoose.Types.ObjectId) => Promise<void>;
}

// user static methods
interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByEmail: (email: string) => Promise<
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
  role: { type: String, enum: ["user", "admin"], default: "user" },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  favoritePosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followingTags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
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
    role: this.role,
  };

  return userAccout;
});

UserSchema.method(
  "addFavoritePost",
  async function (postId: mongoose.Types.ObjectId) {
    if (!this.favoritePosts?.includes(postId)) {
      await this.updateOne({ $push: { favoritePosts: postId } });
    }
  }
);

UserSchema.method(
  "removeFavoritePost",
  async function (postId: mongoose.Types.ObjectId) {
    if (this.favoritePosts?.includes(postId)) {
      await this.updateOne({ $pull: { favoritePosts: postId } });
    }
  }
);

UserSchema.method(
  "addFollowingTag",
  async function (tagId: mongoose.Types.ObjectId) {
    if (!this.followingTags?.includes(tagId)) {
      await this.updateOne({ $push: { followingTags: tagId } });
    }
  }
);

UserSchema.method(
  "removeFollowingTag",
  async function (tagId: mongoose.Types.ObjectId) {
    if (this.followingTags?.includes(tagId)) {
      await this.updateOne({ $pull: { followingTags: tagId } });
    }
  }
);

UserSchema.method("addPost", async function (postId: mongoose.Types.ObjectId) {
  if (!this.posts?.includes(postId)) {
    await this.updateOne({ $push: { posts: postId } });
  }
});

UserSchema.method(
  "removePost",
  async function (postId: mongoose.Types.ObjectId) {
    if (this.posts?.includes(postId)) {
      await this.updateOne({ $pull: { posts: postId } });
    }
  }
);

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
