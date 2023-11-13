import { useParams } from "react-router-dom";
import { PostList, PostPreviewCard } from "../../../entities/post";
import { useGlobalFeed } from "../../../entities/post/api/postApi";
import RouterPagination from "../../../shared/ui/router-pagination/RouterPagination";

export function GlobalPostFeed() {
  const { page, limit, orderBy, query } = useParams<{
    page?: string;
    limit?: string;
    orderBy: string;
    query: string;
  }>();

  const { data, isLoading, isError } = useGlobalFeed({
    page: Number(page),
    limit: Number(limit),
    orderBy,
    query,
  });

  console.log(data);

  return (
    <>
      <PostList
        isLoading={isLoading}
        isError={isError}
        isSuccess={data !== undefined && data.items && !isError}
        posts={data?.items}
        renderPost={(post) => <PostPreviewCard key={post.id} post={post} />}
      />
      {data && data.totalItems > 0 && (
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
