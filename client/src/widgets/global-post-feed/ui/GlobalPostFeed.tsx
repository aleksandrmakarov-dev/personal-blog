import { PostList, PostPreviewCard } from "../../../entities/post";
import { mockPosts } from "../../../shared/lib/constants";

export function GlobalPostFeed() {
  return (
    <PostList
      isLoading={false}
      isError={false}
      isSuccess={true}
      posts={mockPosts}
      renderPost={(post) => <PostPreviewCard post={post} />}
    />
  );
}
