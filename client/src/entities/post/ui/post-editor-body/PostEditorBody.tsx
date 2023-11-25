import FormField from "@/shared/ui/form-field/FormField";
import { PostTagSelect } from "@/widgets/post";
import { Button, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";
import { PostParentSelect } from "../..";
import { MarkdownEditor } from "@/shared/ui/markdown";
import { FileDTO } from "@/services/file/fileService";
import { FileUploadDialog } from "@/widgets/file";

export const postEditorSchema = z.object({
  parent: z
    .object({
      id: z.string().min(1),
      title: z.string().min(1),
    })
    .nullable(),
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().nullable(),
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
        name="parent"
        render={({
          field: { onChange: onSelectParent, ref, ...other },
          fieldState: { error },
        }) => (
          <FormField label="Parent" error={error}>
            <PostParentSelect onSelectParent={onSelectParent} {...other} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="title"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Title" required error={error}>
            <TextField size="small" fullWidth {...field} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Description" required error={error}>
            <TextField size="small" fullWidth {...field} multiline rows={3} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="image"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Preview image" error={error}>
            <div className="flex gap-3">
              <TextField
                size="small"
                fullWidth
                {...field}
                inputProps={{ readOnly: true }}
              />
              <FileUploadDialog
                title="Upload image"
                trigger={<Button>Upload</Button>}
                onCallback={(file: FileDTO) => {
                  field.onChange(file.url);
                }}
              />
            </div>
          </FormField>
        )}
      />
      <Controller
        control={control}
        disabled={isLoading}
        name="body"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <FormField label="Content" required error={error}>
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
          <FormField label="Tags" required error={error}>
            <PostTagSelect onSelectTag={onSelectTag} {...other} />
          </FormField>
        )}
      />
    </>
  );
}
