import { Headers } from "./toolbart-items/Headers";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import { ReusableItem } from "./toolbart-items/ReusableItem";
import { ImageItem } from "./toolbart-items/ImageItem";

export interface ToolbarItem {
  icon: any;
  tooltip: string;
  syntax: string;
  defaultValue: string;
  newline?: boolean;
}

interface MarkdownToolbarProps {
  addMarkdown: (
    syntax: string,
    defaultValue: string,
    newline?: boolean
  ) => void;
}

const toolbarItems: ToolbarItem[] = [
  {
    icon: <FormatBoldIcon />,
    tooltip: "Bold",
    syntax: "**{placeholder}**",
    defaultValue: "Placeholder",
  },
  {
    icon: <FormatItalicIcon />,
    tooltip: "Italic",
    syntax: "*{placeholder}*",
    defaultValue: "Placeholder",
  },
  {
    icon: <StrikethroughSIcon />,
    tooltip: "Strikethrough",
    syntax: "~~{placeholder}~~",
    defaultValue: "Placeholder",
  },
  {
    icon: <CodeRoundedIcon />,
    tooltip: "Code",
    syntax: "`{placeholder}`",
    defaultValue: "Placeholder",
  },
  {
    icon: <DataObjectRoundedIcon />,
    tooltip: "Code Block",
    syntax: "```\n{placeholder}\n```",
    defaultValue: "Placeholder",
    newline: true,
  },
  {
    icon: <InsertLinkRoundedIcon />,
    tooltip: "Link",
    syntax: "[{placeholder}](url)",
    defaultValue: "Link",
  },
  {
    icon: <FormatQuoteRoundedIcon />,
    tooltip: "Quote",
    syntax: "> {placeholder}",
    defaultValue: "Placeholder",
    newline: true,
  },
  {
    icon: <FormatListBulletedRoundedIcon />,
    tooltip: "Unordered List",
    syntax: "- {placeholder}",
    defaultValue: "Item",
    newline: true,
  },
  {
    icon: <FormatListNumberedRoundedIcon />,
    tooltip: "Ordered List",
    syntax: "1. {placeholder}",
    defaultValue: "Item",
    newline: true,
  },
  {
    icon: <ChecklistRoundedIcon />,
    tooltip: "Task List",
    syntax: "- [ ] {placeholder}",
    defaultValue: "Item",
    newline: true,
  },
];

export function MarkdownToolbar(props: MarkdownToolbarProps) {
  const { addMarkdown } = props;

  return (
    <div className="mb-2 bg-gray-50 rounded-sm p-1.5 flex gap-1 border border-gray-300">
      <Headers addMarkdown={addMarkdown} />
      {toolbarItems.map((item) => (
        <ReusableItem addMarkdown={addMarkdown} {...item} />
      ))}
      <ImageItem addMarkdown={addMarkdown} />
    </div>
  );
}
