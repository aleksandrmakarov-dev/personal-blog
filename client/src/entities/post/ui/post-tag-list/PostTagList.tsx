import { TagDTO } from "@/services/tag/tagService";
import { Chip } from "@mui/material";

interface PostTagListProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: TagDTO[];
}

export function PostTagList(props: PostTagListProps) {
  const { tags, ...other } = props;

  return (
    <div {...other}>
      <h5 className="text-lg font-semibold mb-3">Tags</h5>
      <div className=" flex items-center gap-2">
        {tags.map((tag) => (
          <Chip key={tag.id} label={tag.name} />
        ))}
      </div>
    </div>
  );
}
