import { Request, Response } from "express";
import PostModel from "../models/post.model";
import { Created, NoContent, Ok } from "../lib/utils/express.utils";
import { NotFoundError } from "../lib/api.errors";
import UserModel from "../models/user.model";
import { UserProfileDTO } from "../lib/types/user.types";
import TagModel from "../models/tag.model";
import utils from "../lib/utils/utils";
import {
  PostCardDTO,
  PostDTO,
  mapToPostCardDTO,
  mapToPostDTO,
} from "../lib/types/post.types";
import { PagedResponse } from "../lib/types";
import mongoose from "mongoose";
import {
  CreatePostBodySchema,
  DeletePostParamsSchema,
  FavoritePostParamsSchema,
  GetPostListParamsSchema,
  GetPostParamsSchema,
  UnfavortiePostParamsSchema,
  UpdatePostBodySchema,
  UpdatePostParamsSchema,
} from "../lib/schemas/post";

/**
 * Creates a new post.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The created post.
 * @throws {NotFoundError} if the user is not found.
 */
async function create(req: Request, res: Response) {
  const reqBody = CreatePostBodySchema.parse(req.body);

  const userId = req.user?.id;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  const createdPost = await PostModel.create({
    created: Date.now(),
    author: user._id,
    readingTime: utils.readingTime(reqBody.body),
    ...reqBody,
  });

  await user.addPost(createdPost._id);

  await TagModel.updateMany(
    { _id: { $in: createdPost.tags } },
    { $push: { posts: createdPost._id } }
  );

  return Created(res, createdPost);
}

async function getBySlug(req: Request, res: Response) {
  const reqParams = GetPostParamsSchema.parse(req.params);
  const foundPost = await PostModel.findOne({ slug: reqParams.identifier })
    .populate<{ author: UserProfileDTO }>("author", {
      id: 1,
      slug: 1,
      name: 1,
      image: 1,
    })
    .populate<{ tags: any[] }>({
      path: "tags",
      options: { sort: { name: 1 } },
    });

  if (!foundPost) {
    throw new NotFoundError(`Post with slug ${reqParams.identifier} not found`);
  }

  const userId = req.user?.id;
  const mappedPost: PostDTO = mapToPostDTO(foundPost, userId);

  return Ok(res, mappedPost);
}

/**
 * Retrieves a list of posts based on the provided query parameters.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response containing the list of posts and pagination information.
 * @throws {Error} If both tag and following are specified.
 * @throws {NotFoundError} If the specified tag or user is not found.
 */
async function getList(req: Request, res: Response) {
  const {
    page = 1,
    limit,
    query,
    orderBy,
    tag: tagSlug,
    feed,
  } = GetPostListParamsSchema.parse(req.query);

  const isUserFeed = feed === "user";

  if (tagSlug && isUserFeed) {
    throw new Error("Only one of tag or following can be specified");
  }

  let tags: mongoose.Types.ObjectId[] = [];

  if (tagSlug) {
    const tag = await TagModel.findOne({ slug: tagSlug });
    if (!tag) {
      throw new NotFoundError(`Tag with slug ${tagSlug} not found`);
    }

    tags = [tag._id];
  }

  if (isUserFeed) {
    const userId = req.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    tags = user.followingTags;
  }

  const searchOptions = Object.assign(
    {},
    query && { title: { $regex: query, $options: "i" } },
    (isUserFeed || tags.length > 0) && {
      tags: {
        $in: tags,
      },
    }
  );

  let sortOptions: any = { created: -1 };

  if (orderBy === "oldest") {
    sortOptions = { created: 1 };
  } else if (orderBy === "popular") {
    sortOptions = { likes: -1 };
  }

  let postsQuery = PostModel.find(searchOptions, { body: 0 }).sort(sortOptions);

  if (limit) {
    postsQuery = postsQuery.skip((page - 1) * limit).limit(limit);
  }

  const foundPosts = await postsQuery
    .populate<{ author: UserProfileDTO }>("author", {
      id: 1,
      slug: 1,
      name: 1,
      image: 1,
    })
    .populate<{ tags: any[] }>({
      path: "tags",
      options: { sort: { name: 1 } },
    })
    .exec();

  const userId = req.user?.id;

  const mappedPosts: PostCardDTO[] = foundPosts.map((post) =>
    mapToPostCardDTO(post, userId)
  );

  const itemsCount = await PostModel.countDocuments(searchOptions);
  const pagesCount = Math.ceil(itemsCount / (limit || itemsCount));

  const pagedResponse: PagedResponse<PostCardDTO> = {
    items: mappedPosts,
    meta: {
      page: page,
      limit: limit || itemsCount,
      pagesCount: pagesCount,
      itemsCount: itemsCount,
    },
  };

  return Ok(res, pagedResponse);
}

/**
 * Updates a post by its identifier.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The updated post.
 * @throws {NotFoundError} if the post with the given identifier is not found.
 */
async function updateById(req: Request, res: Response) {
  const reqParams = UpdatePostParamsSchema.parse(req.params);
  const reqBody = UpdatePostBodySchema.parse(req.body);

  const postToUpdate = await PostModel.findById(reqParams.identifier);

  if (!postToUpdate) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }

  const previousTags = postToUpdate.tags;

  postToUpdate.set({
    ...reqBody,
    updated: Date.now(),
    readingTime: utils.readingTime(reqBody.body),
  });

  const updatedPost = await postToUpdate.save();

  await TagModel.updateMany(
    { _id: { $in: previousTags } },
    { $pull: { posts: postToUpdate._id } }
  );

  await TagModel.updateMany(
    { _id: { $in: updatedPost.tags } },
    { $push: { posts: postToUpdate._id } }
  );

  return Ok(res, postToUpdate);
}

/**
 * Deletes a post by its identifier.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response with no content.
 * @throws {NotFoundError} if the user or post is not found.
 */
async function deleteById(req: Request, res: Response) {
  const reqParams = DeletePostParamsSchema.parse(req.params);

  const userId = req.user!.id;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  const postToDelete = await PostModel.findById(reqParams.identifier);

  if (!postToDelete) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }

  await postToDelete.deleteOne();

  await user.removePost(postToDelete._id);

  await TagModel.updateMany(
    { _id: { $in: postToDelete.tags } },
    { $pull: { posts: postToDelete._id } }
  );

  return NoContent(res);
}

/**
 * Handles the request to favorite a post.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the success of the operation.
 * @throws {NotFoundError} if the user or post is not found.
 */
async function favorite(req: Request, res: Response) {
  const reqParams = FavoritePostParamsSchema.parse(req.params);
  const userId = req.user!.id;

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  const foundPost = await PostModel.findById(reqParams.identifier);

  if (!foundPost) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }

  await foundPost.addToPostFavorites(user._id);
  await user.addFavoritePost(foundPost._id);

  return NoContent(res);
}

/**
 * Unfavorites a post.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with no content.
 * @throws {NotFoundError} if the user or post is not found.
 */
async function unfavorite(req: Request, res: Response) {
  const reqParams = UnfavortiePostParamsSchema.parse(req.params);
  const userId = req.user!.id;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  const foundPost = await PostModel.findById(reqParams.identifier);

  if (!foundPost) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }

  await foundPost.removeFromPostFavorites(user._id);
  await user.removeFavoritePost(foundPost._id);

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
