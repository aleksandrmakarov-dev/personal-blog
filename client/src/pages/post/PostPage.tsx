import {
  PostAuthor,
  PostImage,
  PostLink,
  PostTagList,
  usePost,
} from "@/entities/post";
import { Routing } from "@/shared/lib";
import Header from "@/shared/ui/header/Header";
import { MarkdownPreview, MarkdownToc } from "@/shared/ui/markdown";
import PrivateComponent from "@/shared/ui/private-component/PrivateComponent";
import SquareIconButton from "@/shared/ui/square-icon-button/SquareIconButton";
import { Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function PostPage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = usePost(slug!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>{error?.response?.data.message}</div>;
  }

  const { author, created, updated, image, description, body, tags, title } =
    data;

  return (
    <div className="grid grid-cols-[6fr_2fr] gap-x-10 items-start">
      <div>
        <Header
          value={title}
          action={
            <PrivateComponent role="admin">
              <Link to={Routing.posts.edit(data.slug)}>
                <SquareIconButton>
                  <EditRoundedIcon />
                </SquareIconButton>
              </Link>
            </PrivateComponent>
          }
        />
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
        {image && <PostImage className="mt-8" image={image} />}
        <p className="mt-5">{description}</p>
        <MarkdownPreview value={body} />
        <Divider className="pt-5" />
        <PostTagList className="mt-5" tags={tags} />
      </div>
      <div className="sticky left-0 top-4">
        <MarkdownToc value={body} />
      </div>
      <div className="mt-5 grid grid-cols-3">
        <PostLink post={data.parent} next={false} />
        <div />
        <PostLink post={data.child} next={true} />
      </div>
    </div>
  );
}
