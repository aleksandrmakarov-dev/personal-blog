import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { FileItem, FileUploaderItem } from "./FileUploaderItem";
import { ChangeEvent, useRef, useState } from "react";
import { Divider } from "@mui/material";

interface FileUploaderProps {
  multiple?: boolean;
  onUpload: (files: FileItem[]) => void;
  setIsLoading: (value: boolean) => void;
}

export function FileUploader(props: FileUploaderProps) {
  const { setIsLoading } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileItem[]>([]);

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const file = files.item(0);

    if (!file) {
      return;
    }

    const fileItem: FileItem = {
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
    };

    setFiles((prev) => [...prev, fileItem]);

    setIsLoading(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-foreground-secondary text-xs">Max file size: 5Mb</p>
        <p className="text-foreground-secondary text-xs">
          Supported formats: .jpg, .jpeg, .png, .gif
        </p>
      </div>
      <input
        type="file"
        id="myfile"
        name="myfile"
        className="hidden"
        ref={inputRef}
        onChange={onFileSelect}
      />
      <label htmlFor="myfile">
        <button
          type="button"
          className="border rounded-sm border-foreground-secondary w-full px-2 py-3 border-dashed mb-3 hover:bg-gray-50 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <span className="flex items-center justify-center">
            <UploadFileRoundedIcon className="text-foreground-secondary" />
            <span className="text-sm font-semibold text-foreground-secondary">
              <span>Upload</span>
              <span> - </span>
              <span className="text-primary-600 underline">Choose File</span>
            </span>
          </span>
        </button>
      </label>
      <div className="flex flex-col gap-1">
        {files.map((file, i) => (
          <>
            <FileUploaderItem key={`${file.name}-item`} file={file} />
            {i !== files.length - 1 && <Divider key={`${file.name}-divider`} />}
          </>
        ))}
      </div>
    </div>
  );
}
