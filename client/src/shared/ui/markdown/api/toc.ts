import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { slug } from "github-slugger";

// reference:
// https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

export interface TocNode {
  value: string;
  depth: number;
  data: { id: string };
  children: TocNode[];
}

export const tocPlugin: Plugin = () => (root, file) => {
  file.data.toc = getHeadings(root);
};

const getHeadings = (root: any) => {
  const output: TocNode[] = [];
  const indexMap = {};
  visit(root, "heading", (node) => {
    transformNode(node, output, indexMap);
  });

  return output;
};

function transformNode(node: any, output: TocNode[], indexMap: any) {
  const transformedNode: TocNode = {
    value: toString(node),
    depth: node.depth,
    data: {
      id: slug(toString(node)),
    },
    children: [],
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}
