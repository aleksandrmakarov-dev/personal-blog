import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

interface RouterPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  baseUrl: string;
  totalPages: number;
  page: number;
  totalItems: number;
  limit: number;
}

const RouterPagination = (props: RouterPaginationProps) => {
  const { baseUrl, page, totalItems, totalPages, limit } = props;

  const from = (page - 1) * limit;
  const possibleTo = from + limit;
  const to = possibleTo > totalItems ? totalItems : possibleTo;

  return (
    <div {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-secondary">
            Showing{" "}
            <span className="font-semibold text-foreground-primary">
              {from}{" "}
            </span>
            to{" "}
            <span className="font-semibold text-foreground-primary">{to} </span>
            of{" "}
            <span className="font-semibold text-foreground-primary">
              {totalItems}{" "}
            </span>
            results
          </p>
        </div>
        <Pagination
          count={totalPages}
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
