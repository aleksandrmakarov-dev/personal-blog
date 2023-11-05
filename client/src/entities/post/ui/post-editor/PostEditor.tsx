import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "../../../../shared/ui/form-field/FormField";
import { mockTags } from "../../../../shared/lib/constants";
import TagSelect from "../../../../shared/ui/tag-select/TagSelect";

interface PostEditorProps {
  post?: EditorPostSchemaType;
  onSubmit: (values: EditorPostSchemaType) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

const editorPostSchema = z.object({
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
    .optional(),
});

type EditorPostSchemaType = z.infer<typeof editorPostSchema>;

const initialPost: EditorPostSchemaType = {
  title: "",
  description: "",
  body: "",
  image: "",
  tags: [],
};

export function PostEditor(props: PostEditorProps) {
  const { post, onSubmit } = props;

  const { control, handleSubmit } = useForm<EditorPostSchemaType>({
    resolver: zodResolver(editorPostSchema),
    defaultValues: initialPost,
    values: post,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Title" error={error}>
            <TextField size="small" fullWidth variant="standard" {...field} />
          </FormField>
        )}
      />
      <Controller
        control={control}
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
        name="body"
        render={({ field, fieldState: { error } }) => (
          <FormField label="Body" error={error}>
            <TextField
              size="small"
              fullWidth
              variant="standard"
              {...field}
              multiline
              rows={25}
            />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="tags"
        render={({ field: { ref, ...props }, fieldState: { error } }) => (
          <FormField label="Tags" error={error}>
            <TagSelect
              options={mockTags}
              isLoading={false}
              limit={5}
              {...props}
            />
          </FormField>
        )}
      ></Controller>
      <Button
        className="self-start"
        type="submit"
        variant="contained"
        disableElevation
      >
        Submit
      </Button>
    </form>
  );
}
