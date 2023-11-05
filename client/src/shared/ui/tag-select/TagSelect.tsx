import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface TagSelectProps {
  options: Tag[];
  isLoading: boolean;
  isError?: boolean;
  limit?: number;

  onChange: (tags: Tag[]) => void;
  value?: Tag[];
  onBlur: (e: any) => void;
  disabled?: boolean;
  name: string;
}

type Tag = {
  id: string;
  name: string;
};

const TagSelect: React.FC<TagSelectProps> = (props) => {
  const { options, limit, onChange, onBlur, value, name, disabled } = props;

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={(_, data) => {
        if (limit && data.length > limit) return;
        onChange(data);
      }}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField variant="standard" {...params} name={name} />
      )}
    />
  );
};

export default TagSelect;
