import { Settings, Logout } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { stringAvatar, stringToColor } from "../../../shared/lib/utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CurrentUser, useAuth } from "../../../providers/AuthProvider";
import { Routing } from "../../../shared/lib";

interface UserProfileMenuProps {
  currentUser?: CurrentUser;
}

export function UserProfileMenu(props: UserProfileMenuProps) {
  const { currentUser } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const {signOut} = useAuth();

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOutClick = () => {
    signOut();
    handleClose();
  }

  if (!currentUser) {
    return (
      <div className="flex gap-x-2">
        <Button href={Routing.auth.signIn} size="small">
          Sign In
        </Button>
        <Button
          href={Routing.auth.signUp}
          size="small"
          variant="contained"
          disableElevation
        >
          Sign Up
        </Button>
      </div>
    );
  }

  const color = stringToColor(currentUser.name);

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar
          children={stringAvatar(currentUser.name)}
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            bgcolor: color,
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            border: "1px solid #e0e0e0",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              borderLeft: "1px solid #e0e0e0",
              borderTop: "1px solid #e0e0e0",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={currentUser.name}
            secondary={currentUser.email}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={onSignOutClick}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
