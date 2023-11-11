import mongoose from "mongoose";

export async function connectToDb() {
  mongoose.set("strictQuery", true);
  // Move this to .env file
  await mongoose.connect(
    "mongodb+srv://ac5295:mRSdyJkd1K7dqKpP@cluster0.jql0diz.mongodb.net/personalWebsiteDevelopment?retryWrites=true&w=majority"
  );
}
