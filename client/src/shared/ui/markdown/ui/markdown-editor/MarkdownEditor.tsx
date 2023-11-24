import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { MarkdownPreview } from "../markdown-preview/MarkdownPreview";
import { MarkdownEdit } from "../markdown-edit/MarkdownEdit";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: any) => void;
  name: string;
  disabled?: boolean;
  rows?: number;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const { onChange, value, disabled } = props;
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Tabs className="mb-2" value={index} onChange={(_, v) => setIndex(v)}>
        <Tab value={0} label="Write" disabled={disabled} />
        <Tab value={1} label="Preview changes" disabled={disabled} />
      </Tabs>
      <div className="h-[30rem]">
        {index === 0 && (
          <MarkdownEdit disabled={disabled} value={value} onChange={onChange} />
        )}
        {index === 1 && (
          <MarkdownPreview className="h-full overflow-auto" value={value} />
        )}
      </div>
    </>
  );
};
