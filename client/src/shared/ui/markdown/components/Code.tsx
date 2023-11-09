import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Code = (props: any) => {
  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      {...rest}
      customStyle={{ maxHeight: "24rem" }}
      children={String(children).replace(/\n$/, "")}
      language={match[1]}
      style={theme}
      showLineNumbers={true}
      PreTag={"div"}
    />
  ) : (
    <code
      {...rest}
      className="bg-primary-100 rounded-md px-1 py-[1px] text-blue-600"
    >
      {children}
    </code>
  );
};
