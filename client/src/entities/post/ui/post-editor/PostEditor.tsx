import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "../../../../shared/ui/form-field/FormField";
import MarkdownEditor from "../../../../shared/ui/markdown/markdown-editor/MarkdownEditor";
import { LoadingButton } from "@mui/lab";
import { PostTagSelect } from "../../../../widgets/post-tag-select";

interface PostEditorProps {
  post?: PostEditorSchemaType;
  onSubmit: (values: PostEditorSchemaType) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

const postEditorSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(150),
  body: z.string().min(1),
  image: z.string().url().optional(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1),
});

export type PostEditorSchemaType = z.infer<typeof postEditorSchema>;

const initialPost: PostEditorSchemaType = {
  title: "",
  description: "",
  body: "",
  image: "",
  tags: [],
};

export function PostEditor(props: PostEditorProps) {
  const { post, onSubmit, isLoading } = props;

  const { control, handleSubmit } = useForm<PostEditorSchemaType>({
    resolver: zodResolver(postEditorSchema),
    defaultValues: initialPost,
    values: post,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        control={control}
        disabled={isLoading}
        name="title"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Title" error={error}>
            <TextField size="small" fullWidth variant="standard" {...field} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Description" error={error}>
            <TextField
              size="small"
              fullWidth
              variant="standard"
              {...field}
              multiline
              rows={3}
            />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="image"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Image" error={error}>
            <TextField size="small" fullWidth variant="standard" {...field} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="body"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Body" error={error}>
            <MarkdownEditor {...field} rows={25} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="tags"
        render={({
          field: { onChange: onSelectTag, ref, ...other },
          fieldState: { error },
        }) => (
          <FormField label="Tags" error={error}>
            <PostTagSelect onSelectTag={onSelectTag} {...other} />
          </FormField>
        )}
      ></Controller>
      <LoadingButton
        loading={isLoading}
        className="self-start"
        type="submit"
        variant="contained"
        disableElevation
      >
        Submit
      </LoadingButton>
    </form>
  );
}
