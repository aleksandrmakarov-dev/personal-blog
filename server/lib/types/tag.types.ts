import mongoose from "mongoose";
import { ITag, ITagMethods } from "../../models/tag.model";

export interface TagDTO {
  id: string;
  slug: string;
  name: string;
  postsCount: number;
  isFollowing: boolean;
}

export const mapToTagDTO = (
  tag: mongoose.Document<unknown, {}, ITag> &
    Omit<
      ITag & {
        _id: mongoose.Types.ObjectId;
      },
      never
    > &
    ITagMethods
): TagDTO => {
  return {
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    postsCount: tag.posts?.length || 0,
    isFollowing: false,
  };
};
