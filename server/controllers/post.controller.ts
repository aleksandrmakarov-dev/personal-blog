import { Request, Response } from "express";
import { CreatePostValidationSchema } from "../lib/validations/post/create-post.validation";
import PostModel from "../models/post.model";
import { Created, NoContent, Ok } from "../lib/utils/express.utils";
import {
  GetPostListParamsValidationSchema,
  GetPostParamsValidationSchema,
} from "../lib/validations/post/get-post.validation";
import {
  UpdatePostParamsValidationSchema,
  UpdatePostValidationSchema,
} from "../lib/validations/post/update-post.validation";
import { NotFoundError } from "../lib/api.errors";
import { DeletePostParamsValidationSchema } from "../lib/validations/post/delete-post.validation";
import UserModel from "../models/user.model";

async function create(req: Request, res: Response) {
  const reqBody = CreatePostValidationSchema.parse(req.body);

  const userId = req.user?.id;

  // any first user
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  const createdPost = await PostModel.create({
    created: Date.now(),
    author: user._id,
    ...reqBody,
  });

  return Created(res, createdPost);
}

async function getBySlug(req: Request, res: Response) {
  const reqParams = GetPostParamsValidationSchema.parse(req.params);
  const foundPost = await PostModel.findBySlug(reqParams.identifier)
    .populate("author", { id: 1, slug: 1, name: 1, image: 1 })
    .populate("tags");

  return Ok(res, foundPost);
}

// Add pagination
async function getList(req: Request, res: Response) {
  const {
    page = 1,
    limit = 10,
    query,
    orderBy,
  } = GetPostListParamsValidationSchema.parse(req.query);

  const searchOptions = query
    ? { title: { $regex: query, $options: "i" } }
    : {};

  let sortOptions: any = { created: -1 };

  if (orderBy === "oldest") {
    sortOptions = { created: 1 };
  } else if (orderBy === "popular") {
    sortOptions = { likes: -1 };
  }

  const foundPosts = await PostModel.find(searchOptions, { body: 0 })
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", { id: 1, slug: 1, name: 1, image: 1 })
    .populate("tags");

  const countPosts = await PostModel.countDocuments(searchOptions);
  const countPages = Math.ceil(countPosts / limit);
  const pagedResult = {
    items: foundPosts,
    page: page,
    limit: limit,
    totalItems: countPosts,
    totalPages: countPages,
  };
  return Ok(res, pagedResult);
}

async function updateById(req: Request, res: Response) {
  const reqParams = UpdatePostParamsValidationSchema.parse(req.params);
  const reqBody = UpdatePostValidationSchema.parse(req.body);

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
