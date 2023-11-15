import { useMutation } from "@tanstack/react-query";
import { postKeys } from "@/entities/post/api/postApi";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { sleep } from "@/shared/lib/utils";
import postService, {
  PostDTO,
  CreatePostDTO,
} from "@/services/post/postService";

export const useCreatePost = () => {
  return useMutation<PostDTO, GenericErrorModelDTO, CreatePostDTO, unknown>({
    mutationKey: postKeys.mutations.create(),
    mutationFn: async (post: CreatePostDTO) => {
      await sleep(2000);
      return await postService.createPost(post);
    },
  });
};
