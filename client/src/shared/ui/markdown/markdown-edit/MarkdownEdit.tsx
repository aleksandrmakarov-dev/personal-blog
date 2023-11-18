import React, { useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface MarkdownEditProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MarkdownEdit: React.ForwardRefRenderFunction<
  HTMLInputElement,
  MarkdownEditProps
> = (props, _ref) => {
  const { value: markdownValue, onChange, disabled } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (e: any) => {
    // Stackoverflow code to handle tabs in textarea

    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const value = textareaRef.current!.value;
      const selectionStart = textareaRef.current!.selectionStart;
      const selectionEnd = textareaRef.current!.selectionEnd;
      textareaRef.current!.value =
        value.substring(0, selectionStart) +
        "  " +
        value.substring(selectionEnd);
      textareaRef.current!.selectionStart =
        selectionEnd + 2 - (selectionEnd - selectionStart);
      textareaRef.current!.selectionEnd =
        selectionEnd + 2 - (selectionEnd - selectionStart);
      onChange(textareaRef.current!.value);
    }
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      const value = textareaRef.current!.value;
      const selectionStart = textareaRef.current!.selectionStart;
      const selectionEnd = textareaRef.current!.selectionEnd;

      const beforeStart = value
        .substring(0, selectionStart)
        .split("")
        .reverse()
        .join("");
      const indexOfTab = beforeStart.indexOf("  ");
      const indexOfNewline = beforeStart.indexOf("\n");

      if (indexOfTab !== -1 && indexOfTab < indexOfNewline) {
        textareaRef.current!.value =
          beforeStart
            .substring(indexOfTab + 2)
            .split("")
            .reverse()
            .join("") +
          beforeStart.substring(0, indexOfTab).split("").reverse().join("") +
          value.substring(selectionEnd);
        onChange(textareaRef.current!.value);

        textareaRef.current!.selectionStart = selectionStart - 2;
        textareaRef.current!.selectionEnd = selectionEnd - 2;
      }
    }
  };

  return (
    <div className="relative overflow-auto h-full">
      <div className="relative !text-sm">
        <SyntaxHighlighter
          style={vs}
          language="markdown"
          customStyle={{
            padding: "1rem",
            margin: 0,
            fontFamily: "!monospace",
            wordBreak: "break-word",
            msWordBreak: "keep-all",
            overflowWrap: "break-word",
            overflowX: "hidden",
          }}
          lineProps={{
            style: {
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            },
          }}
          wrapLines={true}
        >
          {markdownValue}
        </SyntaxHighlighter>
        <textarea
          style={{
            padding: "1rem",
            margin: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            resize: "none",
            overflow: "hidden",
            background: "transparent",
            outline: "none",
            border: "none",
            color: "transparent",
            caretColor: "black",
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontStyle: "italic",
            fontWeight: "bold",
          }}
          spellCheck={false}
          autoCorrect="off"
          ref={textareaRef}
          onKeyDown={onKeyDown}
          value={markdownValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(MarkdownEdit);
