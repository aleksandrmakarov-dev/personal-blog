import {
  Autocomplete,
  Checkbox,
  FormHelperText,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { GenericErrorModelDTO } from "@/shared/lib/types";

export type TagSelectOption = {
  id: string;
  name: string;
};

interface TagSelectProps {
  options: TagSelectOption[];
  isLoading: boolean;
  isError?: boolean;
  error?: GenericErrorModelDTO;
  limit?: number;

  actions?: React.ReactNode;

  onSelectTag: (tags: TagSelectOption[]) => void;
  value?: TagSelectOption[];
  onBlur: (e: any) => void;
  disabled?: boolean;
  name: string;
}

export function TagSelect(props: TagSelectProps) {
  const {
    options,
    limit = 5,
    onSelectTag,
    onBlur,
    value,
    name,
    disabled,
    actions,
  } = props;

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
          onSelectTag(data);
        }}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        size="small"
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
        renderInput={(params) => <TextField {...params} name={name} />}
      />
      <FormHelperText sx={{ textAlign: "end" }}>
        <b>{value?.length}</b> of <b>{limit}</b> tags selected
      </FormHelperText>
    </div>
  );
}
