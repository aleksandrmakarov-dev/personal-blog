import { cn } from "@/shared/lib";
import { Button } from "@mui/material";
import { BookmarkAdd } from "@mui/icons-material";

interface TagCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  slug: string;
}

export function TagCard(props: TagCardProps) {
  const { title, slug, className, ...other } = props;

  return (
    <div className={cn("border-b border-gray-200", className)} {...other}>
      <div className="mb-5 text-center">
        <h2 className="text-foreground-primary text-4xl font-semibold mb-3">
          {title}
        </h2>
        <p className="text-foreground-secondary text-lg mb-2">
          Topic • 1,234,567 followers • 123 posts
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
