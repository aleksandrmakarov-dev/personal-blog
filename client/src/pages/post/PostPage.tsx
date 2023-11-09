import { useParams } from "react-router-dom";
import { mockPost } from "../../shared/lib/constants";
import MarkdownPreview from "../../shared/ui/markdown/markdown-preview/MarkdownPreview";

export default function PostPage() {
  const { slug } = useParams();
  return (
    <div>
      <div className="grid grid-cols-[2fr_6fr] gap-x-5 items-start">
        <div className="bg-blue-100 sticky top-2 left-0">
          <h5>ToC</h5>
        </div>
        <div className="bg-blue-50">
          <h1>Post Page {slug}</h1>
          <MarkdownPreview value={mockPost.body} />
        </div>
      </div>
    </div>
  );
}
