const mongooseSlugUpdater = require("mongoose-slug-updater");
import mongoose, { Model, Schema, model } from "mongoose";

export interface IPost {
  id: string;
  title: string;
  description: string;
  body: string;
  created: Date;
  updated: Date;
  image: string;
  slug: string;
  readingTime: number;
  author: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  favorites: mongoose.Types.ObjectId[];
}

// post instance methods
export interface IPostMethods {
  addToPostFavorites: (userId: mongoose.Types.ObjectId) => Promise<void>;
  removeFromPostFavorites: (userId: mongoose.Types.ObjectId) => Promise<void>;
  isFavorite: (userId: string) => boolean;
}

// post static methods
interface IPostModel extends Model<IPost, {}, IPostMethods> {}

const PostSchema = new Schema<IPost, IPostModel, IPostMethods>({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  body: { type: String, trim: true, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  image: { type: String },
  readingTime: { type: Number, default: 0 },
  slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.method(
  "addToPostFavorites",
  async function (userId: mongoose.Types.ObjectId) {
    if (!this.favorites?.includes(userId)) {
      await this.updateOne({ $push: { favorites: userId } });
    }
  }
);

PostSchema.method(
  "removeFromPostFavorites",
  async function (userId: mongoose.Types.ObjectId) {
    if (this.favorites?.includes(userId)) {
      await this.updateOne({ $pull: { favorites: userId } });
    }
  }
);

PostSchema.method("isFavorite", function (userId: string) {
  return this.favorites?.includes(new mongoose.Types.ObjectId(userId));
});

// statics

PostSchema.plugin(mongooseSlugUpdater);

PostSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PostModel = model<IPost, IPostModel>("Post", PostSchema);

export default PostModel;
