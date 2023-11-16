require("express-async-errors");
import express, { Express } from "express";
import { connectToDb } from "../database/mongoose";
import morgan from "morgan";
import cors from "cors";
import postRoutes from "../routes/post.routes";
import tagRoutes from "../routes/tag.routes";
import errorHandleMiddleware from "../middleware/error-handle.middleware";
import userRoutes from "../routes/user.routes";

const app: Express = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandleMiddleware);

export default app;
