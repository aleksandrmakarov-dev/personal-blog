import { GenericResponseModelDTO, PagedResponse } from "@/shared/lib/types";
import axios from "axios";
import { UserProfileDTO } from "../user/userService";
import { TagDTO } from "../tag/tagService";

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

type GetPostsParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  query?: string;
};

const baseUrl = "/api/posts";

async function getPosts(
  params: GetPostsParams
): Promise<PagedResponse<PostCardDTO>> {
  const response = await axios.get<PagedResponse<PostCardDTO>>(baseUrl, {
    params,
  });

  return response.data;
}

export interface CreatePostDTO {
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

async function favoritePostById(id: string): Promise<null> {
  const response = await axios.put<null>(`${baseUrl}/favorite/id/${id}`);
  return response.data;
}

async function unfavoritePostById(id: string): Promise<null> {
  const response = await axios.delete<null>(`${baseUrl}/favorite/id/${id}`);
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
