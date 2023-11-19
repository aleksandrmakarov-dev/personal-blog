import {
  PostFilterBody,
  PostFilterSchemaType,
  postFilterSchema,
} from "@/entities/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

export function PostsFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { control, handleSubmit, reset } = useForm<PostFilterSchemaType>({
    resolver: zodResolver(postFilterSchema),
    defaultValues: {
      query: "",
      orderBy: "recent",
    },
    values: {
      query: searchParams.get("query") || "",
      orderBy: searchParams.get("orderBy") || "recent",
    },
  });

  const onSubmit = (data: PostFilterSchemaType) => {
    if (data.query) {
      searchParams.set("query", data.query);
    }
    if (data.orderBy) {
      searchParams.set("orderBy", data.orderBy);
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  const onReset = () => {
    reset();
    navigate({
      search: "",
    });
  };

  return (
    <div className="mt-3.5 mb-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[7fr_3fr_auto] gap-5 items-center">
          <PostFilterBody control={control} isLoading={false} />
          <div className="flex items-center gap-2">
            <Button onClick={onReset}>Clear</Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disableElevation
            >
              Filter
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
