import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IOpions } from "../../core/type";

type SelectCoreProps<T = unknown> = {
  label: string;
  name?: string;
  value: string | null;
  options: IOpions<T>[] | undefined;
  onChange: (name: string, value: string | null) => void;
  error?: string;
};

const SelectCore: React.FC<SelectCoreProps> = ({
  label,
  value,
  options,
  name,
  error,
  onChange,
}) => {
  return (
    <div className="w-full">
      <FormControl fullWidth>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <Select
          error={!!error}
          labelId={`select-label-${label}`}
          id={`select-${label}`}
          value={value || ""}
          label={label}
          name={name}
          onChange={(ev) => onChange(name as string, ev.target.value as string)}
        >
          {options?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <p className="leading-3 text-xs text-start pt-2 pl-4 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectCore;
