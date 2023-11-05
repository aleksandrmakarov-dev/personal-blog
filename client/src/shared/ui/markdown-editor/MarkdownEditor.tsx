import { Divider, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import Markdown from "react-markdown";
import {
  A,
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Img,
  Ol,
  P,
  Ul,
} from "./components";

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
      <Tabs value={index} onChange={(_, v) => setIndex(v)}>
        <Tab value={0} label="Write" />
        <Tab value={1} label="Preview changes" />
      </Tabs>
      <Divider />
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
        <>
          <Markdown
            className={"h-[575px] overflow-auto"}
            components={{
              h1: H1,
              h2: H2,
              h3: H3,
              h4: H4,
              h5: H5,
              h6: H6,
              blockquote: Blockquote,
              ul: Ul,
              ol: Ol,
              a: A,
              code: Code,
              img: Img,
              p: P,
            }}
          >
            {props.value}
          </Markdown>
          <Divider />
        </>
      )}
    </>
  );
};

export default React.forwardRef(MarkdownEditor);
