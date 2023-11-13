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

export default {
  getTags,
};
