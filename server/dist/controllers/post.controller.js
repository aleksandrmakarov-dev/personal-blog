"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post.model"));
const express_utils_1 = require("../lib/utils/express.utils");
const api_errors_1 = require("../lib/api.errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const tag_model_1 = __importDefault(require("../models/tag.model"));
const utils_1 = __importDefault(require("../lib/utils/utils"));
const post_types_1 = require("../lib/types/post.types");
const post_1 = require("../lib/schemas/post");
async function create(req, res) {
    var _a;
    const reqBody = post_1.CreatePostBodySchema.parse(req.body);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
    }
    const createdPost = await post_model_1.default.create(Object.assign({ created: Date.now(), author: user._id, readingTime: utils_1.default.readingTime(reqBody.body) }, reqBody));
    await user.addPost(createdPost._id);
    await tag_model_1.default.updateMany({ _id: { $in: createdPost.tags } }, { $push: { posts: createdPost._id } });
    return (0, express_utils_1.Created)(res, createdPost);
}
async function getBySlug(req, res) {
    var _a;
    const reqParams = post_1.GetPostParamsSchema.parse(req.params);
    const foundPost = await post_model_1.default.findOne({ slug: reqParams.identifier })
        .populate("author", {
        id: 1,
        slug: 1,
        name: 1,
        image: 1,
    })
        .populate({
        path: "tags",
        options: { sort: { name: 1 } },
    });
    if (!foundPost) {
        throw new api_errors_1.NotFoundError(`Post with slug ${reqParams.identifier} not found`);
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const mappedPost = (0, post_types_1.mapToPostDTO)(foundPost, userId);
    return (0, express_utils_1.Ok)(res, mappedPost);
}
async function getList(req, res) {
    var _a, _b;
    const { page = 1, limit, query, orderBy, tag: tagSlug, feed, } = post_1.GetPostListParamsSchema.parse(req.query);
    const isUserFeed = feed === "user";
    if (tagSlug && isUserFeed) {
        throw new Error("Only one of tag or following can be specified");
    }
    let tags = [];
    if (tagSlug) {
        const tag = await tag_model_1.default.findOne({ slug: tagSlug });
        if (!tag) {
            throw new api_errors_1.NotFoundError(`Tag with slug ${tagSlug} not found`);
        }
        tags = [tag._id];
    }
    if (isUserFeed) {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
        }
        tags = user.followingTags;
    }
    const searchOptions = Object.assign({}, query && { title: { $regex: query, $options: "i" } }, (isUserFeed || tags.length > 0) && {
        tags: {
            $in: tags,
        },
    });
    let sortOptions = { created: -1 };
    if (orderBy === "oldest") {
        sortOptions = { created: 1 };
    }
    else if (orderBy === "popular") {
        sortOptions = { likes: -1 };
    }
    let postsQuery = post_model_1.default.find(searchOptions, { body: 0 }).sort(sortOptions);
    if (limit) {
        postsQuery = postsQuery.skip((page - 1) * limit).limit(limit);
    }
    const foundPosts = await postsQuery
        .populate("author", {
        id: 1,
        slug: 1,
        name: 1,
        image: 1,
    })
        .populate({
        path: "tags",
        options: { sort: { name: 1 } },
    })
        .exec();
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const mappedPosts = foundPosts.map((post) => (0, post_types_1.mapToPostCardDTO)(post, userId));
    const itemsCount = await post_model_1.default.countDocuments(searchOptions);
    const pagesCount = Math.ceil(itemsCount / (limit || itemsCount));
    const pagedResponse = {
        items: mappedPosts,
        meta: {
            page: page,
            limit: limit || itemsCount,
            pagesCount: pagesCount,
            itemsCount: itemsCount,
        },
    };
    return (0, express_utils_1.Ok)(res, pagedResponse);
}
async function updateById(req, res) {
    const reqParams = post_1.UpdatePostParamsSchema.parse(req.params);
    const reqBody = post_1.UpdatePostBodySchema.parse(req.body);
    const postToUpdate = await post_model_1.default.findById(reqParams.identifier);
    if (!postToUpdate) {
        throw new api_errors_1.NotFoundError(`Post with id ${reqParams.identifier} not found`);
    }
    const previousTags = postToUpdate.tags;
    postToUpdate.set(Object.assign(Object.assign({}, reqBody), { updated: Date.now(), readingTime: utils_1.default.readingTime(reqBody.body) }));
    const updatedPost = await postToUpdate.save();
    await tag_model_1.default.updateMany({ _id: { $in: previousTags } }, { $pull: { posts: postToUpdate._id } });
    await tag_model_1.default.updateMany({ _id: { $in: updatedPost.tags } }, { $push: { posts: postToUpdate._id } });
    return (0, express_utils_1.Ok)(res, postToUpdate);
}
async function deleteById(req, res) {
    const reqParams = post_1.DeletePostParamsSchema.parse(req.params);
    const userId = req.user.id;
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
    }
    const postToDelete = await post_model_1.default.findById(reqParams.identifier);
    if (!postToDelete) {
        throw new api_errors_1.NotFoundError(`Post with id ${reqParams.identifier} not found`);
    }
    await postToDelete.deleteOne();
    await user.removePost(postToDelete._id);
    await tag_model_1.default.updateMany({ _id: { $in: postToDelete.tags } }, { $pull: { posts: postToDelete._id } });
    return (0, express_utils_1.NoContent)(res);
}
async function favorite(req, res) {
    const reqParams = post_1.FavoritePostParamsSchema.parse(req.params);
    const userId = req.user.id;
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
    }
    const foundPost = await post_model_1.default.findById(reqParams.identifier);
    if (!foundPost) {
        throw new api_errors_1.NotFoundError(`Post with id ${reqParams.identifier} not found`);
    }
    await foundPost.addToPostFavorites(user._id);
    await user.addFavoritePost(foundPost._id);
    return (0, express_utils_1.NoContent)(res);
}
async function unfavorite(req, res) {
    const reqParams = post_1.UnfavortiePostParamsSchema.parse(req.params);
    const userId = req.user.id;
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError(`User with id ${userId} not found`);
    }
    const foundPost = await post_model_1.default.findById(reqParams.identifier);
    if (!foundPost) {
        throw new api_errors_1.NotFoundError(`Post with id ${reqParams.identifier} not found`);
    }
    await foundPost.removeFromPostFavorites(user._id);
    await user.removeFavoritePost(foundPost._id);
    return (0, express_utils_1.NoContent)(res);
}
exports.default = {
    create,
    getBySlug,
    getList,
    updateById,
    deleteById,
    favorite,
    unfavorite,
};
//# sourceMappingURL=post.controller.js.map