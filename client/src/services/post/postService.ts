import { GenericResponseModelDTO, PagedResponse } from "@/shared/lib/types";
import axios from "axios";
import { UserProfileDTO } from "../user/userService";
import { TagDTO } from "../tag/tagService";

export interface PostItemDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  created: Date;
  updated?: Date;
  author: string;
  isFavorite: boolean;
  tags: string[];
}

export interface PostPreviewDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  created: Date;
  updated?: Date;
  author: UserProfileDTO;
  isFavorite: boolean;
  tags: TagDTO[];
}

export interface PostDTO extends PostPreviewDTO {
  body: string;
}

type GetArticlesParams = {
  page?: number;
  limit?: number;
  paged?: boolean;
  populate?: boolean;
  orderBy?: string;
  query?: string;
};

async function getPosts<T>(params: GetArticlesParams) {
  const response = await axios.get<T>("/api/posts", { params });

  return response.data;
}

export interface CreatePostDTO {
  parent?: string;
  title: string;
  body: string;
  description: string;
  image?: string;
  tags: string[];
}

async function createPost(post: CreatePostDTO): Promise<PostDTO> {
  console.log(post);
  const response = await axios.post<PostDTO>("/api/posts", post);
  return response.data;
}

async function getPostBySlug(slug: string): Promise<PostDTO> {
  const response = await axios.get<PostDTO>(`/api/posts/slug/${slug}`);
  return response.data;
}

export interface UpdatePostDTO {
  parent?: string;
  title: string;
  body: string;
  description: string;
  image?: string;
  tags: string[];
}

async function updatePostById(
  id: string,
  post: UpdatePostDTO
): Promise<PostDTO> {
  const response = await axios.put<PostDTO>(`/api/posts/id/${id}`, post);
  return response.data;
}

async function deletePostById(id: string): Promise<GenericResponseModelDTO> {
  const response = await axios.delete(`/api/posts/id/${id}`);
  return response.data;
}

async function favoritePostById(id: string): Promise<PostDTO> {
  const response = await axios.put<PostDTO>(`/api/posts/id/${id}/favorite`);
  return response.data;
}

async function unfavoritePostById(id: string): Promise<PostDTO> {
  const response = await axios.delete<PostDTO>(
    `/api/posts/id/${id}/unfavorite`
  );
  return response.data;
}

export default {
  getPosts,
  createPost,
  getPostBySlug,
  updatePostById,
  deletePostById,
  favoritePostById,
  unfavoritePostById,
};
