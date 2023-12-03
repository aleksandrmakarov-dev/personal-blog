import postService, { PostDTO, PostCardDTO } from "@/services/post/postService";
import { PagedResponse, GenericErrorModelDTO } from "@/shared/lib/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type QueryFilter = {
  orderBy?: string;
  query?: string;
  tag?: string;
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
    query: (query: QueryFilter) => [...postKeys.posts.root, query],
  },
  post: {
    root: ["post"],
    slug: (slug: string) => [...postKeys.post.root, slug],
  },
  mutations: {
    create: () => [...postKeys.post.root, "create"],
    update: () => [...postKeys.post.root, "update"],
    delete: () => [...postKeys.post.root, "delete"],
    favorite: () => [...postKeys.post.root, "favorite"],
    unfavorite: () => [...postKeys.post.root, "unfavorite"],
  },
};

type UsePostsQuery<T> = UseQueryOptions<
  T,
  AxiosError<GenericErrorModelDTO>,
  T,
  unknown[]
>;

type UsePostsOptions = Omit<
  UsePostsQuery<PagedResponse<PostCardDTO>>,
  "queryKey" | "queryFn"
>;

export const usePosts = (params: QueryFilter, options?: UsePostsOptions) => {
  return useQuery({
    queryKey: postKeys.posts.query(params),
    queryFn: async () => {
      return await postService.getPosts(params);
    },
    ...options,
  });
};

type UseGlobalFeedQuery = UseQueryOptions<
  PagedResponse<PostCardDTO>,
  AxiosError<GenericErrorModelDTO>,
  PagedResponse<PostCardDTO>,
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
      return await postService.getPosts(params);
    },
    ...options,
  });
};

export const usePost = (slug: string) => {
  return useQuery<
    PostDTO,
    AxiosError<GenericErrorModelDTO>,
    PostDTO,
    unknown[]
  >({
    queryKey: postKeys.post.slug(slug),
    queryFn: async () => {
      return await postService.getPostBySlug(slug);
    },
  });
};
