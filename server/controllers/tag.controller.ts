import { Request, Response } from "express";
import TagModel from "../models/tag.model";
import { Created, Ok } from "../lib/utils/express.utils";
import { CreateTagBodySchema } from "../lib/schemas/tag/create-tag.validation";
import {
  GetTagListParamsSchema,
  GetTagParamsSchema,
} from "../lib/schemas/tag/get-tag.schema";
import { PagedResponse } from "../lib/types";
import { TagDTO, mapToTagDTO } from "../lib/types/tag.types";
import { NotFoundError } from "../lib/api.errors";

async function create(req: Request, res: Response) {
  const reqBody = CreateTagBodySchema.parse(req.body);

  const createdTag = await TagModel.create({
    created: Date.now(),
    ...reqBody,
  });

  return Created(res, createdTag);
}

async function getList(req: Request, res: Response) {
  const {
    page = 1,
    limit,
    query,
    orderBy,
  } = GetTagListParamsSchema.parse(req.query);

  const searchOptions = query ? { name: { $regex: query, $options: "i" } } : {};

  let sortOptions: any = { created: -1 };

  if (orderBy === "oldest") {
    sortOptions = { created: 1 };
  } else if (orderBy === "popular") {
    sortOptions = { postsCount: -1 };
  } else if (orderBy === "name") {
    sortOptions = { name: 1 };
  }

  // aggregate is used to add number of posts to each tag, so I can sort by it

  let tagsQuery = TagModel.aggregate([
    {
      $match: searchOptions,
    },
    {
      $addFields: {
        postsCount: {
          $cond: {
            if: { $isArray: "$posts" },
            then: { $size: "$posts" },
            else: 0, // or any other default value you prefer
          },
        },
      },
    },
    {
      $sort: sortOptions,
    },
  ]);

  if (limit) {
    tagsQuery = tagsQuery.skip((page - 1) * limit).limit(limit);
  }

  const foundTags = await tagsQuery.exec();

  //const userId = req.user?.id;

  const mappedTags: TagDTO[] = foundTags.map(mapToTagDTO);

  const itemsCount = await TagModel.countDocuments(searchOptions);
  const pagesCount = Math.ceil(itemsCount / (limit || itemsCount));

  const pagedResponse: PagedResponse<TagDTO> = {
    items: mappedTags,
    meta: {
      page: page,
      limit: limit || itemsCount,
      itemsCount: itemsCount,
      pagesCount: pagesCount,
    },
  };

  return Ok(res, pagedResponse);
}

async function getBySlug(req: Request, res: Response) {
  const { identifier } = GetTagParamsSchema.parse(req.params);

  const foundTag = await TagModel.findOne({ slug: identifier });

  if (!foundTag) {
    throw new NotFoundError(`Tag with slug ${identifier} not found`);
  }

  const mappedTag: TagDTO = mapToTagDTO(foundTag);

  return Ok(res, mappedTag);
}

export default { create, getList, getBySlug };
