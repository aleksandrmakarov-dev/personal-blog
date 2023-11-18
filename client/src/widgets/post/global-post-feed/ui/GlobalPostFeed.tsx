import { PostList, PostPreviewCard } from "@/entities/post";
import { useGlobalFeed } from "@/entities/post/api/postApi";
import useSearchParameters from "@/shared/hooks/useSearchParameters";
import RouterPagination from "@/shared/ui/router-pagination/RouterPagination";

export function GlobalPostFeed() {
  const searchParams = useSearchParameters();

  const { data, isLoading, isError, error, isSuccess } =
    useGlobalFeed(searchParams);

  return (
    <>
      <PostList
        isLoading={isLoading}
        isError={isError}
        error={error?.response?.data}
        isSuccess={isSuccess && data !== undefined}
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
