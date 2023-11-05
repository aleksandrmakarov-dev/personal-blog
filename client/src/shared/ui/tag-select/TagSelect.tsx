import {
  Autocomplete,
  Checkbox,
  FormHelperText,
  TextField,
} from "@mui/material";
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
    <div>
      <Autocomplete
        className="mb-2"
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
      <FormHelperText sx={{ textAlign: "end" }}>
        <b>{value?.length}</b> of <b>{limit}</b> tags selected
      </FormHelperText>
    </div>
  );
};

export default TagSelect;
