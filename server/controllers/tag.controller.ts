import { Request, Response } from "express";
import TagModel from "../models/tag.model";
import { Created, Ok } from "../lib/utils/express.utils";
import { CreateTagBodySchema } from "../lib/schemas/tag/create-tag.validation";

async function create(req: Request, res: Response) {
  const reqBody = CreateTagBodySchema.parse(req.body);

  const createdTag = await TagModel.create({
    created: Date.now(),
    ...reqBody,
  });

  return Created(res, createdTag);
}

async function getList(_req: Request, res: Response) {
  const foundTags = await TagModel.find();
  return Ok(res, foundTags);
}

export default { create, getList };
