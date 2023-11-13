import { PostEditor } from "../../../entities/post";
import { PostEditorSchemaType } from "../../../entities/post/ui/post-editor/PostEditor";
import { useCreatePost } from "../../../features/post/create/api/createPost";
import { mockPost } from "../../../shared/lib/constants";

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
