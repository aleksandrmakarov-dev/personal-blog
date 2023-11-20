import { Model, Schema, model } from "mongoose";
const mongooseSlugUpdater = require("mongoose-slug-updater");

export interface ITag {
  id: string;
  name: string;
  slug: string;
  created: Date;
  updated: Date;
}

// user instance methods
interface ITagMethods {}

// user static methods
interface ITagModel extends Model<ITag, {}, ITagMethods> {}

const TagSchema = new Schema<ITag, ITagModel, ITagMethods>({
  name: { type: String, required: true },
  slug: { type: String, slug: "name", slugPaddingSize: 4, unique: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
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
