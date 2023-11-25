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
import { ITag } from "../models/tag.model";
import utils from "../lib/utils/utils";

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

  if (reqBody.parent) {
    const parentPost = await PostModel.findById(reqBody.parent);
    if (!parentPost) {
      throw new NotFoundError(
        `Parent post with id ${reqBody.parent} not found`
      );
    }
    await parentPost?.setChild(createdPost._id.toString());
  }

  return Created(res, createdPost);
}

async function getBySlug(req: Request, res: Response) {
  const reqParams = GetPostParamsSchema.parse(req.params);
  const foundPost = await PostModel.findBySlug(reqParams.identifier)
    .populate("author", { id: 1, slug: 1, name: 1, image: 1 })
    .populate("tags")
    .populate("parent", {
      id: 1,
      slug: 1,
      title: 1,
    })
    .populate("child", {
      id: 1,
      slug: 1,
      title: 1,
    });

  if (!foundPost) {
    throw new NotFoundError(`Post with slug ${reqParams.identifier} not found`);
  }

  return Ok(res, foundPost);
}

// Add pagination
async function getList(req: Request, res: Response) {
  const {
    page = 1,
    limit = 10,
    query,
    orderBy,
    paged: pagedStr,
    populate: populateStr,
  } = GetPostListParamsSchema.parse(req.query);

  const paged = pagedStr === "true";
  const populate = populateStr === "true";

  const searchOptions = query
    ? { title: { $regex: query, $options: "i" } }
    : {};

  let sortOptions: any = { created: -1 };

  if (orderBy === "oldest") {
    sortOptions = { created: 1 };
  } else if (orderBy === "popular") {
    sortOptions = { likes: -1 };
  }

  let postQuery = PostModel.find(searchOptions, { body: 0 }).sort(sortOptions);

  if (paged) {
    postQuery = postQuery.skip((page - 1) * limit).limit(limit);
  }

  let foundPosts = [];

  if (populate) {
    foundPosts = await postQuery
      .populate<{ author: UserProfileDTO }>("author", {
        id: 1,
        slug: 1,
        name: 1,
        image: 1,
      })
      .populate<{ tags: ITag[] }>("tags")
      .exec();

    const userId = req.user?.id;

    foundPosts = foundPosts.map((post) => ({
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
  } else {
    foundPosts = await postQuery.exec();
  }

  let result = {};

  if (paged) {
    const countPosts = await PostModel.countDocuments(searchOptions);
    const countPages = Math.ceil(countPosts / limit);
    result = {
      items: foundPosts,
      page: page,
      limit: limit,
      totalItems: countPosts,
      totalPages: countPages,
    };
  } else {
    result = foundPosts;
  }

  return Ok(res, result);
}

async function updateById(req: Request, res: Response) {
  const reqParams = UpdatePostParamsSchema.parse(req.params);
  const reqBody = UpdatePostBodySchema.parse(req.body);

  const postToUpdate = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToUpdate) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  postToUpdate.set({
    ...reqBody,
    updated: Date.now(),
    readingTime: utils.readingTime(reqBody.body),
  });
  await postToUpdate.save();

  if (reqBody.parent) {
    const parentPost = await PostModel.findById(reqBody.parent);
    await parentPost?.setChild(postToUpdate._id.toString());
  }

  if (postToUpdate.child && !reqBody.parent) {
    const parentPost = await PostModel.findById(reqBody.parent);
    await parentPost?.clearChild();
  }

  return Ok(res, postToUpdate);
}

async function deleteById(req: Request, res: Response) {
  const reqParams = DeletePostParamsSchema.parse(req.params);
  const postToDelete = await PostModel.findOne({ _id: reqParams.identifier });
  if (!postToDelete) {
    throw new NotFoundError(`Post with id ${reqParams.identifier} not found`);
  }
  await postToDelete.deleteOne();

  const parentPost = await PostModel.findById(postToDelete.parent);
  const childPost = await PostModel.findById(postToDelete.child);

  if (parentPost && childPost) {
    await childPost?.setParent(parentPost._id.toString());
    await parentPost?.setChild(childPost._id.toString());
  } else if (parentPost) {
    await parentPost?.clearChild();
  } else if (childPost) {
    await childPost?.clearParent();
  }

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
