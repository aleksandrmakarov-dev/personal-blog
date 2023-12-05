require("express-async-errors");
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import express, { Express } from "express";
import { connectToDb } from "../database/mongoose";
import postRoutes from "../routes/post.routes";
import tagRoutes from "../routes/tag.routes";
import errorHandleMiddleware from "../middleware/error-handle.middleware";
import userRoutes from "../routes/user.routes";
import fileRoutes from "../routes/file.routes";
import { cloudinaryConfigure } from "../config/app.config";
import dotenv from "dotenv";

dotenv.config();

cloudinaryConfigure();

const app: Express = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: true,
  })
);
app.use(cookieParser());

app.use("/api/posts", postRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/", (_req, res) => res.send("Server is working!"));

// app.use(express.static(path.join(__dirname, "../../client/dist")));
// app.get("*", (_req, res) =>
//   res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
// );

app.use(errorHandleMiddleware);

export default app;
