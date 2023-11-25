import { GenericResponseModelDTO } from "@/shared/lib/types";
import axios from "axios";
import { UserProfileDTO } from "../user/userService";
import { TagDTO } from "../tag/tagService";

export interface PostItemDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  created: Date;
  updated: Date | null;
  author: string;
  isFavorite: boolean;
  readingTime: number;
  tags: string[];
}

export interface PostDTO {
  id: string;
  slug: string;
  parent?: PostPreviewDTO;
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
  child?: PostPreviewDTO;
}

export interface PostPreviewDTO extends Omit<PostDTO, "body" | "parent"> {}

type GetArticlesParams = {
  page?: number;
  limit?: number;
  paged?: boolean;
  populate?: boolean;
  orderBy?: string;
  query?: string;
};

const baseUrl = "/api/posts";

async function getPosts<T>(params: GetArticlesParams) {
  const response = await axios.get<T>(baseUrl, { params });

  return response.data;
}

export interface CreatePostDTO {
  parent: string | null;
  title: string;
  body: string;
  description: string;
  image: string | null;
  tags: string[];
}

async function createPost(post: CreatePostDTO): Promise<PostDTO> {
  const response = await axios.post<PostDTO>(baseUrl, post);
  return response.data;
}

async function getPostBySlug(slug: string): Promise<PostDTO> {
  const response = await axios.get<PostDTO>(`${baseUrl}/slug/${slug}`);
  return response.data;
}

export interface UpdatePostDTO {
  parent: string | null;
  title: string;
  body: string;
  description: string;
  image: string | null;
  tags: string[];
}

async function updatePostById(
  id: string,
  post: UpdatePostDTO
): Promise<PostDTO> {
  const response = await axios.put<PostDTO>(`${baseUrl}/id/${id}`, post);
  return response.data;
}

async function deletePostById(id: string): Promise<GenericResponseModelDTO> {
  const response = await axios.delete(`${baseUrl}/id/${id}`);
  return response.data;
}

async function favoritePostById(id: string): Promise<PostDTO> {
  const response = await axios.put<PostDTO>(`${baseUrl}/id/${id}/favorite`);
  return response.data;
}

async function unfavoritePostById(id: string): Promise<PostDTO> {
  const response = await axios.delete<PostDTO>(
    `${baseUrl}/id/${id}/unfavorite`
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
