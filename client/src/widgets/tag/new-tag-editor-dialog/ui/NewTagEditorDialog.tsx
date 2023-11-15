import { TagEditorDialog, TagEditorSchemaType } from "@/entities/tag";
import { useCreateTag } from "@/features/tag";
import { useState } from "react";

interface NewTagEditorDialogProps {
  trigger: JSX.Element;
}

export function NewTagEditorDialog(props: NewTagEditorDialogProps) {
  const { trigger } = props;

  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isError, isPending, isSuccess } = useCreateTag();

  const onSubmit = (values: TagEditorSchemaType) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <TagEditorDialog
      trigger={trigger}
      title="Create tag"
      open={open}
      setOpen={setOpen}
      isError={isError}
      isLoading={isPending}
      isSuccess={isSuccess}
      onSubmit={onSubmit}
    />
  );
}
