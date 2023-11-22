import { TagEditorDialog, TagEditorSchemaType, tagKeys } from "@/entities/tag";
import { useCreateTag } from "@/features/tag";
import { TagDTO } from "@/services/tag/tagService";
import { useQueryClient } from "@tanstack/react-query";

interface NewTagEditorDialogProps {
  trigger: JSX.Element;
}

export function NewTagEditorDialog(props: NewTagEditorDialogProps) {
  const { trigger } = props;

  const { mutate, isError, error, isPending, isSuccess } = useCreateTag();
  const queryClient = useQueryClient();

  const onSubmit = (
    values: TagEditorSchemaType,
    reset: () => void,
    close: () => void
  ) => {
    mutate(values, {
      onSuccess: (data) => {
        queryClient.cancelQueries({ queryKey: tagKeys.tags.query() });

        queryClient.setQueryData<TagDTO[]>(tagKeys.tags.query(), (prev) => {
          if (!prev) return prev;
          return [...prev, data];
        });
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
      error={error?.response?.data}
      isLoading={isPending}
      isSuccess={isSuccess}
      onSubmit={onSubmit}
    />
  );
}
