import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  PostEditorBody,
  PostEditorSchemaType,
  postEditorSchema,
} from "../post-editor-body/PostEditorBody";
import { useNavigate } from "react-router-dom";
import { DeleteCurrentPostDialog } from "@/widgets/post";
import { PostDTO } from "@/services/post/postService";

interface PostEditorProps {
  post?: PostDTO;
  onSubmit: (values: PostEditorSchemaType) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  edit?: boolean;
}

const initialPost: PostEditorSchemaType = {
  title: "",
  description: "",
  body: "",
  image: null,
  tags: [],
};

export function PostEditor(props: PostEditorProps) {
  const { post, onSubmit, isLoading, edit } = props;

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<PostEditorSchemaType>({
    resolver: zodResolver(postEditorSchema),
    defaultValues: initialPost,
    values: post ? post : initialPost,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <PostEditorBody control={control} isLoading={isLoading} />
      <div className="flex items-center gap-x-2">
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          disableElevation
        >
          {edit ? "Save changes" : "Create"}
        </LoadingButton>
        {edit && post && (
          <DeleteCurrentPostDialog
            id={post.id}
            trigger={
              <Button color="error" variant="contained" disableElevation>
                Delete
              </Button>
            }
          />
        )}
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </div>
    </form>
  );
}
