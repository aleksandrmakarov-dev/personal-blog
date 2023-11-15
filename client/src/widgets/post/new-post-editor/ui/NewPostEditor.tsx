import { PostEditor, PostEditorSchemaType } from "@/entities/post";
import { useCreatePost } from "@/features/post";
import { mockPost } from "@/shared/lib/constants";

export function NewPostEditor() {
  const { mutateAsync, isPending, isError } = useCreatePost();

  const onSubmit = async (values: PostEditorSchemaType) => {
    await mutateAsync({
      ...values,
      tags: values.tags.map((tag) => tag.id),
    });
  };

  return (
    <PostEditor
      post={{ ...mockPost }}
      onSubmit={onSubmit}
      isLoading={isPending}
      isError={isError}
    />
  );
}
