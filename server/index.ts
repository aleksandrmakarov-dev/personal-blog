import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3001;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Located at: http://localhost:${port}`);
  });
});

module.exports = app;
