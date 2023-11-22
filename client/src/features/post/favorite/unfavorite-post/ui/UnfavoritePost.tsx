import { StarRounded } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useUnfavoritePost } from "../api/unfavoritePost";
import { postKeys } from "@/entities/post";
import { PostPreviewDTO, PostDTO } from "@/services/post/postService";
import { PagedResponse } from "@/shared/lib/types";

interface UnfavoritePostProps {
  postId: string;
  postSlug: string;
}

export function UnfavoritePost(props: UnfavoritePostProps) {
  const { postId, postSlug } = props;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useUnfavoritePost();

  const onClick = () => {
    mutate(
      { postId: postId },
      {
        onSuccess: async () => {
          const postsQueryKey = postKeys.posts.globalFeed.root();
          const postQueryKey = postKeys.post.slug(postSlug);

          await queryClient.cancelQueries({ queryKey: postsQueryKey });
          await queryClient.cancelQueries({ queryKey: postQueryKey });

          queryClient.setQueriesData<PagedResponse<PostPreviewDTO>>(
            { queryKey: postsQueryKey },
            (prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                items: prev.items.map((post) => {
                  if (post.id === postId) {
                    return { ...post, isFavorite: false };
                  }
                  return post;
                }),
              };
            }
          );

          queryClient.setQueriesData<PostDTO>(
            {
              queryKey: postQueryKey,
            },
            (prev) => {
              if (!prev) return prev;
              return { ...prev, isFavorite: false };
            }
          );
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <IconButton
      sx={{ position: "relative" }}
      color="warning"
      size="small"
      onClick={onClick}
    >
      {isPending && (
        <CircularProgress color="warning" sx={{ position: "absolute" }} />
      )}
      <StarRounded sx={{ fontSize: 28 }} />
    </IconButton>
  );
}
