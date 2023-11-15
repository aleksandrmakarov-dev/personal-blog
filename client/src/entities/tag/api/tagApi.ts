import tagService, { TagDTO } from "@/services/tag/tagService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const tagKeys = {
  tags: {
    root: ["tags"],
    query: () => [...tagKeys.tags.root, "query"],
  },
  mutations: {
    create: () => [...tagKeys.tags.root, "create"],
    update: () => [...tagKeys.tags.root, "update"],
    delete: () => [...tagKeys.tags.root, "delete"],
  },
};

type UseTagsQuery = UseQueryOptions<
  TagDTO[],
  GenericErrorModelDTO,
  TagDTO[],
  unknown[]
>;

type UseTagsOptions = Omit<UseTagsQuery, "queryKey" | "queryFn">;

export const useTags = (options?: UseTagsOptions) => {
  return useQuery({
    queryKey: tagKeys.tags.query(),
    queryFn: async () => {
      return await tagService.getTags();
    },
    ...options,
  });
};
