import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SquareIconButton from "@/shared/ui/square-icon-button/SquareIconButton";
import { Tooltip } from "@mui/material";

interface CopyButtonProps {
  value: string;
}

export const CopyButton = (props: CopyButtonProps) => {
  const { value } = props;

  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Tooltip
      title={copied ? "Copied!" : "Copy"}
      open={open || copied}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <SquareIconButton size="small" onClick={onClick}>
        <ContentCopyIcon fontSize="small" />
      </SquareIconButton>
    </Tooltip>
  );
};
