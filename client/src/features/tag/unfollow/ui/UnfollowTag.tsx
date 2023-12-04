import { useAuth } from "@/providers/AuthProvider";
import { BookmarkAdded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Routing } from "@/shared/lib";
import { useUnfollowTag } from "../..";
import { useQueryClient } from "@tanstack/react-query";
import { tagKeys } from "@/entities/tag";
import { TagDTO } from "@/services/tag/tagService";

interface UnfollowTagProps {
  tagId: string;
  tagSlug: string;
}

export function UnfollowTag(props: UnfollowTagProps) {
  const { tagId, tagSlug } = props;
  const { currentUser } = useAuth();
  const { mutate, isPending } = useUnfollowTag();
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
              isFollowing: false,
              followersCount: prev.followersCount - 1,
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
      loading={isPending}
      startIcon={<BookmarkAdded />}
      variant="contained"
      disableElevation
      onClick={onClick}
      href={currentUser ? undefined : Routing.auth.signIn}
    >
      Following
    </LoadingButton>
  );
}
