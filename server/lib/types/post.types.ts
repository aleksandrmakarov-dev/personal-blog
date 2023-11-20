import { TagDTO } from "./tag.types";
import { UserProfileDTO } from "./user.types";

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

export interface PostParentDTO {
  id: string;
  slug: string;
  title: string;
}
