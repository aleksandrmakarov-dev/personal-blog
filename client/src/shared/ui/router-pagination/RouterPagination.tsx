import { Pagination } from "@mui/material";

const RouterPagination = () => {
  return (
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
      <Pagination count={10} page={1} shape="rounded" />
    </div>
  );
};

export default RouterPagination;
