import { PostEditor, PostEditorSchemaType } from "@/entities/post";
import { useCreatePost } from "@/features/post";
import { Routing } from "@/shared/lib";
import { Alert, AlertTitle } from "@mui/material";
import { NavLink } from "react-router-dom";

export function NewPostEditor() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useCreatePost();

  const onSubmit = async (values: PostEditorSchemaType) => {
    mutate(
      {
        ...values,
        parent: values.parent?.id || null,
        tags: values.tags.map((tag) => tag.id),
      },
      {
        onSuccess: () => {
          // somehow reset form..
        },
      }
    );
  };

  return (
    <>
      <h1 className="text-4xl font-semibold mb-5">Create new post</h1>
      {isSuccess && (
        <Alert className="mb-2">
          <AlertTitle>Post created successfully</AlertTitle>
          To see the created post{" "}
          <NavLink
            className="underline font-semibold"
            to={Routing.posts.details(data.slug)}
          >
            Click here
          </NavLink>
        </Alert>
      )}
      {isError && (
        <Alert className="mb-2" severity="error">
          <AlertTitle>Error while creating post</AlertTitle>
          {error.response?.data.message}
        </Alert>
      )}
      <PostEditor onSubmit={onSubmit} isLoading={isPending} isError={isError} />
    </>
  );
}
