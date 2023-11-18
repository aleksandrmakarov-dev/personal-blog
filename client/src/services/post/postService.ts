import { PagedResponse } from "@/shared/lib/types";
import axios from "axios";
import { UserProfileDTO } from "../user/userService";
import { TagDTO } from "../tag/tagService";

export interface PostPreviewDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  created: Date;
  updated?: Date;
  author: UserProfileDTO;
  likes: number;
  isLiked: boolean;
  tags: TagDTO[];
}

export interface PostDTO extends PostPreviewDTO {
  body: string;
}

type GetArticlesParams = {
  page: number;
  limit: number;
};

async function getPosts(params: GetArticlesParams) {
  const response = await axios.get<PagedResponse<PostPreviewDTO>>(
    "/api/posts",
    { params }
  );

  return response.data;
}

export interface CreatePostDTO {
  title: string;
  body: string;
  description: string;
  image?: string;
  tags: string[];
}

async function createPost(post: CreatePostDTO): Promise<PostDTO> {
  const response = await axios.post<PostDTO>("/api/posts", post);
  return response.data;
}

async function getPostBySlug(slug: string): Promise<PostDTO> {
  const response = await axios.get<PostDTO>(`/api/posts/slug/${slug}`);
  return response.data;
}

export default {
  getPosts,
  createPost,
  getPostBySlug,
};
