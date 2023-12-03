import tagService, { TagDTO } from "@/services/tag/tagService";
import { GenericErrorModelDTO, PagedResponse } from "@/shared/lib/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const tagKeys = {
  tags: {
    root: ["tags"],
    query: () => [...tagKeys.tags.root, "query"],
    slug: (slug: string) => [...tagKeys.tags.root, slug],
  },
  mutations: {
    create: () => [...tagKeys.tags.root, "create"],
    update: () => [...tagKeys.tags.root, "update"],
    delete: () => [...tagKeys.tags.root, "delete"],
  },
};

type UseTagsQuery = UseQueryOptions<
  PagedResponse<TagDTO>,
  GenericErrorModelDTO,
  PagedResponse<TagDTO>,
  unknown[]
>;

type UseTagsOptions = Omit<UseTagsQuery, "queryKey" | "queryFn">;

interface GetTagsQuery {
  page: number;
  limit?: number;
  orderBy?: string;
  query?: string;
}

export const useTags = (params: GetTagsQuery, options?: UseTagsOptions) => {
  return useQuery({
    queryKey: tagKeys.tags.query(),
    queryFn: async () => {
      return await tagService.getTags(params);
    },
    ...options,
  });
};

export const useTagBySlug = (slug: string) => {
  return useQuery<TagDTO, AxiosError<GenericErrorModelDTO>, TagDTO, unknown[]>({
    queryKey: tagKeys.tags.slug(slug),
    queryFn: async () => {
      return await tagService.getTagBySlug(slug);
    },
  });
};
