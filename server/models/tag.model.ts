import { InferSchemaType, Schema, model } from "mongoose";

const TagSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, slug: "name", slugPaddingSize: 4, unique: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
});

TagSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

type Tag = InferSchemaType<typeof TagSchema>;

const TagModel = model<Tag>("Tag", TagSchema);

export default TagModel;
