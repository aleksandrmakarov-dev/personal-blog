import { Button, Input, InputLabel, Select, TextField } from "@mui/material";

export function PostFilter() {
  return (
    <div>
      <h5 className="mb-2 font-semibold">Filter</h5>
      <form className="flex flex-col gap-3">
        <div>
          <InputLabel sx={{ fontSize: 14 }}>Search</InputLabel>
          <TextField size="small" fullWidth variant="standard" />
        </div>
        <div>
          <InputLabel sx={{ fontSize: 14 }}>Order by</InputLabel>
          <Select size="small" fullWidth variant="standard"></Select>
        </div>
        <Button variant="contained" size="small" disableElevation fullWidth>
          Filter
        </Button>
      </form>
    </div>
  );
}
