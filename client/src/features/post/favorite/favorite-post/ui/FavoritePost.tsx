import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { IconButton } from "@mui/material";
import { useFavoritePost } from "..";
import { useQueryClient } from "@tanstack/react-query";
import { postKeys } from "@/entities/post";

interface FavoritePostProps {
  postId: string;
}

export function FavoritePost(props: FavoritePostProps) {
  const { postId } = props;

  const queryClient = useQueryClient();

  const { mutate } = useFavoritePost();

  const onClick = () => {
    mutate(
      { postId: postId },
      {
        onSuccess: () => {
          console.log(`${postId} added to favorite`);
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
    <IconButton size="small" onClick={onClick}>
      <StarOutlineRoundedIcon sx={{ fontSize: 28 }} />
    </IconButton>
  );
}
