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

interface PostEditorProps {
  post?: PostEditorSchemaType;
  onSubmit: (values: PostEditorSchemaType) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

const initialPost: PostEditorSchemaType = {
  title: "",
  description: "",
  body: "",
  image: "",
  tags: [],
};

export function PostEditor(props: PostEditorProps) {
  const { post, onSubmit, isLoading } = props;

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<PostEditorSchemaType>({
    resolver: zodResolver(postEditorSchema),
    defaultValues: initialPost,
    values: post,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <PostEditorBody control={control} isLoading={isLoading} />
      <div className="flex items-center justify-end gap-x-2">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <LoadingButton
          loading={isLoading}
          className="self-start"
          type="submit"
          variant="contained"
          disableElevation
        >
          Submit
        </LoadingButton>
      </div>
    </form>
  );
}
