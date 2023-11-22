import { LoadingButton } from "@mui/lab";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import React from "react";

interface FormDialogProps {
  open: boolean;
  trigger: JSX.Element;
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;

  primaryButtonName?: string;
  secondaryButtonName?: string;
  primaryButtonColor?: "primary" | "secondary" | "error" | "info" | "success";
  secondaryButtonColor?: "primary" | "secondary" | "error" | "info" | "success";

  reset?: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const FormDialog: React.FC<FormDialogProps> = (props) => {
  const {
    trigger,
    open,
    children,
    title,
    isLoading,
    primaryButtonColor = "primary",
    secondaryButtonColor = "primary",
    primaryButtonName = "Submit",
    secondaryButtonName = "Cancel",
    setOpen,
    reset,
    handleSubmit,
  } = props;

  return (
    <>
      {React.cloneElement(trigger, { onClick: () => setOpen(true) })}
      <Dialog open={open} fullWidth>
        <form
          onSubmit={(e: any) => {
            // https://github.com/redux-form/redux-form/issues/3701
            // stop propagation to prevent dialog form from submitting the parent form
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button
              color={secondaryButtonColor}
              onClick={() => {
                setOpen(false);
                reset?.();
              }}
              disabled={isLoading}
            >
              {secondaryButtonName}
            </Button>
            <LoadingButton
              loading={isLoading}
              color={primaryButtonColor}
              type="submit"
              variant="contained"
              disableElevation
            >
              {primaryButtonName}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FormDialog;
