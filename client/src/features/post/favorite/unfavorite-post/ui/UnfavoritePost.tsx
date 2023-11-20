import { StarRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useUnfavoritePost } from "../api/unfavoritePost";
import { postKeys } from "@/entities/post";

interface UnfavoritePostProps {
  postId: string;
}

export function UnfavoritePost(props: UnfavoritePostProps) {
  const { postId } = props;

  const queryClient = useQueryClient();

  const { mutate } = useUnfavoritePost();

  const onClick = () => {
    mutate(
      { postId: postId },
      {
        onSuccess: () => {
          console.log(`${postId} removed from favorite`);
          // make it better
          queryClient.invalidateQueries({
            queryKey: postKeys.posts.globalFeed.root(),
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <IconButton size="small" color="warning" onClick={onClick}>
      <StarRounded sx={{ fontSize: 28 }} />
    </IconButton>
  );
}
