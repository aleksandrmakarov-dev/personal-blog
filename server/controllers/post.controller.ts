import { Request, Response } from "express";
import PostModel from "../models/post.model";
import { Created, NoContent, Ok } from "../lib/utils/express.utils";
import { NotFoundError } from "../lib/api.errors";
import UserModel from "../models/user.model";
import { CreatePostBodySchema } from "../lib/schemas/post/create-post.schema";
import { DeletePostParamsSchema } from "../lib/schemas/post/delete-post.schema";
import {
  GetPostParamsSchema,
  GetPostListParamsSchema,
} from "../lib/schemas/post/get-post.schema";
import {
  UpdatePostParamsSchema,
  UpdatePostBodySchema,
} from "../lib/schemas/post/update-post.schema";
import {
  FavoritePostParamsSchema,
  UnfavortiePostParamsSchema,
} from "../lib/schemas/post/favorite-post.schema";
import { PostPreviewDTO } from "../lib/types/post.types";
import { UserProfileDTO } from "../lib/types/user.types";
import { ITag } from "../models/tag.model";

async function create(req: Request, res: Response) {
  const reqBody = CreatePostBodySchema.parse(req.body);

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
  const reqParams = GetPostParamsSchema.parse(req.params);
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
  } = GetPostListParamsSchema.parse(req.query);

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
    .populate<{ author: UserProfileDTO }>("author", {
      id: 1,
      slug: 1,
      name: 1,
      image: 1,
    })
    .populate<{ tags: ITag[] }>("tags");

  const userId = req.user?.id;

  const mappedPosts: PostPreviewDTO[] = foundPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    image: post.image,
    created: post.created,
    updated: post.updated,
    tags: post.tags.map((tag) => ({
      id: tag.id.toString(),
      name: tag.name,
      slug: tag.slug,
    })),
    author: post.author,
    isFavorite: userId ? post.isFavorite(userId) : false,
  }));

  const countPosts = await PostModel.countDocuments(searchOptions);
  const countPages = Math.ceil(countPosts / limit);
  const pagedResult = {
    items: mappedPosts,
    page: page,
    limit: limit,
    totalItems: countPosts,
    totalPages: countPages,
  };
  return Ok(res, pagedResult);
}

async function updateById(req: Request, res: Response) {
  const reqParams = UpdatePostParamsSchema.parse(req.params);
  const reqBody = UpdatePostBodySchema.parse(req.body);

  const postToUpdate = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToUpdate) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  postToUpdate.set({ ...reqBody, updated: Date.now() });
  await postToUpdate.save();

  return Ok(res, postToUpdate);
}

async function deleteById(req: Request, res: Response) {
  const reqParams = DeletePostParamsSchema.parse(req.params);
  const postToDelete = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToDelete) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  await postToDelete.deleteOne();

  return NoContent(res);
}

async function favorite(req: Request, res: Response) {
  const reqParams = FavoritePostParamsSchema.parse(req.params);
  const userId = req.user!.id;

  const foundPost = await PostModel.findById(reqParams.identifier);

  if (!foundPost) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }

  await foundPost.addFavorite(userId);

  return NoContent(res);
}

async function unfavorite(req: Request, res: Response) {
  const reqParams = UnfavortiePostParamsSchema.parse(req.params);
  const userId = req.user!.id;

  const foundPost = await PostModel.findById(reqParams.identifier);

  if (!foundPost) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }

  await foundPost.removeFavorite(userId);

  return NoContent(res);
}

export default {
  create,
  getBySlug,
  getList,
  updateById,
  deleteById,
  favorite,
  unfavorite,
};
