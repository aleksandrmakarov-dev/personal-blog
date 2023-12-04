import { tagKeys } from "@/entities/tag";
import tagService from "@/services/tag/tagService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UnfollowTagParams {
  tagId: string;
}

export const useUnfollowTag = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorModelDTO>,
    UnfollowTagParams,
    unknown
  >({
    mutationKey: tagKeys.mutations.unfollow(),
    mutationFn: async ({ tagId }) => {
      return await tagService.unfollowById(tagId);
    },
  });
};
