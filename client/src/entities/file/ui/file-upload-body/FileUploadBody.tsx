import { Control, Controller } from "react-hook-form";
import { z } from "zod";
import { FileSelect } from "../file-select/FileSelect";

export const fileUploadSchema = z.object({
  file: z.custom<File>((file) => file instanceof File),
});

export type FileUploadSchemaType = z.infer<typeof fileUploadSchema>;

interface FileUploadBodyProps {
  control: Control<FileUploadSchemaType>;
  isLoading?: boolean;
}

export function FileUploadBody(props: FileUploadBodyProps) {
  const { control, isLoading } = props;

  return (
    <Controller
      control={control}
      name="file"
      disabled={isLoading}
      render={({ field: { onChange, value, disabled } }) => (
        <FileSelect onChange={onChange} value={value} disabled={disabled} />
      )}
    />
  );
}
