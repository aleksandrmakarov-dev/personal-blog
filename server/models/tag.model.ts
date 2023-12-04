import mongoose, { Model, Schema, model } from "mongoose";
const mongooseSlugUpdater = require("mongoose-slug-updater");

export interface ITag {
  id: string;
  name: string;
  slug: string;
  created: Date;
  updated: Date;
  posts: mongoose.Types.ObjectId[];
  followings: mongoose.Types.ObjectId[];
}

// tag instance methods
export interface ITagMethods {
  addUserToFollowings: (userId: mongoose.Types.ObjectId) => Promise<void>;
  removeUserFromFollowings: (userId: mongoose.Types.ObjectId) => Promise<void>;
  isFollowing(userId: string): boolean;
}

// tag static methods
interface ITagModel extends Model<ITag, {}, ITagMethods> {}

const TagSchema = new Schema<ITag, ITagModel, ITagMethods>({
  name: { type: String, required: true },
  slug: { type: String, slug: "name", slugPaddingSize: 4, unique: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followings: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

TagSchema.method(
  "addUserToFollowings",
  async function (userId: mongoose.Types.ObjectId) {
    if (!this.followings.includes(userId)) {
      await this.updateOne({ $push: { followings: userId } });
    }
  }
);

TagSchema.method(
  "removeUserFromFollowings",
  async function (userId: mongoose.Types.ObjectId) {
    if (this.followings.includes(userId)) {
      await this.updateOne({ $pull: { followings: userId } });
    }
  }
);

TagSchema.method("isFollowing", function (userId: string): boolean {
  return this.followings.includes(new mongoose.Types.ObjectId(userId));
});

TagSchema.plugin(mongooseSlugUpdater);

TagSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const TagModel = model<ITag, ITagModel>("Tag", TagSchema);

export default TagModel;
