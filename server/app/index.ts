import express, { Express } from "express";
import { connectToDb } from "../database/mongoose";
import postModel from "../models/post.model";

const app: Express = express();

connectToDb();

app.get("/ping", (req, res) => {
  res.send("pong");
});

export default app;
