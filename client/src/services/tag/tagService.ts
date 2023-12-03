import { PagedResponse } from "@/shared/lib/types";
import axios from "axios";

export interface TagDTO {
  id: string;
  name: string;
  slug: string;
  postsCount: number;
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

export default {
  getTags,
  createTag,
  getTagBySlug,
};
