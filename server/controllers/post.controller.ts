import { Request, Response } from "express";
import { CreatePostValidationSchema } from "../lib/validations/post/create-post.validation";
import PostModel from "../models/post.model";
import { Created, NoContent, Ok } from "../lib/utils/express.utils";
import { GetPostParamsValidationSchema } from "../lib/validations/post/get-post.validation";
import { UpdatePostParamsValidationSchema } from "../lib/validations/post/update-post.validation";
import { NotFoundError } from "../lib/api.errors";
import { DeletePostParamsValidationSchema } from "../lib/validations/post/delete-post.validation";

async function create(req: Request, res: Response) {
  const reqBody = CreatePostValidationSchema.parse(req.body);

  const createdPost = await PostModel.create({
    created: Date.now(),
    ...reqBody,
  });

  return Created(res, createdPost);
}

async function getBySlug(req: Request, res: Response) {
  const reqParams = GetPostParamsValidationSchema.parse(req.params);
  const foundPost = await PostModel.findOne({ slug: reqParams.identifier });

  return Ok(res, foundPost);
}

// Add pagination
async function getList(_req: Request, res: Response) {
  const searchOptions = {
    page: 1,
    limit: 15,
  };

  const foundPosts = await PostModel.find(searchOptions, { body: 0 })
    .populate("author")
    .populate("tags");
  const countPosts = await PostModel.countDocuments(searchOptions);
  const countPages = Math.ceil(countPosts / searchOptions.limit);
  const pagedResult = {
    items: foundPosts,
    page: 1,
    limit: 10,
    totalItems: countPosts,
    totalPages: countPages,
  };
  return Ok(res, pagedResult);
}

async function updateById(req: Request, res: Response) {
  const reqParams = UpdatePostParamsValidationSchema.parse(req.params);
  const reqBody = UpdatePostParamsValidationSchema.parse(req.body);

  const postToUpdate = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToUpdate) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  postToUpdate.set(reqBody);
  await postToUpdate.save();

  return Ok(res, postToUpdate);
}

async function deleteById(req: Request, res: Response) {
  const reqParams = DeletePostParamsValidationSchema.parse(req.params);
  const postToDelete = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToDelete) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  await postToDelete.deleteOne();

  return NoContent(res);
}

export default { create, getBySlug, getList, updateById, deleteById };
