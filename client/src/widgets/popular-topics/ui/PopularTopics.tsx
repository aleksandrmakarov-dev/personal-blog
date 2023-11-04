import { Chip } from "@mui/material";
import { mockTags } from "../../../shared/lib/constants";

export function PopularTopics() {
  const tags = mockTags;
  return (
    <div>
      <h5 className="mb-2 font-semibold">Popular topics</h5>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {tags.map(({ id, name }) => (
          <Chip key={id} label={name} size="small" variant="filled" />
        ))}
      </div>
    </div>
  );
}
