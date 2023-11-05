import { Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import Markdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: any) => void;
  name: string;
  disabled?: boolean;
  ref: any;
  rows?: number;
}

const MarkdownEditor: React.ForwardRefRenderFunction<
  HTMLInputElement,
  MarkdownEditorProps
> = (props, ref) => {
  const { onChange, rows = 16, ...other } = props;

  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Tabs className="mb-3" value={index} onChange={(_, v) => setIndex(v)}>
        <Tab value={0} label="Write" />
        <Tab value={1} label="Preview changes" />
      </Tabs>
      {index === 0 && (
        <TextField
          size="small"
          fullWidth
          variant="standard"
          {...other}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          ref={ref}
          multiline
        />
      )}
      {index === 1 && (
        <Markdown className={"h-[575px] overflow-auto"}>{props.value}</Markdown>
      )}
    </>
  );
};

export default React.forwardRef(MarkdownEditor);
