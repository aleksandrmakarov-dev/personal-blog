import { Pagination, PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface RouterPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  limit: number;
  pagesCount: number;
  itemsCount: number;
}

const RouterPagination = (props: RouterPaginationProps) => {
  const { page, limit, pagesCount, itemsCount, ...other } = props;
  const location = useLocation();

  const currentSearchParams = new URLSearchParams(location.search);
  const from = (page - 1) * limit;
  const possibleTo = from + limit;
  const to = possibleTo > itemsCount ? itemsCount : possibleTo;

  return (
    <div {...other}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-secondary">
            Showing{" "}
            <span className="font-semibold text-foreground-primary">
              {from + 1}{" "}
            </span>
            to{" "}
            <span className="font-semibold text-foreground-primary">{to} </span>
            of{" "}
            <span className="font-semibold text-foreground-primary">
              {itemsCount}{" "}
            </span>
            results
          </p>
        </div>
        <Pagination
          count={pagesCount}
          page={page}
          shape="rounded"
          renderItem={(item) => {
            const page = item.page || 1;
            currentSearchParams.set("page", page.toString());
            const url = `${
              location.pathname
            }?${currentSearchParams.toString()}`;

            return <PaginationItem component={Link} to={url} {...item} />;
          }}
        />
      </div>
    </div>
  );
};

export default RouterPagination;
