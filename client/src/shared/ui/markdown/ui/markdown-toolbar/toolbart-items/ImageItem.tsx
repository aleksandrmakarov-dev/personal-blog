import { IconButton } from "@mui/material";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { FileUploadDialog } from "@/widgets/file";
import SquareIconButton from "@/shared/ui/square-icon-button/SquareIconButton";

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
        <SquareIconButton size="small" title="Image">
          <ImageRoundedIcon fontSize="small" />
        </SquareIconButton>
      }
      title="Upload Image"
      onCallback={(file) => {
        addMarkdown(`![{placeholder}](${file.url})`, "Image");
      }}
    />
  );
}
