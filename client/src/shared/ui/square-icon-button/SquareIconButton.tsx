import { IconButton, styled } from "@mui/material";

const SquareIconButton = styled(IconButton)(() => ({
  borderRadius: "0.25rem",
  "& .MuiTouchRipple-root .MuiTouchRipple-child": {
    borderRadius: "0.25rem",
  },
}));

export default SquareIconButton;
