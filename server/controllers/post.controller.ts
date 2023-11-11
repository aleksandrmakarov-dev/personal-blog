import { Request, Response } from "express";
import UserModel from "../models/user.model";
import PostModel from "../models/post.model";

async function createPost(req: Request, res: Response) {
  const user = await UserModel.findById(req.params.id);

  return res.status(200).json({ message: "Post created" });
}
