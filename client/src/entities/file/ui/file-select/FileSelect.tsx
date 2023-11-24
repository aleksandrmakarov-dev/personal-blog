import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import prettyBytes from "pretty-bytes";

interface FileUploaderProps {
  onChange: (file: File) => void;
  value?: File;
  disabled?: boolean;
}

export function FileSelect(props: FileUploaderProps) {
  const { onChange, value, disabled } = props;

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files.item(0);
      if (file) {
        onChange(file);
      }
    }
  };

  return (
    <>
      <label className="mb-2 block">
        <input
          className="hidden"
          disabled={disabled}
          type="file"
          onChange={onFileSelect}
        />
        <div className="hover:bg-gray-50 text-foreground-secondary border-2 rounded-sm border-gray-400 border-dashed p-2 flex flex-col items-center justify-center hover:cursor-pointer">
          <FileUploadRoundedIcon />
          <span className="mb-2 font-semibold">Select file to upload</span>
          <span className="text-sm">
            Supported formats:{" "}
            <span className="font-bold">.png, .jpg, .jpeg</span>
          </span>
          <span className="text-sm">
            Max file size: <span className="font-bold">5MB</span>
          </span>
        </div>
      </label>
      <div className="border border-gray-400 text-foreground-secondary rounded-sm p-2 flex items-center">
        <InsertDriveFileRoundedIcon className="mr-1" />
        <div>
          {value ? (
            <div>
              <p className="text-sm font-semibold">{value.name}</p>{" "}
              <p className="text-xs">({prettyBytes(value.size)})</p>
            </div>
          ) : (
            <span className="text-sm font-semibold">No file selected</span>
          )}
        </div>
      </div>
    </>
  );
}
