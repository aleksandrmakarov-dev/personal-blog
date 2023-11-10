import React, { useEffect, useState } from "react";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkToc from "remark-toc";
import { unified } from "unified";

interface MarkdownToCProps {
  value: string;
}

const MarkdownToC = (props: MarkdownToCProps) => {
  const { value } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [toc, setToc] = useState();

  useEffect(() => {
    const fn = async () => {
      const file = await remark()
          .use(rehypeSlug)
          .use(remarkToc,{tight: true,maxDepth: 5})
          .process(value)
      console.log("toc:",file);
    }
    fn();
  }, [value]);

  return <div></div>;
};

export default MarkdownToC;
