import { useTags } from "@/entities/tag";
import { Chip } from "@mui/material";

export function PopularTopics() {
  const { data, isLoading, isError } = useTags();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <div>
      <h5 className="mb-2 font-semibold">Popular topics</h5>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {data && data.length > 0 ? (
          data
            .slice(0, 8)
            .map(({ id, name }) => (
              <Chip key={id} label={name} size="small" variant="filled" />
            ))
        ) : (
          <p>No tags found</p>
        )}
      </div>
    </div>
  );
}
