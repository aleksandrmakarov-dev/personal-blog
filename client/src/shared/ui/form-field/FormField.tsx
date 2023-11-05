import { FormHelperText, InputLabel } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  label: string;
  labelFontSize?: number;
  error?: FieldError;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, children, error, labelFontSize = 16 } = props;

  return (
    <div>
      <InputLabel className="mb-1" sx={{ fontSize: labelFontSize }}>
        {label}
      </InputLabel>
      {children}
      <FormHelperText error={error !== undefined}>
        {error?.message}
      </FormHelperText>
    </div>
  );
};

export default FormField;
