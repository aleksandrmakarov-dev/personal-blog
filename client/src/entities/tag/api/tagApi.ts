import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { GenericErrorModelDto } from "../../../shared/lib/types";
import tagService, { TagDTO } from "../../../services/tag/tagService";

export const tagKeys = {
  tags: {
    root: ["tags"],
    query: () => [...tagKeys.tags.root, "query"],
  },
};

type UseTagsQuery = UseQueryOptions<
  TagDTO[],
  GenericErrorModelDto,
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
