import axios from "axios";
import { PagedResponse } from "../../shared/lib/types";
import { UserProfileDTO } from "../user/userService";

export interface PostPreviewDTO {
  id: string;
  slug: string;
  title: string;
  descritpion: string;
  image?: string;
  created: Date;
  updated?: Date;
  author: UserProfileDTO;
  likes: number;
  isLiked: boolean;
  tags: string[];
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

export default {
  getPosts,
  createPost,
};
