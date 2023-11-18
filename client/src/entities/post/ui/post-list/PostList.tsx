import { PostPreviewDTO } from "@/services/post/postService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { Alert, AlertTitle } from "@mui/material";

interface PostListProps {
  isLoading: boolean;
  isError: boolean;
  error?: GenericErrorModelDTO;
  isSuccess: boolean;
  posts?: PostPreviewDTO[];
  renderPost: (post: PostPreviewDTO) => React.ReactNode;
}

export function PostList(props: PostListProps) {
  const { isLoading, isError, error, isSuccess, posts, renderPost } = props;
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error while loading posts</AlertTitle>
          {error?.message}
        </Alert>
      )}
      {isSuccess &&
        (posts!.length > 0 ? (
          posts!.map((post) => renderPost(post))
        ) : (
          <div>No posts here yet.</div>
        ))}
    </>
  );
}
