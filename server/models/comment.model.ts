import { InferSchemaType, Schema, model } from "mongoose";

const CommentSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

CommentSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

type Comment = InferSchemaType<typeof CommentSchema>;

const CommentModel = model<Comment>("Comment", CommentSchema);

export default CommentModel;
