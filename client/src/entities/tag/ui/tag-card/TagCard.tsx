import { cn } from "@/shared/lib";
import { Button } from "@mui/material";
import { BookmarkAdd } from "@mui/icons-material";
import { TagDTO } from "@/services/tag/tagService";

interface TagCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: TagDTO;
}

export function TagCard(props: TagCardProps) {
  const { tag, className, ...other } = props;

  return (
    <div className={cn("border-b border-gray-200", className)} {...other}>
      <div className="mb-5 text-center">
        <h2 className="text-foreground-primary text-4xl font-semibold mb-3">
          {tag.name}
        </h2>
        <p className="text-foreground-secondary text-lg mb-2">
          Topic • 1,234,567 followers • {tag.postsCount} posts
        </p>
        <Button
          startIcon={<BookmarkAdd />}
          variant="contained"
          disableElevation
        >
          Follow
        </Button>
      </div>
    </div>
  );
}
