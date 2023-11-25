import { PostAuthor, PostImage, usePost } from "@/entities/post";
import { MarkdownPreview, MarkdownToc } from "@/shared/ui/markdown";
import { Chip, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = usePost(slug!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>{error?.response?.data.message}</div>;
  }

  const { author, created, updated, image, description, body, tags } = data;

  return (
    <div>
      <div className="grid grid-cols-[6fr_2fr] gap-x-10 items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground-primary my-8">
            {data.title}
          </h1>
          {author && (
            <PostAuthor
              id={author.slug}
              name={author.name}
              readingTime={data.readingTime}
              readingUnits="min"
              created={created}
              updated={updated}
            />
          )}
          {image && (
            <PostImage
              className="mt-8"
              image={image}
              description="Brand new technology 2023"
            />
          )}
          <p className="mt-5">{description}</p>
          <MarkdownPreview value={body} />
          <Divider className="pt-5" />
          <div className="mt-5">
            <h5 className="text-lg font-semibold mb-3">Tags</h5>
            <div className=" flex items-center gap-2">
              {tags.map((tag) => (
                <Chip key={tag.id} label={tag.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="sticky left-0 top-4">
          <MarkdownToc value={body} />
        </div>
      </div>
    </div>
  );
}
