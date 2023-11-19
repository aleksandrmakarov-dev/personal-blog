import { postKeys } from "@/entities/post";
import postService from "@/services/post/postService";
import {
  GenericErrorModelDTO,
  GenericResponseModelDTO,
} from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeletePost = () => {
  return useMutation<
    GenericResponseModelDTO,
    AxiosError<GenericErrorModelDTO>,
    string
  >({
    mutationKey: postKeys.mutations.delete(),
    mutationFn: async (postId) => {
      return await postService.deletePostById(postId);
    },
  });
};
