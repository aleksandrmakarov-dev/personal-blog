import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  passwordHash: { type: String, required: true },
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

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  },
});

type User = InferSchemaType<typeof UserSchema>;

const UserModel = model<User>("User", UserSchema);

export default UserModel;
