import { useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { MarkdownToolbar } from "../..";
import { cn } from "@/shared/lib";

interface MarkdownEditProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  textAreaDisabled?: boolean;
}

export const MarkdownEdit = (props: MarkdownEditProps) => {
  const {
    value: markdownValue,
    onValueChange,
    textAreaDisabled,
    className,
    ...other
  } = props;
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
      onValueChange(textareaRef.current!.value);
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
        onValueChange(textareaRef.current!.value);

        textareaRef.current!.selectionStart = selectionStart - 2;
        textareaRef.current!.selectionEnd = selectionEnd - 2;
      }
    }
  };

  const addMarkdown = (
    syntax: string,
    defaultValue: string,
    newline?: boolean
  ) => {
    const placeholder = /{placeholder}/g;

    const start = textareaRef.current!.selectionStart;
    const end = textareaRef.current!.selectionEnd;

    const text = textareaRef.current!.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);

    console.log(before);

    const isAtBeginningOfLine = before.trimEnd().endsWith("\n");

    // Prepend a newline character if the cursor is not at the beginning of the line
    const beforeWithNewline =
      !isAtBeginningOfLine && newline ? before + "\n" : before;

    const replacedString =
      syntax.replace(placeholder, selected || defaultValue) +
      (newline ? "  \n" : "");

    const after = text.substring(end, text.length);

    textareaRef.current!.value = beforeWithNewline + replacedString + after;
    textareaRef.current!.selectionStart = start + replacedString.length;
    textareaRef.current!.selectionEnd = start + replacedString.length;

    textareaRef.current!.focus();

    onValueChange(textareaRef.current!.value);
  };

  return (
    <div className={cn("h-full flex flex-col", className)} {...other}>
      <MarkdownToolbar addMarkdown={addMarkdown} />
      <div className="border rounded-md border-gray-300 p-2 focus-within:border-primary-600 focus-within:border-2 overflow-auto h-full">
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
            }}
            spellCheck={false}
            autoCorrect="off"
            ref={textareaRef}
            onKeyDown={onKeyDown}
            value={markdownValue}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={textAreaDisabled}
          />
        </div>
      </div>
    </div>
  );
};
