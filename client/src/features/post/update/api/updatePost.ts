import { postKeys } from "@/entities/post";
import postService, {
  PostDTO,
  UpdatePostDTO,
} from "@/services/post/postService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UpdatePostParams {
  id: string;
  post: UpdatePostDTO;
}

export const useUpdatePost = () => {
  return useMutation<
    PostDTO,
    AxiosError<GenericErrorModelDTO>,
    UpdatePostParams,
    unknown
  >({
    mutationKey: postKeys.mutations.update(),
    mutationFn: async ({ id, post }) => {
      return await postService.updatePostById(id, post);
    },
  });
};
