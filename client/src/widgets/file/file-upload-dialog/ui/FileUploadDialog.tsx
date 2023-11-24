import {
  FileUploadBody,
  FileUploadSchemaType,
  fileUploadSchema,
} from "@/entities/file";
import { useUploadFile } from "@/features/file";
import { FileDTO } from "@/services/file/fileService";
import FormDialog from "@/shared/ui/form-dialog/FormDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FileUploadDialogProps {
  trigger: JSX.Element;
  title: string;
  onCallback: (file: FileDTO) => void;
}

export function FileUploadDialog(props: FileUploadDialogProps) {
  const { title, trigger, onCallback } = props;
  const [open, setOpen] = useState<boolean>(false);

  const {
    mutate,
    isPending,
    isError,
    error,
    reset: mutationReset,
  } = useUploadFile();

  const {
    handleSubmit,
    control,
    reset: formReset,
  } = useForm<FileUploadSchemaType>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = (data: FileUploadSchemaType) => {
    mutate(data.file, {
      onSuccess: (data) => {
        onCallback(data);
        reset();
        setOpen(false);
      },
    });
  };

  const reset = () => {
    formReset();
    mutationReset();
  };

  return (
    <FormDialog
      title={title}
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      primaryButtonName="Upload"
      handleSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      reset={reset}
    >
      <>
        {isError && (
          <Alert className="mb-2" severity="error">
            {error?.response?.data.message}
          </Alert>
        )}
        <FileUploadBody control={control} isLoading={isPending} />
      </>
    </FormDialog>
  );
}
