import { useTags } from "@/entities/tag";
import { Routing } from "@/shared/lib";
import { Alert, AlertTitle, Chip } from "@mui/material";

export function PopularTags() {
  const { data, isLoading, isError, error } = useTags({
    page: 1,
    limit: 8,
    orderBy: "popular",
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    return (
      <Alert severity="error">
        <AlertTitle>Error loading popular tags</AlertTitle>
        {error.response?.data.message}
      </Alert>
    );

  return (
    <div>
      <h5 className="mb-2 font-semibold">Popular topics</h5>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {data && data.meta.itemsCount > 0 ? (
          data.items.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              component="a"
              sx={{ fontSize: "0.875rem" }}
              variant="filled"
              href={Routing.tags.slug(tag.slug)}
              clickable
            />
          ))
        ) : (
          <p>No tags found</p>
        )}
      </div>
    </div>
  );
}
