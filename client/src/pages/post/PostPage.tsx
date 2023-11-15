import { PostAuthor, PostImage } from "@/entities/post";
import { usePost } from "@/entities/post/api/postApi";
import MarkdownPreview from "@/shared/ui/markdown/markdown-preview/MarkdownPreview";
import MarkdownToC from "@/shared/ui/markdown/markdown-toc/MarkdownToC";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = usePost(slug!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>{error?.message}</div>;
  }

  const { author, created, updated, image, description, body } = data;

  return (
    <div>
      <div className="grid grid-cols-[2fr_6fr] gap-x-5 items-start">
        <div className="sticky top-2 left-0">
          <h5 className="text-xl font-semibold text-foreground-primary">
            Table of Contents
          </h5>
          <MarkdownToC value={body} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground-primary my-8">
            {data.title}
          </h1>
          <PostAuthor
            id={author?.slug || "test-user"}
            name={author?.name || "Test User"}
            readingTime={5}
            readingUnits="min"
            created={created}
            updated={updated}
          />
          <PostImage
            className="mt-8"
            image={image}
            description="Brand new technology 2023"
          />
          <p className="mt-5">{description}</p>
          <MarkdownPreview value={body} />
        </div>
      </div>
    </div>
  );
}
