import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import MarkdownPreview from "./markdown-preview/MarkdownPreview";
import MarkdownEdit from "./markdown-edit/MarkdownEdit";

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
> = (props) => {
  const { onChange, value } = props;
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Tabs value={index} onChange={(_, v) => setIndex(v)}>
        <Tab value={0} label="Write" />
        <Tab value={1} label="Preview changes" />
      </Tabs>
      <div className="h-96">
        {index === 0 && <MarkdownEdit value={value} onChange={onChange} />}
        {index === 1 && (
          <MarkdownPreview className="h-full overflow-auto" value={value} />
        )}
      </div>
    </>
  );
};

export default React.forwardRef(MarkdownEditor);
