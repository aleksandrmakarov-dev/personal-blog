import { PagedResponse } from "@/shared/lib/types";
import axios from "axios";

export interface TagDTO {
  id: string;
  name: string;
  slug: string;
  postsCount: number;
  followersCount: number;
  isFollowing: boolean;
}

interface GetTagsParams {
  page: number;
  limit?: number;
  orderBy?: string;
  query?: string;
}

const baseUrl = "/api/tags";

async function getTags(params: GetTagsParams): Promise<PagedResponse<TagDTO>> {
  const response = await axios.get<PagedResponse<TagDTO>>(baseUrl, {
    params,
  });

  return response.data;
}

export interface CreateTagDTO {
  name: string;
}

async function createTag(tag: CreateTagDTO): Promise<TagDTO> {
  const response = await axios.post<TagDTO>(baseUrl, tag);
  return response.data;
}

async function getTagBySlug(slug: string): Promise<TagDTO> {
  const response = await axios.get<TagDTO>(`${baseUrl}/slug/${slug}`);
  return response.data;
}

async function followById(id: string): Promise<null> {
  const response = await axios.put<null>(`${baseUrl}/follow/id/${id}`);
  return response.data;
}

async function unfollowById(id: string): Promise<null> {
  const response = await axios.delete<null>(`${baseUrl}/follow/id/${id}`);
  return response.data;
}

export default {
  getTags,
  createTag,
  getTagBySlug,
  followById,
  unfollowById,
};
