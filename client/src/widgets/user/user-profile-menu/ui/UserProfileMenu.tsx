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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "@/providers/AuthProvider";
import { Routing } from "@/shared/lib";
import { stringAvatar, stringToColor } from "@/shared/lib/utils";
import { useSignOut } from "@/features/user";
import { useNavigate } from "react-router-dom";

export function UserProfileMenu() {
  const { currentUser, isLoading } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const { clearUser } = useAuth();

  const navigate = useNavigate();
  const { mutate } = useSignOut();

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOutClick = () => {
    handleClose();
    mutate(
      {},
      {
        onSuccess: () => {
          clearUser();
        },
      }
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return (
      <div className="flex gap-x-2">
        <Button href={Routing.auth.signIn} size="small" variant="outlined">
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

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar
          src={currentUser.image}
          children={stringAvatar(currentUser.name)}
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            bgcolor: stringToColor(currentUser.name),
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
        <MenuItem
          onClick={() => {
            close();
            navigate(Routing.users.profile(currentUser.slug));
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={currentUser.name}
            secondary={currentUser.email}
          />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            close();
            navigate(Routing.users.settings(currentUser.slug));
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={onSignOutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
