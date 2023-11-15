import FormField from "@/shared/ui/form-field/FormField";
import { Input } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";

export const tagEditorSchema = z.object({
  name: z.string().min(1).max(50),
});

export type TagEditorSchemaType = z.infer<typeof tagEditorSchema>;

interface TagEditorBodyProps {
  control: Control<TagEditorSchemaType>;
  isLoading?: boolean;
}

export function TagEditorBody(props: TagEditorBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <Controller
        control={control}
        name="name"
        disabled={isLoading}
        render={({ field, fieldState: { error } }) => (
          <FormField label="Name" error={error}>
            <Input {...field} fullWidth />
          </FormField>
        )}
      />
    </>
  );
}
