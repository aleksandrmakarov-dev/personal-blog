import { PostList, PostPreviewCard } from "@/entities/post";
import { useGlobalFeed } from "@/entities/post/api/postApi";
import RouterPagination from "@/shared/ui/router-pagination/RouterPagination";
import { useParams } from "react-router-dom";

export function GlobalPostFeed() {
  const { page, limit, orderBy, query } = useParams<{
    page?: string;
    limit?: string;
    orderBy: string;
    query: string;
  }>();

  const { data, isLoading, isError, isSuccess } = useGlobalFeed({
    page: Number(page ?? 1),
    limit: Number(limit ?? 10),
    orderBy,
    query,
  });

  return (
    <>
      <PostList
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess && data !== undefined && data.items && !isError}
        posts={data?.items}
        renderPost={(post) => <PostPreviewCard key={post.id} post={post} />}
      />
      {data && data.totalPages > 1 && (
        <RouterPagination
          className="mt-2.5"
          totalItems={data.totalItems}
          totalPages={data.totalPages}
          limit={data.limit}
          page={data.page}
          baseUrl="/posts"
        />
      )}
    </>
  );
}
