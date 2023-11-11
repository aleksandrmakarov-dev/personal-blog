import { useEffect } from "react";
interface MarkdownToCProps {
  value: string;
}

const MarkdownToC = (props: MarkdownToCProps) => {
  const { value } = props;

  useEffect(() => {
    const fn = async () => {};
    fn();
  }, [value]);

  return <div></div>;
};

export default MarkdownToC;
