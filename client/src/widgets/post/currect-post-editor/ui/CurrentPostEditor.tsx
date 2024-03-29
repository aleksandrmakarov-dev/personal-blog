import { PostEditor, PostEditorSchemaType, usePost } from "@/entities/post";
import { useUpdatePost } from "@/features/post";
import { Routing } from "@/shared/lib";
import Header from "@/shared/ui/header/Header";
import { Alert, AlertTitle } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

export function CurrentPostEditor() {
  const { postSlug } = useParams();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = usePost(postSlug!);

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
          window.scrollTo(0, 0);
        },
      }
    );
  };

  return (
    <>
      <Header value="Update post" />
      {isUpdateSuccess && (
        <Alert className="mb-2">
          <AlertTitle>Post updated successfully</AlertTitle>
          To see the updated post{" "}
          <NavLink
            className="underline font-semibold"
            to={Routing.posts.slug(updateData.slug)}
          >
            Click here
          </NavLink>
        </Alert>
      )}
      {isPostError && (
        <Alert className="mb-2" severity="error">
          <AlertTitle>Error while loading post data</AlertTitle>
          {postError.response?.data.message}
        </Alert>
      )}
      {isUpdateError && (
        <Alert className="mb-2" severity="error">
          <AlertTitle>Error while updating post</AlertTitle>
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
