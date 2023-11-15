import { TagEditorDialog, TagEditorSchemaType } from "@/entities/tag";
import { useCreateTag } from "@/features/tag";

interface NewTagEditorDialogProps {
  trigger: JSX.Element;
}

export function NewTagEditorDialog(props: NewTagEditorDialogProps) {
  const { trigger } = props;

  const { mutate, isError, isPending, isSuccess } = useCreateTag();

  const onSubmit = (
    values: TagEditorSchemaType,
    reset: () => void,
    close: () => void
  ) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  return (
    <TagEditorDialog
      trigger={trigger}
      title="Create tag"
      isError={isError}
      isLoading={isPending}
      isSuccess={isSuccess}
      onSubmit={onSubmit}
    />
  );
}
