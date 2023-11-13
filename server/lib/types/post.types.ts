import { UserProfileDTO } from "./user.types";

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
