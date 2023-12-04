"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostDTO = exports.mapToPostCardDTO = void 0;
const tag_types_1 = require("./tag.types");
const mapToPostCardDTO = (post, userId) => {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description,
        image: post.image,
        created: post.created,
        author: post.author,
        readingTime: post.readingTime,
        updated: post.updated,
        tags: post.tags.map((tag) => (0, tag_types_1.mapToTagDTO)(tag)),
        isFavorite: userId ? post.isFavorite(userId) : false,
    };
};
exports.mapToPostCardDTO = mapToPostCardDTO;
const mapToPostDTO = (post, userId) => {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description,
        body: post.body,
        image: post.image,
        created: post.created,
        author: {
            id: post.author.id,
            slug: post.author.slug,
            name: post.author.name,
            image: post.author.image,
        },
        readingTime: post.readingTime,
        updated: post.updated,
        tags: post.tags.map((tag) => (0, tag_types_1.mapToTagDTO)(tag)),
        isFavorite: userId ? post.isFavorite(userId) : false,
    };
};
exports.mapToPostDTO = mapToPostDTO;
//# sourceMappingURL=post.types.js.map