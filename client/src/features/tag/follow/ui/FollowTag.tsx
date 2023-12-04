import { useAuth } from "@/providers/AuthProvider";
import { BookmarkAdd } from "@mui/icons-material";
import { useFollowTag } from "../api/followTag";
import { LoadingButton } from "@mui/lab";
import { Routing } from "@/shared/lib";
import { tagKeys } from "@/entities/tag";
import { useQueryClient } from "@tanstack/react-query";
import { TagDTO } from "@/services/tag/tagService";

interface FollowTagProps {
  tagId: string;
  tagSlug: string;
}

export function FollowTag(props: FollowTagProps) {
  const { tagId, tagSlug } = props;
  const { currentUser } = useAuth();
  const { mutate, isPending } = useFollowTag();
  const queryClient = useQueryClient();

  const onClick = () => {
    mutate(
      { tagId: tagId },
      {
        onSuccess: () => {
          const queryKey = tagKeys.tags.slug(tagSlug);

          queryClient.cancelQueries({ queryKey: queryKey });

          queryClient.setQueryData<TagDTO>(queryKey, (prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              isFollowing: true,
              followersCount: prev.followersCount + 1,
            };
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <LoadingButton
      startIcon={<BookmarkAdd />}
      variant="contained"
      disableElevation
      loading={isPending}
      onClick={onClick}
      href={currentUser ? undefined : Routing.auth.signIn}
    >
      Follow
    </LoadingButton>
  );
}
