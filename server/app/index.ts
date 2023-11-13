require("express-async-errors");
import express, { Express } from "express";
import { connectToDb } from "../database/mongoose";
import morgan from "morgan";
import cors from "cors";
import postRoutes from "../routes/post.routes";
import errorHandleMiddleware from "../middleware/error-handle.middleware";

const app: Express = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/posts", postRoutes);

app.use(errorHandleMiddleware);

export default app;
