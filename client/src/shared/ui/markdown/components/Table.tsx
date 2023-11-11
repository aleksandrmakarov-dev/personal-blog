import {
  Table as MUITable,
  TableHead as MUITableHead,
  TableBody as MUITableBody,
  TableRow as MUITableRow,
  TableCell as MUITableCell,
  TableContainer,
  Paper,
} from "@mui/material";

export const Table = (props: any) => {
  const { node, ...other } = props;
  return (
    <TableContainer className="mb-5" component={Paper}>
      <MUITable {...other} />
    </TableContainer>
  );
};

export const TableHead = (props: any) => {
  const { node, ...other } = props;
  return <MUITableHead {...other} />;
};

export const TableBody = (props: any) => {
  const { node, ...other } = props;
  return <MUITableBody {...other} />;
};

export const TableRow = (props: any) => {
  const { node, ...other } = props;
  return <MUITableRow {...other} />;
};

export const TableCell = (props: any) => {
  const { node, ...other } = props;
  return <MUITableCell {...other} />;
};
