import { useMutation, useQuery } from "@tanstack/react-query";
import postService, {
  CreatePostDTO,
  PostDTO,
} from "../../../../services/post/postService";
import { GenericErrorModelDto } from "../../../../shared/lib/types";
import { postKeys } from "../../../../entities/post/api/postApi";
import { sleep } from "../../../../shared/lib/utils";

export const useCreatePost = () => {
  return useMutation<PostDTO, GenericErrorModelDto, CreatePostDTO, unknown>({
    mutationKey: postKeys.mutations.create(),
    mutationFn: async (post: CreatePostDTO) => {
      await sleep(5000);
      return await postService.createPost(post);
    },
  });
};
