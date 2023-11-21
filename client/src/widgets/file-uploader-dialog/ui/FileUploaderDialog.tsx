import { FileItem, FileUploader } from "@/shared/ui/file-uploader";
import FormDialog from "@/shared/ui/form-dialog/FormDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export interface UploadedFile {
  url: string;
}

interface FileUploaderDialogProps {
  title: string;
  onSave: (files: UploadedFile[]) => void;
  trigger: JSX.Element;
}

export function FileUploaderDialog(props: FileUploaderDialogProps) {
  const { title, onSave, trigger } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    files: z.array(z.object({ url: z.string().url() })).min(1),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const { handleSubmit, control } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    onSave(data.files);
    console.log(data);
    setOpen(false);
  };

  return (
    <FormDialog
      open={open}
      trigger={trigger}
      title={title}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="files"
        render={({ field: { onChange } }) => (
          <FileUploader
            onUpload={(files: FileItem[]) =>
              onChange({
                files: files,
              })
            }
            setIsLoading={setIsLoading}
          />
        )}
      />
    </FormDialog>
  );
}
