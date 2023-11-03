import { PostCardDTO } from "../../../../shared/lib";

interface PostListProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  posts?: PostCardDTO[];
  renderPost: (post: PostCardDTO) => React.ReactNode;
}

export function PostList(props: PostListProps) {
  const { isLoading, isError, isSuccess, posts, renderPost } = props;
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && posts!.length > 0 ? (
        posts!.map((post) => renderPost(post))
      ) : (
        <div>No posts here yet.</div>
      )}
    </>
  );
}
