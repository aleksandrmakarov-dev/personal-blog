import { tagKeys } from "@/entities/tag";
import tagService from "@/services/tag/tagService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface FollowTagParams {
  tagId: string;
}

export const useFollowTag = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorModelDTO>,
    FollowTagParams,
    unknown
  >({
    mutationKey: tagKeys.mutations.follow(),
    mutationFn: async ({ tagId }) => {
      return await tagService.followById(tagId);
    },
  });
};
