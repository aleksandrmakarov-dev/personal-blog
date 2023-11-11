import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { String },
  bio: { String },
  email: { String, required: true, unique: true },
  image: { String },
  passwordHash: { String, required: true },
  emailVerified: { Boolean, default: false },
  created: { Date, default: Date.now() },
  updated: { Date },
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

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  },
});

UserSchema.methods.likePost = async function (post: Schema.Types.ObjectId) {};

type User = InferSchemaType<typeof UserSchema> & {
  likePost: (post: Schema.Types.ObjectId) => Promise<void>;
};

const UserModel = model<User>("User", UserSchema);

export default UserModel;
