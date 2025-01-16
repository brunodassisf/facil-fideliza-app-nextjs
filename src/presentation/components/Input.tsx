import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type InputProps = {} & TextFieldProps;

const Input: React.FC<InputProps> = ({
  fullWidth = true,
  label,
  value,
  onChange,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className="w-full">
      <TextField
        fullWidth={fullWidth}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        {...props}
      />
      {error && (
        <p className="leading-3 text-start pt-2 pl-2 text-red-700">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
