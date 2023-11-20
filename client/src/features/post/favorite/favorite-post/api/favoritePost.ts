import { postKeys } from "@/entities/post";
import postService from "@/services/post/postService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface FavoritePostParams {
  postId: string;
}

export const useFavoritePost = () => {
  return useMutation<
    unknown,
    AxiosError<GenericErrorModelDTO>,
    FavoritePostParams,
    unknown
  >({
    mutationKey: postKeys.mutations.favorite(),
    mutationFn: async ({ postId }) => {
      return await postService.favoritePostById(postId);
    },
  });
};
