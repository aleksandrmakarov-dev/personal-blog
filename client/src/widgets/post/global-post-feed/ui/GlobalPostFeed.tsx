import { PostList, PostCard } from "@/entities/post";
import { useGlobalFeed } from "@/entities/post/api/postApi";
import { getSearchParamsObject } from "@/shared/lib/utils";
import RouterPagination from "@/shared/ui/router-pagination/RouterPagination";
import { useParams, useSearchParams } from "react-router-dom";

export function GlobalPostFeed() {
  const [searchParams] = useSearchParams();
  const { tagSlug } = useParams();

  const { data, isLoading, isError, error, isSuccess } = useGlobalFeed({
    ...getSearchParamsObject(searchParams),
    limit: 10,
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
        renderPost={(post) => <PostCard key={post.id} post={post} />}
      />
      {data && data.meta && data.meta.pagesCount > 1 && (
        <RouterPagination className="mt-2.5" {...data.meta} />
      )}
    </>
  );
}
