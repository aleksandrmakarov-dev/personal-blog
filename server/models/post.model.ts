const mongooseSlugUpdater = require("mongoose-slug-updater");
import mongoose, { Model, Schema, model } from "mongoose";

interface IPost {
  title: string;
  description: string;
  body: string;
  created: Date;
  updated: Date;
  image: string;
  slug: string;
  readingTime: number;
  parent?: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  favorites: mongoose.Types.ObjectId[];
}

// post instance methods
interface IPostMethods {
  addFavorite: (userId: string) => Promise<void>;
  removeFavorite: (userId: string) => Promise<void>;
  isFavorite: (userId: string) => boolean;
}

// post static methods
interface IPostModel extends Model<IPost, {}, IPostMethods> {
  findBySlug: (slug: string) => any;
}

const PostSchema = new Schema<IPost, IPostModel, IPostMethods>({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  body: { type: String, trim: true, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  image: { type: String },
  readingTime: { type: Number, default: 0 },
  slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
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
  children: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

// methods

PostSchema.method("addFavorite", async function (userId: string) {
  const id = new mongoose.Types.ObjectId(userId);
  if (!this.favorites.includes(id)) {
    await this.updateOne({ $push: { favorites: id } });
  }
});

PostSchema.method("removeFavorite", async function (userId: string) {
  const id = new mongoose.Types.ObjectId(userId);
  if (this.favorites.includes(id)) {
    await this.updateOne({ $pull: { favorites: id } });
  }
});

PostSchema.method("isFavorite", function (userId: string) {
  return this.favorites.includes(new mongoose.Types.ObjectId(userId));
});

// statics

PostSchema.static("findBySlug", function (slug: string) {
  return this.findOne({ slug: slug });
});

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
