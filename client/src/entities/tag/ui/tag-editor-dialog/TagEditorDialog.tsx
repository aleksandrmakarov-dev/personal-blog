import {
  TagEditorBody,
  TagEditorSchemaType,
  tagEditorSchema,
} from "../tag-editor-body/TagEditorBody";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FormDialog from "@/shared/ui/form-dialog/FormDialog";

interface TagEditorDialogProps {
  trigger: JSX.Element;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
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
  const { title, onSubmit, isLoading, tag, trigger } = props;

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
      <TagEditorBody control={control} isLoading={isLoading} />
    </FormDialog>
  );
}
