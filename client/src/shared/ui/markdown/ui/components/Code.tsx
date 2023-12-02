import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "../copy-button/CopyButton";

export const Code = (props: any) => {
  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <div className="rounded-sm bg-gray-50 overflow-clip">
      <div className="flex items-center justify-between mb-2 bg-gray-200 px-2 py-1">
        <span className="text-sm text-foreground-secondary font-semibold">
          {match[1]}
        </span>
        <CopyButton value={String(children)} />
      </div>
      <div className="py-2 px-4">
        <SyntaxHighlighter
          {...rest}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={theme}
          customStyle={{ margin: 0, border: 0, padding: 0, background: "none" }}
          PreTag={"div"}
        />
      </div>
    </div>
  ) : (
    <code
      {...rest}
      className="bg-gray-100 rounded-sm px-1 py-[1px] text-gray-600"
    >
      {children}
    </code>
  );
};
