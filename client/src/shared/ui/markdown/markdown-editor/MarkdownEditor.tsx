import { Divider, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import MarkdownEdit from "../markdown-edit/MarkdownEdit";
import MarkdownPreview from "../markdown-preview/MarkdownPreview";

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
  HTMLTextAreaElement,
  MarkdownEditorProps
> = (props, ref) => {
  const { onChange, value, disabled } = props;
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Tabs value={index} onChange={(_, v) => setIndex(v)}>
        <Tab value={0} label="Write" disabled={disabled} />
        <Tab value={1} label="Preview changes" disabled={disabled} />
      </Tabs>
      <div className="h-96 mb-2">
        {index === 0 && (
          <MarkdownEdit disabled={disabled} value={value} onChange={onChange} />
        )}
        {index === 1 && (
          <MarkdownPreview className="h-full overflow-auto" value={value} />
        )}
      </div>
      <Divider />
    </>
  );
};

export default React.forwardRef(MarkdownEditor);
