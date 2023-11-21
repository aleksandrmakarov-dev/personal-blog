import { useAuth } from "@/providers/AuthProvider";
import { FileUploaderDialog } from "@/widgets/file-uploader-dialog";
import { Button } from "@mui/material";

export default function HomePage() {
  const { currentUser } = useAuth();
  return (
    <div className="max-w-md">
      <FileUploaderDialog
        trigger={<Button>Upload files</Button>}
        title="Upload post preview"
        onSave={(files) => console.log(files)}
      />
    </div>
  );
}
