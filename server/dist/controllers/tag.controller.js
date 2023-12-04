"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_model_1 = __importDefault(require("../models/tag.model"));
const express_utils_1 = require("../lib/utils/express.utils");
const create_tag_validation_1 = require("../lib/schemas/tag/create-tag.validation");
const get_tag_schema_1 = require("../lib/schemas/tag/get-tag.schema");
const tag_types_1 = require("../lib/types/tag.types");
const api_errors_1 = require("../lib/api.errors");
const user_model_1 = __importDefault(require("../models/user.model"));
async function create(req, res) {
    const reqBody = create_tag_validation_1.CreateTagBodySchema.parse(req.body);
    const createdTag = await tag_model_1.default.create(Object.assign({ created: Date.now() }, reqBody));
    return (0, express_utils_1.Created)(res, createdTag);
}
async function getList(req, res) {
    var _a;
    const { page = 1, limit, query, orderBy, } = get_tag_schema_1.GetTagListParamsSchema.parse(req.query);
    const searchOptions = query ? { name: { $regex: query, $options: "i" } } : {};
    let sortOptions = { created: -1 };
    if (orderBy === "oldest") {
        sortOptions = { created: 1 };
    }
    else if (orderBy === "popular") {
        sortOptions = { postsCount: -1 };
    }
    else if (orderBy === "name") {
        sortOptions = { name: 1 };
    }
    let tagsQuery = tag_model_1.default.aggregate([
        {
            $match: searchOptions,
        },
        {
            $addFields: {
                postsCount: {
                    $cond: {
                        if: { $isArray: "$posts" },
                        then: { $size: "$posts" },
                        else: 0,
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
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const mappedTags = foundTags.map((tag) => (0, tag_types_1.mapToTagDTO)(tag, userId));
    const itemsCount = await tag_model_1.default.countDocuments(searchOptions);
    const pagesCount = Math.ceil(itemsCount / (limit || itemsCount));
    const pagedResponse = {
        items: mappedTags,
        meta: {
            page: page,
            limit: limit || itemsCount,
            itemsCount: itemsCount,
            pagesCount: pagesCount,
        },
    };
    return (0, express_utils_1.Ok)(res, pagedResponse);
}
async function getBySlug(req, res) {
    var _a;
    const { identifier } = get_tag_schema_1.GetTagParamsSchema.parse(req.params);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const foundTag = await tag_model_1.default.findOne({ slug: identifier });
    if (!foundTag) {
        throw new api_errors_1.NotFoundError(`Tag with slug ${identifier} not found`);
    }
    const mappedTag = (0, tag_types_1.mapToTagDTO)(foundTag, userId);
    return (0, express_utils_1.Ok)(res, mappedTag);
}
async function follow(req, res) {
    const { identifier } = get_tag_schema_1.GetTagParamsSchema.parse(req.params);
    const userId = req.user.id;
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
    }
    const foundTag = await tag_model_1.default.findById(identifier);
    if (!foundTag) {
        throw new api_errors_1.NotFoundError(`Tag with id ${identifier} not found`);
    }
    await foundTag.addUserToFollowings(user._id);
    await user.addFollowingTag(foundTag._id);
    return (0, express_utils_1.NoContent)(res);
}
async function unfollow(req, res) {
    const { identifier } = get_tag_schema_1.GetTagParamsSchema.parse(req.params);
    const userId = req.user.id;
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
    }
    const foundTag = await tag_model_1.default.findById(identifier);
    if (!foundTag) {
        throw new api_errors_1.NotFoundError(`Tag with slug ${identifier} not found`);
    }
    await foundTag.removeUserFromFollowings(user._id);
    await user.removeFollowingTag(foundTag._id);
    return (0, express_utils_1.NoContent)(res);
}
exports.default = { create, getList, getBySlug, follow, unfollow };
//# sourceMappingURL=tag.controller.js.map