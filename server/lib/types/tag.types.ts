import mongoose from "mongoose";
import { ITag, ITagMethods } from "../../models/tag.model";

export interface TagDTO {
  id: string;
  slug: string;
  name: string;
  followersCount: number;
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
    ITagMethods,
  userId?: string
): TagDTO => {
  return {
    id: tag._id.toString(),
    name: tag.name,
    slug: tag.slug,
    postsCount: tag.posts?.length || 0,
    followersCount: tag.followings?.length || 0,
    isFollowing: userId
      ? tag.followings?.includes(new mongoose.Types.ObjectId(userId))
      : false,
  };
};
