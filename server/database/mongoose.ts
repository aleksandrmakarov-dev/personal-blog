import mongoose from "mongoose";
import appConfig from "../config/app.config";

export async function connectToDb() {
  mongoose.set("strictQuery", true);
  // Move this to .env file
  await mongoose.connect(appConfig.database.uri);
}
