import { IPost } from "../../models/post.model";
import { TagDTO, mapToTagDTO } from "./tag.types";
import { UserProfileDTO } from "./user.types";

export interface PostDTO {
  id: string;
  slug: string;
  title: string;
  body: string;
  description: string;
  image: string | null;
  created: Date;
  updated: Date | null;
  author: UserProfileDTO;
  isFavorite: boolean;
  readingTime: number;
  tags: TagDTO[];
}

export interface PostCardDTO extends Omit<PostDTO, "body"> {}

export const mapToPostCardDTO = (post: any, userId?: string): PostCardDTO => {
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
    tags: post.tags.map((tag: any) => mapToTagDTO(tag)),
    isFavorite: userId ? post.isFavorite(userId) : false,
  };
};

export const mapToPostDTO = (post: any, userId?: string): PostDTO => {
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
    tags: post.tags.map((tag: any) => mapToTagDTO(tag)),
    isFavorite: userId ? post.isFavorite(userId) : false,
  };
};
