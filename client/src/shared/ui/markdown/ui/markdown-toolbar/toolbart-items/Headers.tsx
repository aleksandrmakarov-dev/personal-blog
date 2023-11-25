import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import TitleIcon from "@mui/icons-material/Title";
import SquareIconButton from "@/shared/ui/square-icon-button/SquareIconButton";

interface HeadersProps {
  addMarkdown: (
    syntax: string,
    defaultValue: string,
    newline?: boolean
  ) => void;
}

export function Headers(props: HeadersProps) {
  const { addMarkdown } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  const executeThenClose = (fn: any) => {
    fn();
    close();
  };

  return (
    <div>
      <SquareIconButton size="small" onClick={handleClick} title="Headers">
        <TitleIcon fontSize="small" />
      </SquareIconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={close}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <MenuItem
            key={i}
            title={`Heading ${i}`}
            onClick={() =>
              executeThenClose(() =>
                addMarkdown(
                  `${"#".repeat(i)} {placeholder}`,
                  `Heading ${i}`,
                  true
                )
              )
            }
          >
            Heading {i}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
