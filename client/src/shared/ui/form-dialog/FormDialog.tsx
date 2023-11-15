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
  reset: () => void;
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
    setOpen,
    reset,
    handleSubmit,
  } = props;

  return (
    <>
      {React.cloneElement(trigger, { onClick: () => setOpen(true) })}
      <Dialog open={open} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                reset();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              disableElevation
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FormDialog;
