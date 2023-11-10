import { useParams } from "react-router-dom";
import { mockPost } from "../../shared/lib/constants";
import MarkdownPreview from "../../shared/ui/markdown/markdown-preview/MarkdownPreview";
import { PostAuthor, PostImage } from "../../entities/post";

export default function PostPage() {
  const { slug } = useParams();

  const {title,description,image,body,user,created,updated} = mockPost;

  return (
    <div>
      <div className="grid grid-cols-[2fr_6fr] gap-x-5 items-start">
        <div className="sticky top-2 left-0">
          <h5>ToC</h5>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground-primary my-8">{title}</h1>
          <PostAuthor id={user.id} name={user.name} readingTime={5} readingUnits="min" created={created} updated={updated}/>
          <PostImage className="mt-8" image={image} description="Brand new technology 2023"/>
          <p className="mt-5">{description}</p>
          <MarkdownPreview value={body} />
        </div>
      </div>
    </div>
  );
}
