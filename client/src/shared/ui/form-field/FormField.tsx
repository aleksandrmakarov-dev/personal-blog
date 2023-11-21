import { FormHelperText, InputLabel } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelFontSize?: number;
  error?: FieldError;
  children: React.ReactNode;
  helper?: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    label,
    children,
    error,
    labelFontSize = 16,
    helper,
    className,
    required,
  } = props;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        {label && (
          <InputLabel
            className="mb-0.5 !text-foreground-secondary"
            sx={{ fontSize: labelFontSize }}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </InputLabel>
        )}
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
