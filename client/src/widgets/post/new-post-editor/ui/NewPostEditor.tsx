import { PostEditor, PostEditorSchemaType } from "@/entities/post";
import { useCreatePost } from "@/features/post";
import { Routing } from "@/shared/lib";
import Header from "@/shared/ui/header/Header";
import { Alert, AlertTitle } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export function NewPostEditor() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useCreatePost();
  const navigate = useNavigate();

  const onSubmit = async (values: PostEditorSchemaType) => {
    mutate(
      {
        ...values,
        parent: values.parent?.id || null,
        tags: values.tags.map((tag) => tag.id),
      },
      {
        onSuccess: (data) => {
          navigate(Routing.posts.slug(data.slug));
        },
      }
    );
  };

  return (
    <>
      <Header value="Create new post" />
      {isSuccess && (
        <Alert className="mb-2">
          <AlertTitle>Post created successfully</AlertTitle>
          To see the created post{" "}
          <NavLink
            className="underline font-semibold"
            to={Routing.posts.slug(data.slug)}
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
