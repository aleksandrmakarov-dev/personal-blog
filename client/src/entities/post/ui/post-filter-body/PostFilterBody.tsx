import { MenuItem, Select, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";

export const postFilterSchema = z.object({
  query: z.string().optional(),
  orderBy: z.string().optional(),
});

export type PostFilterSchemaType = z.infer<typeof postFilterSchema>;

const options: { name: string; value: string }[] = [
  {
    name: "Recent",
    value: "recent",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Popular",
    value: "popular",
  },
];

interface PostFilterBodyProps {
  control: Control<PostFilterSchemaType>;
  isLoading?: boolean;
}

export function PostFilterBody(props: PostFilterBodyProps) {
  const { control, isLoading } = props;

  return (
    <>
      <Controller
        control={control}
        name="query"
        disabled={isLoading}
        render={({ field }) => (
          <TextField {...field} placeholder="Search" size="small" fullWidth />
        )}
      />
      <Controller
        control={control}
        name="orderBy"
        disabled={isLoading}
        render={({ field }) => (
          <Select {...field} size="small">
            {options.map((option: { name: string; value: string }) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </>
  );
}
