import { Button, MenuItem, Select, TextField } from "@mui/material";

export function PostsFilter() {
  return (
    <div className="mt-3.5 mb-2">
      <form>
        <div className="grid grid-cols-[7fr_3fr_auto] gap-5 items-center">
          <TextField
            placeholder="Search"
            size="small"
            fullWidth
            variant="standard"
          />
          <Select size="small" variant="standard" label="Order By">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Button variant="contained" size="small" disableElevation>
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
}
