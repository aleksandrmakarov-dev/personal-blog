import React, { useEffect, useState } from "react";

interface MarkdownToCProps {
  value: string;
}

const MarkdownToC = (props: MarkdownToCProps) => {
  const { value } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [toc, setToc] = useState([]);

  useEffect(() => {}, [value]);

  return <div></div>;
};

export default MarkdownToC;
