import { useEffect, useRef, useState } from "react";
import { remark } from "remark";
import { TocNode, tocPlugin } from "../../api/toc";
import { cn } from "@/shared/lib";

// reference:
// https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

interface MarkdownTocProps {
  value: string;
}

interface TocFontSizes {
  [key: number]: string;
}

const renderNodes = (nodes: TocNode[], activeId: string) => {
  return (
    <ul>
      {nodes.map((node) => (
        <TocLink node={node} activeId={activeId} />
      ))}
    </ul>
  );
};

const TocLink = (props: { node: TocNode; activeId: string }) => {
  const { node, activeId } = props;

  const fontSize: TocFontSizes = {
    2: "text-base font-semibold",
    3: "text-sm",
    4: "text-xs",
  };

  const onClick = (e: any) => {
    e.preventDefault();

    document
      ?.getElementById(node.data.id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <li className={cn({ "ml-4": node.depth > 2 })} key={node.data.id}>
      <a
        className={cn("hover:text-primary-600", fontSize[node.depth], {
          "text-primary-600": activeId === node.data.id,
        })}
        href={`#${node.data.id}`}
        onClick={onClick}
      >
        {node.value}
      </a>
      {node.children?.length > 0 && renderNodes(node.children, activeId)}
    </li>
  );
};

export const MarkdownToc = (props: MarkdownTocProps) => {
  const { value } = props;

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
        {toc && renderNodes(toc, activeId)}
      </div>
    </div>
  );
};
