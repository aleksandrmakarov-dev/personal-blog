import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  TagEditorBody,
  TagEditorSchemaType,
  tagEditorSchema,
} from "../tag-editor-body/TagEditorBody";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import React from "react";

interface TagEditorDialogProps {
  open: boolean;
  trigger: JSX.Element;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  tag?: TagEditorSchemaType;

  setOpen: (open: boolean) => void;
  onSubmit: (values: TagEditorSchemaType) => void;
}

const initialValues: TagEditorSchemaType = {
  name: "",
};

export function TagEditorDialog(props: TagEditorDialogProps) {
  const { title, onSubmit, isLoading, tag, trigger, open, setOpen } = props;

  const { control, handleSubmit } = useForm<TagEditorSchemaType>({
    resolver: zodResolver(tagEditorSchema),
    defaultValues: initialValues,
    values: tag,
  });

  return (
    <>
      {React.cloneElement(trigger, { onClick: () => setOpen(true) })}
      <Dialog open={open} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers>
            <TagEditorBody control={control} isLoading={isLoading} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
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
}
