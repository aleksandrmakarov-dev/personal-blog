import { PostEditor, PostEditorSchemaType, usePost } from "@/entities/post";
import { useUpdatePost } from "@/features/post";
import { Routing } from "@/shared/lib";
import { Alert } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

export function CurrentPostEditor() {
  const { slug } = useParams();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = usePost(slug!);

  const {
    mutate,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess,
    data: updateData,
  } = useUpdatePost();

  const onSubmit = async (values: PostEditorSchemaType) => {
    const dataToUpdate = {
      ...values,
      tags: values.tags.map((tag) => tag.id),
    };

    mutate(
      {
        id: post!.id,
        post: dataToUpdate,
      },
      {
        onSuccess: () => {
          // do something like navigate to post page
        },
      }
    );
  };

  return (
    <>
      <h1 className="text-4xl font-semibold mb-5">Update post</h1>
      {isUpdateSuccess && (
        <Alert className="mb-2">
          Post updated successfully!{" "}
          <NavLink
            className="underline font-semibold"
            to={Routing.posts.details(updateData.slug)}
          >
            Click here
          </NavLink>
        </Alert>
      )}
      {isPostError && (
        <Alert className="mb-2" severity="error">
          {postError.response?.data.message}
        </Alert>
      )}
      {isUpdateError && (
        <Alert className="mb-2" severity="error">
          {updateError.response?.data.message}
        </Alert>
      )}
      <PostEditor
        post={post}
        isLoading={isPostLoading}
        isError={isPostError}
        onSubmit={onSubmit}
        edit
      />
    </>
  );
}