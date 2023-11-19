import { useDeletePost } from "@/features/post";
import { Routing } from "@/shared/lib";
import FormDialog from "@/shared/ui/form-dialog/FormDialog";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteCurrentPostDialogProps {
  trigger: JSX.Element;
  id: string;
}

export function DeleteCurrentPostDialog(props: DeleteCurrentPostDialogProps) {
  const { trigger, id } = props;

  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending, isError, error, data, reset } = useDeletePost();
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        setOpen(false);
        navigate(Routing.posts.index);
      },
    });
  };

  return (
    <FormDialog
      trigger={trigger}
      open={open}
      reset={reset}
      setOpen={setOpen}
      title="Delete post"
      handleSubmit={onSubmit}
      isLoading={isPending}
      primaryButtonColor="error"
      primaryButtonName="Yes, delete post"
      secondaryButtonName="No, keep post"
      secondaryButtonColor="primary"
    >
      <>
        {isError && (
          <Alert className="mb-2" severity="error">
            {error.response?.data.message}
          </Alert>
        )}
        <p>
          Are you sure you want to delete this post?{" "}
          <span className="font-semibold">This action cannot be undone.</span>
        </p>
      </>
    </FormDialog>
  );
}
