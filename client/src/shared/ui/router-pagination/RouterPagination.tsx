import { Pagination, PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface RouterPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  baseUrl: string;
  count: number;
}

const RouterPagination = (props: RouterPaginationProps) => {
  const { baseUrl, count } = props;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  return (
    <div {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-secondary">
            Showing{" "}
            <span className="font-semibold text-foreground-primary">1</span> to{" "}
            <span className="font-semibold text-foreground-primary">10</span> of{" "}
            <span className="font-semibold text-foreground-primary">97</span>{" "}
            results
          </p>
        </div>
        <Pagination
          count={count}
          page={page}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${baseUrl}?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default RouterPagination;
