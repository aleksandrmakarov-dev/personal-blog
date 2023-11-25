import SquareIconButton from "@/shared/ui/square-icon-button/SquareIconButton";
import { IconButton } from "@mui/material";
import React from "react";

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
    <SquareIconButton size="small" title={tooltip} onClick={onClick}>
      {React.cloneElement(icon, { fontSize: "small" })}
    </SquareIconButton>
  );
}
