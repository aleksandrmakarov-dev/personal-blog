import { FormHelperText, InputLabel } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, children, error } = props;

  return (
    <div>
      <InputLabel className="mb-1">{label}</InputLabel>
      {children}
      <FormHelperText error={error !== undefined}>
        {error?.message}
      </FormHelperText>
    </div>
  );
};

export default FormField;
