import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { CircularProgress, IconButton } from "@mui/material";
import { useFavoritePost } from "..";
import { useQueryClient } from "@tanstack/react-query";
import { postKeys } from "@/entities/post";
import { PostDTO, PostPreviewDTO } from "@/services/post/postService";
import { PagedResponse } from "@/shared/lib/types";
import { useAuth } from "@/providers/AuthProvider";
import { Routing } from "@/shared/lib";

interface FavoritePostProps {
  postId: string;
  postSlug: string;
}

export function FavoritePost(props: FavoritePostProps) {
  const { postId, postSlug } = props;

  const { currentUser } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useFavoritePost();

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
                    return { ...post, isFavorite: true };
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
              return { ...prev, isFavorite: true };
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
      size="small"
      href={currentUser ? "" : Routing.auth.signIn}
      onClick={currentUser ? onClick : undefined}
    >
      {isPending && (
        <CircularProgress color="warning" sx={{ position: "absolute" }} />
      )}
      <StarOutlineRoundedIcon sx={{ fontSize: 28 }} />
    </IconButton>
  );
}
