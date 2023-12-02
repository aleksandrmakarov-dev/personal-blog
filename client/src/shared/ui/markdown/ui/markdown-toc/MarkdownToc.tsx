import { useEffect, useRef, useState } from "react";
import { remark } from "remark";
import { TocNode, tocPlugin } from "../../api/toc";
import { cn } from "@/shared/lib";

// reference:
// https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

interface MarkdownTocProps {
  value: string;
  maxDepth?: number;
}

interface TocFontSizes {
  [key: number]: string;
}

const renderNodes = (nodes: TocNode[], activeId: string, maxDepth: number) => {
  return (
    <ul>
      {nodes.map((node) => (
        <TocLink
          key={node.data.id}
          node={node}
          activeId={activeId}
          maxDepth={maxDepth}
        />
      ))}
    </ul>
  );
};

interface TocLinkProps {
  node: TocNode;
  activeId: string;
  maxDepth: number;
}

const TocLink = (props: TocLinkProps) => {
  const { node, activeId, maxDepth } = props;

  const fontSize: TocFontSizes = {
    1: "text-2xl font-bold",
    2: "text-lg font-semibold",
    3: "text-base",
    4: "text-xs",
    5: "text-xs",
    6: "text-xs",
  };

  const onClick = (e: any) => {
    e.preventDefault();

    document
      ?.getElementById(node.data.id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <li className={cn({ "ml-3": node.depth > 2 })} key={node.data.id}>
      <a
        className={cn("hover:text-primary-600", fontSize[node.depth], {
          "text-primary-600": activeId === node.data.id,
        })}
        href={`#${node.data.id}`}
        onClick={onClick}
      >
        {node.value}
      </a>
      {node.depth < maxDepth &&
        node.children?.length > 0 &&
        renderNodes(node.children, activeId, maxDepth)}
    </li>
  );
};

export const MarkdownToc = (props: MarkdownTocProps) => {
  const { value, maxDepth } = props;

  const observerRef = useRef<IntersectionObserver>();
  const [toc, setToc] = useState<TocNode[]>();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((element) => observerRef.current?.observe(element));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const file = remark().use(tocPlugin).processSync(value);
    const tocNodes = file.data.toc as TocNode[];
    setToc(tocNodes);
  }, [value]);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="text-foreground-primary text-lg font-semibold mb-2">
        Table of Contents
      </div>
      <div className="text-foreground-secondary">
        {toc && renderNodes(toc, activeId, maxDepth || 6)}
      </div>
    </div>
  );
};
