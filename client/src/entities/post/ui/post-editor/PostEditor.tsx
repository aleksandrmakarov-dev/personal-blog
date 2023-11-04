import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormHelperText, InputLabel, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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
  tags: z.array(z.string()).optional(),
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
          <div>
            <InputLabel>Title</InputLabel>
            <TextField size="small" fullWidth variant="standard" {...field} />
            <FormHelperText error={error !== undefined}>
              {error?.message}
            </FormHelperText>
          </div>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <div>
            <InputLabel>Description</InputLabel>
            <TextField
              size="small"
              fullWidth
              variant="standard"
              {...field}
              multiline
              rows={3}
            />
            <FormHelperText error={error !== undefined}>
              {error?.message}
            </FormHelperText>
          </div>
        )}
      />
      <Controller
        control={control}
        name="body"
        render={({ field, fieldState: { error } }) => (
          <div>
            <InputLabel>Body</InputLabel>
            <TextField
              size="small"
              fullWidth
              variant="standard"
              {...field}
              multiline
              rows={25}
            />
            <FormHelperText error={error !== undefined}>
              {error?.message}
            </FormHelperText>
          </div>
        )}
      />
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
