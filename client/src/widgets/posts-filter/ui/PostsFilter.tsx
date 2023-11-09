import { Button, Select, TextField } from "@mui/material";
import FormField from "../../../shared/ui/form-field/FormField";

export function PostsFilter() {
  return (
    <div>
      <h5 className="mb-2 font-semibold">Filter</h5>
      <form className="flex flex-col gap-3">
        <FormField label="Search" labelFontSize={14}>
          <TextField size="small" fullWidth variant="standard" />
        </FormField>
        <FormField label="Order by" labelFontSize={14}>
          <Select size="small" fullWidth variant="standard"></Select>
        </FormField>
        <Button variant="contained" size="small" disableElevation fullWidth>
          Filter
        </Button>
      </form>
    </div>
  );
}
