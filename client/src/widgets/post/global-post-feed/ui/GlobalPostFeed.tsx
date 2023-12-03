import { PostList, PostPreviewCard } from "@/entities/post";
import { useGlobalFeed } from "@/entities/post/api/postApi";
import { getSearchParamsObject } from "@/shared/lib/utils";
import RouterPagination from "@/shared/ui/router-pagination/RouterPagination";
import { useParams, useSearchParams } from "react-router-dom";

export function GlobalPostFeed() {
  const [searchParams] = useSearchParams();
  const { tagSlug } = useParams();

  const { data, isLoading, isError, error, isSuccess } = useGlobalFeed({
    ...getSearchParamsObject(searchParams),
    tag: tagSlug,
  });

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
        />
      )}
    </>
  );
}
