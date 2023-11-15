import { tagKeys } from "@/entities/tag/api/tagApi";
import tagService, { CreateTagDTO, TagDTO } from "@/services/tag/tagService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateTag = () => {
  return useMutation<TagDTO, GenericErrorModelDTO, CreateTagDTO, unknown[]>({
    mutationKey: tagKeys.mutations.create(),
    mutationFn: async (tag: CreateTagDTO) => {
      return tagService.createTag(tag);
    },
  });
};
