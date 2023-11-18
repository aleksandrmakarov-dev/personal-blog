import { PostEditor, PostEditorSchemaType } from "@/entities/post";
import { useCreatePost } from "@/features/post";
import { Routing } from "@/shared/lib";
import { mockPost } from "@/shared/lib/constants";
import { Alert } from "@mui/material";
import { NavLink } from "react-router-dom";

export function NewPostEditor() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useCreatePost();

  const onSubmit = async (values: PostEditorSchemaType) => {
    mutate(
      {
        ...values,
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
      {isSuccess && (
        <Alert className="mb-2">
          Post created successfully!{" "}
          <NavLink
            className="underline font-semibold"
            to={Routing.posts.details(data.slug)}
          >
            Click here
          </NavLink>
        </Alert>
      )}
      {isError && (
        <Alert className="mb-2">{error.response?.data.message}</Alert>
      )}
      <PostEditor
        post={{ ...mockPost }}
        onSubmit={onSubmit}
        isLoading={isPending}
        isError={isError}
      />
    </>
  );
}
