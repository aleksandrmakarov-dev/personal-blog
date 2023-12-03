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
    readingTime: utils.readingTime(reqBody.body),
    ...reqBody,
  });

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

async function getList(req: Request, res: Response) {
  const {
    page = 1,
    limit,
    query,
    orderBy,
    tag: tagSlug,
  } = GetPostListParamsSchema.parse(req.query);

  let tag = undefined;
  if (tagSlug) {
    tag = await TagModel.findOne({ slug: tagSlug });
    if (!tag) {
      throw new NotFoundError(`Tag with slug ${tagSlug} not found`);
    }
  }

  const searchOptions = Object.assign(
    {},
    query && { title: { $regex: query, $options: "i" } },
    tag && {
      tags: {
        $in: [tag._id],
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

async function updateById(req: Request, res: Response) {
  const reqParams = UpdatePostParamsSchema.parse(req.params);
  const reqBody = UpdatePostBodySchema.parse(req.body);

  const postToUpdate = await PostModel.findOne({ _id: reqParams.identifier });

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

async function deleteById(req: Request, res: Response) {
  const reqParams = DeletePostParamsSchema.parse(req.params);
  const postToDelete = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToDelete) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  await postToDelete.deleteOne();

  await TagModel.updateMany(
    { _id: { $in: postToDelete.tags } },
    { $pull: { posts: postToDelete._id } }
  );

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
