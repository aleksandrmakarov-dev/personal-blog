import { FileDTO } from "@/services/file/fileService";
import { FileUploadDialog } from "@/widgets/file/file-upload-dialog";
import { Button } from "@mui/material";

export default function HomePage() {
  return (
    <div>
      <FileUploadDialog
        title="Upload image"
        trigger={<Button>Open dialog</Button>}
        onCallback={(file: FileDTO) => {
          console.log(file);
        }}
      />
    </div>
  );
}
