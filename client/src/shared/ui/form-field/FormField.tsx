import { FormHelperText, InputLabel } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  labelFontSize?: number;
  error?: FieldError;
  children: React.ReactNode;
  helper?:React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, children, error, labelFontSize = 16, helper,className } = props;

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <InputLabel className="mb-1 !text-foreground-secondary" sx={{ fontSize: labelFontSize }}>
          {label}
        </InputLabel>
        {helper}
      </div>
      {children}
      <FormHelperText error={error !== undefined}>
        {error?.message}
      </FormHelperText>
    </div>
  );
};

export default FormField;
