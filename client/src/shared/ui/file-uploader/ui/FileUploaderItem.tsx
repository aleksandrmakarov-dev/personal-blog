import { Chip, CircularProgress, Divider, IconButton } from "@mui/material";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import prettyBytes from "pretty-bytes";

export interface FileItem {
  name: string;
  size: number;
  type: string;
  status: "uploading" | "done" | "error";
  error?: string;
}

interface FileUploaderItemProps {
  file: FileItem;
}

export function FileUploaderItem(props: FileUploaderItemProps) {
  const { file } = props;
  const { name, status, size, error } = file;

  return (
    <div className="w-full py-1 flex items-center justify-between">
      <div className="flex gap-2 items-center text-foreground-secondary">
        {status === "uploading" && <CircularProgress size={20} />}
        {status === "done" && (
          <TaskRoundedIcon color="success" sx={{ fontSize: 24 }} />
        )}
        {status === "error" && <UploadFileRoundedIcon sx={{ fontSize: 24 }} />}
        <p className="text-sm font-semibold">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        {status === "error" && (
          <Chip
            sx={{
              fontSize: 12,
              fontWeight: 500,
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
            }}
            size="small"
            variant="filled"
            label={error}
          />
        )}
        {status !== "error" && (
          <Chip
            sx={{ fontSize: 12, fontWeight: 500 }}
            size="small"
            variant="filled"
            label={prettyBytes(size)}
          />
        )}
        <Divider orientation="vertical" flexItem />
        <IconButton size="small">
          <CloseRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </div>
    </div>
  );
}
