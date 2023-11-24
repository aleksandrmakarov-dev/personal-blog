import { IconButton } from "@mui/material";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { FileUploadDialog } from "@/widgets/file";

interface BasicItmProps {
  addMarkdown: (
    syntax: string,
    defaultValue: string,
    newline?: boolean
  ) => void;
}

export function ImageItem(props: BasicItmProps) {
  const { addMarkdown } = props;

  return (
    <FileUploadDialog
      trigger={
        <IconButton title="Image">
          <ImageRoundedIcon />
        </IconButton>
      }
      title="Upload Image"
      onCallback={(file) => {
        addMarkdown(`![{placeholder}](${file.url})`, "Image");
      }}
    />
  );
}
