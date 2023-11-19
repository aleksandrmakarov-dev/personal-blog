import {
  TagEditorBody,
  TagEditorSchemaType,
  tagEditorSchema,
} from "../tag-editor-body/TagEditorBody";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FormDialog from "@/shared/ui/form-dialog/FormDialog";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { Alert } from "@mui/material";

interface TagEditorDialogProps {
  trigger: JSX.Element;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorModelDTO;
  isSuccess?: boolean;
  tag?: TagEditorSchemaType;

  onSubmit: (
    values: TagEditorSchemaType,
    reset: () => void,
    close: () => void
  ) => void;
}

const initialValues: TagEditorSchemaType = {
  name: "",
};

export function TagEditorDialog(props: TagEditorDialogProps) {
  const { title, onSubmit, isLoading, tag, trigger, isError, error } = props;

  const [open, setOpen] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<TagEditorSchemaType>({
    resolver: zodResolver(tagEditorSchema),
    defaultValues: initialValues,
    values: tag,
  });

  const close = () => setOpen(false);

  return (
    <FormDialog
      title={title}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      reset={reset}
      handleSubmit={handleSubmit((values) => onSubmit(values, reset, close))}
      isLoading={isLoading}
    >
      <>
        {isError && (
          <Alert severity="error" className="mb-2">
            {error?.message}
          </Alert>
        )}
        <TagEditorBody control={control} isLoading={isLoading} />
      </>
    </FormDialog>
  );
}
