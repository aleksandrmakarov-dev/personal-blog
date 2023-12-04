import { postKeys } from "@/entities/post";
import postService from "@/services/post/postService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UnfavoritePostParams {
  postId: string;
}

export const useUnfavoritePost = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorModelDTO>,
    UnfavoritePostParams,
    unknown
  >({
    mutationKey: postKeys.mutations.unfavorite(),
    mutationFn: async ({ postId }) => {
      return await postService.unfavoritePostById(postId);
    },
  });
};
