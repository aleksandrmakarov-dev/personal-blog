import { IconButton } from "@mui/material";

interface BasicItmProps {
  icon: any;
  tooltip: string;
  syntax: string;
  defaultValue: string;
  newline?: boolean;
  addMarkdown: (
    syntax: string,
    defaultValue: string,
    newline?: boolean
  ) => void;
}

export function ReusableItem(props: BasicItmProps) {
  const { icon, tooltip, syntax, defaultValue, newline, addMarkdown } = props;

  const onClick = () => {
    addMarkdown(syntax, defaultValue, newline);
  };

  return (
    <IconButton title={tooltip} onClick={onClick}>
      {icon}
    </IconButton>
  );
}
