import { InferSchemaType, Schema, model } from "mongoose";

const PostSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  title: { String, required: true },
  description: { String, required: true },
  body: { String, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  image: { type: String },
  slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

PostSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

type Post = InferSchemaType<typeof PostSchema>;

const PostModel = model<Post>("Post", PostSchema);

export default PostModel;
