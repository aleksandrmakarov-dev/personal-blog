import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HTMLAttributes } from "react";
import {
  A,
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Img,
  Ol,
  P,
  Ul,
} from "../components";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface MarkdownPreviewProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = (props) => {
  const { value, ...other } = props;

  return (
    <Markdown
      {...other}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        blockquote: Blockquote,
        ul: Ul,
        ol: Ol,
        a: A,
        code: Code,
        img: Img,
        p: P,
      }}
    >
      {value}
    </Markdown>
  );
};

export default MarkdownPreview;
