import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Profile } from "../../profile/api/profileApi";
import { GenericErrorModelDto } from "../../../shared/api/Api";

export interface Post {
  id: string;
  slug: string;
  title: string;
  descritpion: string;
  body: string;
  image?: string;
  created: Date;
  updated?: Date;
  author: Profile;
  likes: number;
  isLiked: boolean;
  tags: string[];
}

export type QueryFilter = {
  orderBy?: "latest" | "popular" | "oldest";
  query?: string;
};

export type GlobalFeedQuery = {
  page: number;
  limit: number;
} & QueryFilter;

export type UserFeedQuery = {
  page: number;
  limit: number;
} & QueryFilter;

export const postKeys = {
  posts: {
    root: ["posts"],
    globalFeed: {
      root: () => [...postKeys.posts.root, "global-feed"],
      query: (query: GlobalFeedQuery) => [
        ...postKeys.posts.globalFeed.root(),
        query,
      ],
    },
    userFeed: {
      root: () => [...postKeys.posts.root, "user-feed"],
      query: (query: UserFeedQuery) => [
        ...postKeys.posts.userFeed.root(),
        query,
      ],
    },
  },
  post: {
    root: ["post"],
    slug: (slug: string) => [...postKeys.post.root, slug],
  },
  mutations: {
    create: () => [...postKeys.post.root, "create"],
    update: () => [...postKeys.post.root, "update"],
    delete: () => [...postKeys.post.root, "delete"],
    like: () => [...postKeys.post.root, "like"],
    unlike: () => [...postKeys.post.root, "unlike"],
  },
};

type UseGlobalFeedQuery = UseQueryOptions<
  Post[],
  GenericErrorModelDto,
  GlobalFeedQuery,
  unknown[]
>;

type UseGlobalFeedOptions = Omit<UseGlobalFeedQuery, "queryKey" | "queryFn">;

export const useGlobalFeed = (
  params: GlobalFeedQuery,
  options?: UseGlobalFeedOptions
) => {
  return useQuery({
    queryKey: postKeys.posts.globalFeed.query(params),
    queryFn: async () => {
      return [];
    },
    ...options,
  });
};
