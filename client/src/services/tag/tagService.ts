import axios from "axios";

export interface TagDTO {
  id: string;
  name: string;
  slug: string;
}

async function getTags(): Promise<TagDTO[]> {
  const response = await axios.get<TagDTO[]>("/api/tags");

  return response.data;
}

export interface CreateTagDTO {
  name: string;
}

async function createTag(tag: CreateTagDTO): Promise<TagDTO> {
  const response = await axios.post<TagDTO>("/api/tags", tag);
  return response.data;
}

export default {
  getTags,
  createTag,
};
