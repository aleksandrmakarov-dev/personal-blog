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
  parent?: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
}

// post instance methods
interface IPostMethods {}

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
  likes: [
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
