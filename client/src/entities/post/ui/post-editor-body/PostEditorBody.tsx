import FormField from "@/shared/ui/form-field/FormField";
import MarkdownEditor from "@/shared/ui/markdown/markdown-editor/MarkdownEditor";
import { PostTagSelect } from "@/widgets/post";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";

export const postEditorSchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().optional(),
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

interface PostEditorBodyProps {
  control: Control<PostEditorSchemaType>;
  isLoading?: boolean;
}

export function PostEditorBody(props: PostEditorBodyProps) {
  const { control, isLoading } = props;
  return (
    <>
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
      />
    </>
  );
}
